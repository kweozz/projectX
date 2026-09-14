import { useEffect, useRef, useState } from 'react'

// Reeded / fluted-glass refraction of a real photo, in WebGL so it stays sharp.
// Each rib is a little cylindrical lens: a smooth sine refraction (the glassy
// wave), chromatic dispersion at the edges, a bright crown highlight and a
// valley shadow for real depth, and an optional slow light-sweep so the glass
// feels alive. The photo dissolves into the page colour via a CSS mask on top.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes;         // canvas size, CSS px
uniform vec2 uImgRes;      // image size, px
uniform float uDpr;
uniform sampler2D uImg;
uniform float uFluteWidth; // rib width, CSS px
uniform float uAmp;        // refraction amount, CSS px (how wide a slice each rib bends in)
uniform float uEdge;       // valley shadow 0..1
uniform float uShine;      // crown highlight 0..1
uniform float uStreak;     // vertical drip length, CSS px (at full strength)
uniform float uChroma;     // chromatic dispersion 0..~0.1
uniform float uSweep;      // animated light-sweep intensity 0..1
uniform float uTime;
uniform float uFadeStart;  // ny where glass is still full (0 = top)
uniform float uFadeEnd;    // ny where glass has faded to the clear photo
uniform vec2 uFocus;       // object-position 0..1
#define PI 3.14159265

vec2 coverUV(vec2 px){
  float scale = max(uRes.x / uImgRes.x, uRes.y / uImgRes.y);
  vec2 disp = uImgRes * scale;
  vec2 offset = (uRes - disp) * uFocus;
  return (px - offset) / disp;
}
vec3 samp(float sx, float sy){
  vec2 uv = clamp(coverUV(vec2(sx, sy)), 0.0, 1.0);
  return texture2D(uImg, vec2(uv.x, 1.0 - uv.y)).rgb;
}

void main(){
  vec2 fc = gl_FragCoord.xy / uDpr;

  // Glass strength ramp: full at the top, fading to the clear/normal photo
  // lower down (part glass, part normal).
  float ny = 1.0 - fc.y / uRes.y;               // 0 top → 1 bottom
  float s = 1.0 - smoothstep(uFadeStart, uFadeEnd, ny);

  float c = fract(fc.x / uFluteWidth) - 0.5;    // -0.5..0.5 within the rib
  float refract = sin(c * PI);                   // smooth lens: 0 centre, ±1 edge
  float off = refract * uAmp * s;

  // Vertical drip (pull content downward from above) + chromatic dispersion.
  float drip = uStreak * s;
  vec3 col = vec3(0.0);
  const int N = 8;
  for (int i = 0; i < N; i++){
    float o = (float(i) / float(N - 1)) * drip;  // 0..drip, sourced from above
    col.r += samp(fc.x + off * (1.0 + uChroma), fc.y + o).r;
    col.g += samp(fc.x + off,                    fc.y + o).g;
    col.b += samp(fc.x + off * (1.0 - uChroma), fc.y + o).b;
  }
  col /= float(N);

  // Depth (scaled by strength so the clear part stays pristine).
  float valley = pow(abs(refract), 1.4);
  col *= 1.0 - uEdge * valley * s;
  float crown = pow(max(cos(c * PI), 0.0), 3.0);
  col += uShine * crown * s;

  // Slow light sweep across the glassy area.
  if (uSweep > 0.001){
    float sweepX = (0.5 + 0.5 * sin(uTime * 0.32)) * uRes.x;
    float d = (fc.x - sweepX) / (uRes.x * 0.16);
    col += uSweep * exp(-d * d) * crown * s;
  }

  gl_FragColor = vec4(col, 1.0);
}`

export interface FlutedImageProps {
  src: string
  className?: string
  fluteWidth?: number
  amp?: number
  edge?: number
  shine?: number
  streak?: number
  chroma?: number
  sweep?: number
  fadeStart?: number
  fadeEnd?: number
  animate?: boolean
  objectPositionX?: number
  objectPositionY?: number
}

export default function FlutedImage({
  src,
  className = '',
  fluteWidth = 30,
  amp = 20,
  edge = 0.18,
  shine = 0.1,
  streak = 10,
  chroma = 0.06,
  sweep = 0.06,
  fadeStart = 0,
  fadeEnd = 1,
  animate = true,
  objectPositionX = 0.6,
  objectPositionY = 0.5,
}: FlutedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  const p = useRef({ fluteWidth, amp, edge, shine, streak, chroma, sweep, fadeStart, fadeEnd, animate, objectPositionX, objectPositionY })
  p.current = { fluteWidth, amp, edge, shine, streak, chroma, sweep, fadeStart, fadeEnd, animate, objectPositionX, objectPositionY }

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
      fw: U('uFluteWidth'), amp: U('uAmp'), edge: U('uEdge'), shine: U('uShine'),
      streak: U('uStreak'), chroma: U('uChroma'), sweep: U('uSweep'), time: U('uTime'),
      fadeStart: U('uFadeStart'), fadeEnd: U('uFadeEnd'), focus: U('uFocus'),
    }

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([245, 242, 235, 255]))

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
      gl.uniform1f(u.streak, c.streak)
      gl.uniform1f(u.chroma, c.chroma)
      gl.uniform1f(u.sweep, c.sweep)
      gl.uniform1f(u.time, clock)
      gl.uniform1f(u.fadeStart, c.fadeStart)
      gl.uniform1f(u.fadeEnd, c.fadeEnd)
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
    const start = () => { if (!raf && ready) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imgW = img.naturalWidth; imgH = img.naturalHeight; ready = true
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      draw(0)
      if (p.current.animate && !reduced) start()
    }
    img.onerror = () => setFailed(true)
    img.src = src

    const onResize = () => { if (ready) draw(clock) }
    window.addEventListener('resize', onResize)

    const io = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; if (p.current.animate && !reduced) (visible ? start() : stop()) },
      { threshold: 0 },
    )
    io.observe(cv)

    return () => { io.disconnect(); stop(); window.removeEventListener('resize', onResize); gl.deleteTexture(tex) }
  }, [src])

  if (failed) return <img src={src} alt="" className={className} aria-hidden />
  return <canvas ref={canvasRef} className={className} aria-hidden />
}
