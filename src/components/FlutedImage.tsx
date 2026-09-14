import { useEffect, useRef, useState } from 'react'

// "Drip into strands" fluted glass (WebGL, sharp). The photo stays intact and
// rich across most of the frame, then breaks into fine vertical strands that
// stretch out and dissolve into the background colour (ink) with gaps between
// them — like the reference. Opaque and colour-boosted, so nothing looks washed.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes, uImgRes;
uniform float uDpr;
uniform sampler2D uImg;
uniform float uFluteWidth;   // strand width, CSS px
uniform float uMeltEnd;      // ny where strands resolve into the intact photo
uniform float uThin;         // strand thickness at full dissolve (0..1 of a cell)
uniform float uSeedJitter;   // per-strand randomness of the melt line
uniform float uSat, uContrast;
uniform vec3 uInk;           // background colour the strands dissolve into
uniform vec2 uFocus;

float hash(float n){ return fract(sin(n * 127.1) * 43758.5453); }
vec2 coverUV(vec2 px){
  float s = max(uRes.x / uImgRes.x, uRes.y / uImgRes.y);
  vec2 d = uImgRes * s;
  vec2 o = (uRes - d) * uFocus;
  return (px - o) / d;
}
vec3 sampNy(float x, float ny){
  float sy = (1.0 - ny) * uRes.y;
  vec2 uv = clamp(coverUV(vec2(x, sy)), 0.0, 1.0);
  return texture2D(uImg, vec2(uv.x, 1.0 - uv.y)).rgb;
}

void main(){
  vec2 fc = gl_FragCoord.xy / uDpr;
  float ny = 1.0 - fc.y / uRes.y;                 // 0 top → 1 bottom

  float idx = floor(fc.x / uFluteWidth);
  float cell = fract(fc.x / uFluteWidth);
  float meltEnd = uMeltEnd + (hash(idx) - 0.5) * uSeedJitter;

  // s: 1 at the very top (full strands) → 0 at meltEnd (intact photo below).
  float s = 1.0 - smoothstep(0.0, meltEnd, ny);

  // Strand thickness: thin near the top with big ink gaps, full lower down.
  float bar = mix(1.0, uThin, s);
  float cov = 1.0 - smoothstep(bar, bar + 0.03, cell);

  // Strands stretch the melt-line row upward; intact photo keeps its own row.
  float srcNy = mix(ny, meltEnd, s);
  vec3 img = sampNy(fc.x, srcNy);

  // Richness.
  img = (img - 0.5) * uContrast + 0.5;
  float l = dot(img, vec3(0.2126, 0.7152, 0.0722));
  img = mix(vec3(l), img, uSat);

  float alpha = s <= 0.001 ? 1.0 : cov;
  vec3 col = mix(uInk, img, alpha);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

export interface FlutedImageProps {
  src: string
  className?: string
  fluteWidth?: number
  meltEnd?: number
  thin?: number
  seedJitter?: number
  sat?: number
  contrast?: number
  ink?: [number, number, number]
  objectPositionX?: number
  objectPositionY?: number
}

export default function FlutedImage({
  src,
  className = '',
  fluteWidth = 8,
  meltEnd = 0.45,
  thin = 0.2,
  seedJitter = 0.12,
  sat = 1.14,
  contrast = 1.09,
  ink = [0.082, 0.02, 0.0],
  objectPositionX = 0.55,
  objectPositionY = 0.5,
}: FlutedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const p = useRef({ fluteWidth, meltEnd, thin, seedJitter, sat, contrast, ink, objectPositionX, objectPositionY })
  p.current = { fluteWidth, meltEnd, thin, seedJitter, sat, contrast, ink, objectPositionX, objectPositionY }

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const gl = cv.getContext('webgl', { antialias: true, alpha: false })
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
      fw: U('uFluteWidth'), me: U('uMeltEnd'), thin: U('uThin'), jit: U('uSeedJitter'),
      sat: U('uSat'), contrast: U('uContrast'), ink: U('uInk'), focus: U('uFocus'),
    }

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 8, 4, 255]))

    let imgW = 1, imgH = 1, ready = false

    const draw = () => {
      const c = p.current
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.max(1, Math.round(cv.clientWidth * dpr))
      cv.height = Math.max(1, Math.round(cv.clientHeight * dpr))
      gl.viewport(0, 0, cv.width, cv.height)
      gl.uniform2f(u.res, cv.clientWidth, cv.clientHeight)
      gl.uniform2f(u.imgRes, imgW, imgH)
      gl.uniform1f(u.dpr, dpr)
      gl.uniform1f(u.fw, c.fluteWidth)
      gl.uniform1f(u.me, c.meltEnd)
      gl.uniform1f(u.thin, c.thin)
      gl.uniform1f(u.jit, c.seedJitter)
      gl.uniform1f(u.sat, c.sat)
      gl.uniform1f(u.contrast, c.contrast)
      gl.uniform3f(u.ink, c.ink[0], c.ink[1], c.ink[2])
      gl.uniform2f(u.focus, c.objectPositionX, c.objectPositionY)
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

  if (failed) return <img src={src} alt="" className={className} aria-hidden />
  return <canvas ref={canvasRef} className={className} aria-hidden />
}
