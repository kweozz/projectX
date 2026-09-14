import { useEffect, useRef, useState } from 'react'

// Reeded / fluted-glass refraction of a real photo, done in WebGL so it stays
// razor-sharp — the same idea as the FractalGlass flute (a per-pixel cylindrical
// lens per rib), but sampling an image texture instead of a smooth gradient.
// Static: draws once on load / resize, no animation loop.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes;         // canvas size in CSS px
uniform vec2 uImgRes;      // image size in px
uniform float uDpr;
uniform sampler2D uImg;
uniform float uFluteWidth; // rib width in CSS px
uniform float uMagnify;    // lens strength (1 = none)
uniform float uEdge;       // 0..1 darkening toward each rib edge (depth)
uniform float uShine;      // 0..1 highlight along each rib crown
uniform float uStreak;     // vertical smear in CSS px (the "melt")
uniform vec2 uFocus;       // object-position, 0..1

void main(){
  vec2 fc = gl_FragCoord.xy / uDpr;             // origin bottom-left, CSS px

  // Cylindrical lens per rib: magnify horizontally around each rib centre.
  float t = fract(fc.x / uFluteWidth) - 0.5;    // -0.5..0.5 within the rib
  float sampleX = fc.x + t * (uMagnify - 1.0) * uFluteWidth;

  // object-cover mapping (image → canvas)
  float scale = max(uRes.x / uImgRes.x, uRes.y / uImgRes.y);
  vec2 disp = uImgRes * scale;                  // displayed image size
  vec2 offset = (uRes - disp) * uFocus;         // top-left offset (focus)

  // Vertical smear: average a few samples along y so the photo melts into
  // soft vertical streaks (like looking through tall reeded glass).
  vec3 col = vec3(0.0);
  const int N = 7;
  for (int i = 0; i < N; i++) {
    float o = (float(i) / float(N - 1) - 0.5) * uStreak;
    vec2 uv = (vec2(sampleX, fc.y + o) - offset) / disp;
    uv = clamp(uv, 0.0, 1.0);
    col += texture2D(uImg, vec2(uv.x, 1.0 - uv.y)).rgb;
  }
  col /= float(N);

  // Depth: darken toward rib edges, a thin bright crown at the centre.
  float e = abs(t) * 2.0;                        // 0 centre → 1 edge
  col *= 1.0 - uEdge * e * e;
  col += uShine * smoothstep(0.16, 0.0, abs(t)) * 0.5;

  gl_FragColor = vec4(col, 1.0);
}`

export interface FlutedImageProps {
  src: string
  className?: string
  fluteWidth?: number
  magnify?: number
  edge?: number
  shine?: number
  streak?: number
  objectPositionX?: number
  objectPositionY?: number
}

export default function FlutedImage({
  src,
  className = '',
  fluteWidth = 26,
  magnify = 2.3,
  edge = 0.26,
  shine = 0.1,
  streak = 0,
  objectPositionX = 0.6,
  objectPositionY = 0.5,
}: FlutedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const props = useRef({ fluteWidth, magnify, edge, shine, streak, objectPositionX, objectPositionY })
  props.current = { fluteWidth, magnify, edge, shine, streak, objectPositionX, objectPositionY }

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const gl = cv.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) { setFailed(true); return }

    const compile = (type: number, s: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, s); gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(sh))
      return sh
    }
    const pr = gl.createProgram()!
    gl.attachShader(pr, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(pr, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(pr)
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(pr)); setFailed(true); return }
    gl.useProgram(pr)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const U = (n: string) => gl.getUniformLocation(pr, n)
    const u = {
      res: U('uRes'), imgRes: U('uImgRes'), dpr: U('uDpr'), img: U('uImg'),
      fw: U('uFluteWidth'), mag: U('uMagnify'), edge: U('uEdge'), shine: U('uShine'), streak: U('uStreak'), focus: U('uFocus'),
    }

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    // 1×1 placeholder until the image loads
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 8, 4, 255]))

    let imgW = 1, imgH = 1, ready = false

    const draw = () => {
      const p = props.current
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.max(1, Math.round(cv.clientWidth * dpr))
      cv.height = Math.max(1, Math.round(cv.clientHeight * dpr))
      gl.viewport(0, 0, cv.width, cv.height)
      gl.uniform2f(u.res, cv.clientWidth, cv.clientHeight)
      gl.uniform2f(u.imgRes, imgW, imgH)
      gl.uniform1f(u.dpr, dpr)
      gl.uniform1f(u.fw, p.fluteWidth)
      gl.uniform1f(u.mag, p.magnify)
      gl.uniform1f(u.edge, p.edge)
      gl.uniform1f(u.shine, p.shine)
      gl.uniform1f(u.streak, p.streak)
      gl.uniform2f(u.focus, p.objectPositionX, p.objectPositionY)
      gl.uniform1i(u.img, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imgW = img.naturalWidth; imgH = img.naturalHeight; ready = true
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      draw()
    }
    img.onerror = () => setFailed(true)
    img.src = src

    const onResize = () => { if (ready) draw() }
    window.addEventListener('resize', onResize)
    draw()

    return () => { window.removeEventListener('resize', onResize); gl.deleteTexture(tex) }
  }, [src])

  if (failed) {
    return <img src={src} alt="" className={className} aria-hidden />
  }
  return <canvas ref={canvasRef} className={className} aria-hidden />
}
