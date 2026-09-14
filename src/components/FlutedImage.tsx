import { useEffect, useRef, useState } from 'react'

// Rich, opaque fluted-glass over a photo (WebGL, stays sharp). The whole image
// keeps its colour and punch — a subtle reeded refraction with crown highlights
// and valley shadows for real glass depth, stronger toward the top, plus a
// contrast/saturation lift so the photo pops, and a slow light-sweep so the
// glass feels alive. It never goes transparent, so nothing looks washed out.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes, uImgRes;
uniform float uDpr;
uniform sampler2D uImg;
uniform float uFluteWidth, uAmp, uEdge, uShine, uChroma;
uniform float uSat, uContrast, uSweep, uTime;
uniform float uFadeStart, uFadeEnd, uFloor;
uniform vec2 uFocus;
#define PI 3.14159265

vec2 coverUV(vec2 px){
  float s = max(uRes.x / uImgRes.x, uRes.y / uImgRes.y);
  vec2 d = uImgRes * s;
  vec2 o = (uRes - d) * uFocus;
  return (px - o) / d;
}
vec3 samp(float x, float y){
  vec2 uv = clamp(coverUV(vec2(x, y)), 0.0, 1.0);
  return texture2D(uImg, vec2(uv.x, 1.0 - uv.y)).rgb;
}

void main(){
  vec2 fc = gl_FragCoord.xy / uDpr;

  // Glass strength: strongest at the top, never below uFloor (whole image keeps
  // a touch of glass, so it reads as one material — part glass, part clearer).
  float ny = 1.0 - fc.y / uRes.y;
  float s = mix(uFloor, 1.0, 1.0 - smoothstep(uFadeStart, uFadeEnd, ny));

  float c = fract(fc.x / uFluteWidth) - 0.5;
  float refr = sin(c * PI);
  float off = refr * uAmp * s;

  vec3 col;
  col.r = samp(fc.x + off * (1.0 + uChroma), fc.y).r;
  col.g = samp(fc.x + off,                    fc.y).g;
  col.b = samp(fc.x + off * (1.0 - uChroma), fc.y).b;

  // Depth: valley shadow + crown highlight.
  float valley = pow(abs(refr), 1.4);
  col *= 1.0 - uEdge * valley * s;
  float crown = pow(max(cos(c * PI), 0.0), 3.0);
  col += uShine * crown * s;

  // Slow light sweep.
  if (uSweep > 0.001){
    float sx = (0.5 + 0.5 * sin(uTime * 0.3)) * uRes.x;
    float d = (fc.x - sx) / (uRes.x * 0.16);
    col += uSweep * exp(-d * d) * crown * s;
  }

  // Richness: contrast + saturation so the photo has real punch.
  col = (col - 0.5) * uContrast + 0.5;
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(l), col, uSat);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

export interface FlutedImageProps {
  src: string
  className?: string
  fluteWidth?: number
  amp?: number
  edge?: number
  shine?: number
  chroma?: number
  sat?: number
  contrast?: number
  sweep?: number
  fadeStart?: number
  fadeEnd?: number
  floor?: number
  animate?: boolean
  objectPositionX?: number
  objectPositionY?: number
}

export default function FlutedImage({
  src,
  className = '',
  fluteWidth = 34,
  amp = 10,
  edge = 0.14,
  shine = 0.1,
  chroma = 0.04,
  sat = 1.12,
  contrast = 1.08,
  sweep = 0.05,
  fadeStart = 0,
  fadeEnd = 0.85,
  floor = 0.4,
  animate = true,
  objectPositionX = 0.55,
  objectPositionY = 0.5,
}: FlutedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const p = useRef({ fluteWidth, amp, edge, shine, chroma, sat, contrast, sweep, fadeStart, fadeEnd, floor, animate, objectPositionX, objectPositionY })
  p.current = { fluteWidth, amp, edge, shine, chroma, sat, contrast, sweep, fadeStart, fadeEnd, floor, animate, objectPositionX, objectPositionY }

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
      fw: U('uFluteWidth'), amp: U('uAmp'), edge: U('uEdge'), shine: U('uShine'), chroma: U('uChroma'),
      sat: U('uSat'), contrast: U('uContrast'), sweep: U('uSweep'), time: U('uTime'),
      fadeStart: U('uFadeStart'), fadeEnd: U('uFadeEnd'), floor: U('uFloor'), focus: U('uFocus'),
    }

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 8, 4, 255]))

    let imgW = 1, imgH = 1, ready = false

    const draw = (clock: number) => {
      const c = p.current
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      if (cv.width !== Math.round(cv.clientWidth * dpr) || cv.height !== Math.round(cv.clientHeight * dpr)) {
        cv.width = Math.max(1, Math.round(cv.clientWidth * dpr))
        cv.height = Math.max(1, Math.round(cv.clientHeight * dpr))
        gl.viewport(0, 0, cv.width, cv.height)
      }
      gl.uniform2f(u.res, cv.clientWidth, cv.clientHeight)
      gl.uniform2f(u.imgRes, imgW, imgH)
      gl.uniform1f(u.dpr, dpr)
      gl.uniform1f(u.fw, c.fluteWidth)
      gl.uniform1f(u.amp, c.amp)
      gl.uniform1f(u.edge, c.edge)
      gl.uniform1f(u.shine, c.shine)
      gl.uniform1f(u.chroma, c.chroma)
      gl.uniform1f(u.sat, c.sat)
      gl.uniform1f(u.contrast, c.contrast)
      gl.uniform1f(u.sweep, c.sweep)
      gl.uniform1f(u.time, clock)
      gl.uniform1f(u.fadeStart, c.fadeStart)
      gl.uniform1f(u.fadeEnd, c.fadeEnd)
      gl.uniform1f(u.floor, c.floor)
      gl.uniform2f(u.focus, c.objectPositionX, c.objectPositionY)
      gl.uniform1i(u.img, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, last = performance.now(), clock = 0, visible = true
    const frame = (now: number) => {
      clock += Math.min((now - last) / 1000, 0.1); last = now
      draw(clock)
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf && ready && p.current.animate && !reduced) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imgW = img.naturalWidth; imgH = img.naturalHeight; ready = true
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      draw(0)
      start()
    }
    img.onerror = () => setFailed(true)
    img.src = src

    const onResize = () => { if (ready) draw(clock) }
    window.addEventListener('resize', onResize)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() }, { threshold: 0 })
    io.observe(cv)

    return () => { io.disconnect(); stop(); window.removeEventListener('resize', onResize); gl.deleteTexture(tex) }
  }, [src])

  if (failed) return <img src={src} alt="" className={className} aria-hidden />
  return <canvas ref={canvasRef} className={className} aria-hidden />
}
