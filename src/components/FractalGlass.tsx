import { useEffect, useRef, useState } from 'react'

// Live WebGL "fractal glass" gradient — a warm mesh gradient (5 orbiting
// gaussian blobs, domain-warped by looping simplex noise) refracted through
// fluted glass. Ported from the shader that produced hero-bg.mp4, so it renders
// crisp at any size, weighs ~nothing, and can be recoloured per palette.
//
// Safe by default: pauses its RAF loop when scrolled out of view, honours
// prefers-reduced-motion (draws a single still frame), and falls back to the
// poster image if WebGL is unavailable.

export type FractalPalette =
  | 'warm ember'
  | 'golden hour'
  | 'honey'
  | 'terracotta'
  | 'copper rose'
  | 'desert clay'

export type SafeZone =
  | 'off'
  | 'bottom-left'
  | 'left column'
  | 'bottom band'
  | 'top-left'
  | 'center plate'
  | 'center band'
  | 'top band'
  | 'whole frame'
export type SafeContrast = 'off' | '3:1' | '4.5:1' | '7:1'

const SAFE_MODES: Record<SafeZone, number> = {
  off: 0, 'bottom-left': 1, 'left column': 2, 'bottom band': 3, 'top-left': 4,
  'center plate': 5, 'center band': 6, 'top band': 7, 'whole frame': 8,
}
const SAFE_RATIOS: Record<SafeContrast, number> = { off: 0, '3:1': 3, '4.5:1': 4.5, '7:1': 7 }

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
}

type Vec3 = [number, number, number]
type PaletteDef = { base: Vec3; safe: Vec3; ember: Vec3; c: Vec3[] }

const PALETTES: Record<FractalPalette, PaletteDef> = {
  'warm ember': { base: [0.02, 0.005, 0.002], safe: [0.125, 0.058, 0.028], ember: [0.42, 0.19, 0.062],
    c: [[0.34, 0.045, 0.012], [0.72, 0.16, 0.02], [0.95, 0.42, 0.05], [1.0, 0.7, 0.16], [1.0, 0.9, 0.55]] },
  'golden hour': { base: [0.024, 0.01, 0.002], safe: [0.135, 0.075, 0.026], ember: [0.44, 0.24, 0.07],
    c: [[0.32, 0.09, 0.01], [0.66, 0.26, 0.03], [0.92, 0.54, 0.07], [1.0, 0.78, 0.22], [1.0, 0.94, 0.62]] },
  honey: { base: [0.026, 0.014, 0.003], safe: [0.14, 0.088, 0.03], ember: [0.44, 0.28, 0.085],
    c: [[0.3, 0.13, 0.014], [0.6, 0.32, 0.05], [0.88, 0.6, 0.12], [1.0, 0.82, 0.32], [1.0, 0.96, 0.74]] },
  terracotta: { base: [0.028, 0.01, 0.008], safe: [0.14, 0.072, 0.052], ember: [0.4, 0.2, 0.13],
    c: [[0.3, 0.075, 0.05], [0.62, 0.2, 0.11], [0.86, 0.4, 0.22], [0.96, 0.62, 0.4], [1.0, 0.85, 0.68]] },
  'copper rose': { base: [0.024, 0.007, 0.006], safe: [0.13, 0.055, 0.042], ember: [0.42, 0.17, 0.11],
    c: [[0.36, 0.055, 0.038], [0.7, 0.18, 0.09], [0.92, 0.38, 0.16], [1.0, 0.62, 0.3], [1.0, 0.86, 0.6]] },
  'desert clay': { base: [0.026, 0.016, 0.008], safe: [0.13, 0.09, 0.055], ember: [0.38, 0.25, 0.14],
    c: [[0.28, 0.14, 0.06], [0.56, 0.32, 0.14], [0.8, 0.56, 0.28], [0.94, 0.76, 0.48], [1.0, 0.92, 0.76]] },
}

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uPixelRatio, uTime;
uniform float uFluteWidth, uFluteStrength, uFluteY;
uniform float uWarpStrength, uNoiseScale, uExposure, uGrain;
uniform float uPhase, uNoiseTravel;
uniform float uFluteAngle;
uniform vec3 uPalBase, uPal1, uPal2, uPal3, uPal4, uPal5;
uniform float uSafeMode, uSafeSize, uSafeDark, uSafeFeather, uSafeRatio;
uniform vec3 uSafeBase, uSafeEmber;
uniform float uSafeStyle, uSafeRich;
uniform float uBottomFade;   // 0..1: sink the gradient's own colours to brown at the bottom
#define TAU 6.28318530718

// WCAG relative luminance needs linearised sRGB, not display values
float s2l(float c){ c = clamp(c, 0.0, 1.0); return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4); }
float l2s(float c){ c = clamp(c, 0.0, 1.0); return c <= 0.0031308 ? c * 12.92 : 1.055 * pow(c, 1.0 / 2.4) - 0.055; }
float SS(float a, float b, float x){ float t = clamp((x - a) / max(b - a, 1e-5), 0.0, 1.0); return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
float wcagLum(vec3 c){ return 0.2126 * s2l(c.r) + 0.7152 * s2l(c.g) + 0.0722 * s2l(c.b); }

vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

vec3 blobs(vec2 uv){
  float a = TAU * uPhase;
  vec2 orbit = uNoiseTravel * vec2(cos(a), sin(a));
  vec2 n = vec2(
    snoise(uv * uNoiseScale + orbit),
    snoise(uv * uNoiseScale * 0.93 - orbit.yx * 1.13 + 17.0)
  );
  vec2 w = uv + n * uWarpStrength;
  vec2 p1 = vec2(-0.62 + sin(a + 0.5) * 0.20,        0.10 + cos(a) * 0.16);
  vec2 p2 = vec2(-0.10 + sin(a + 2.1) * 0.24,       -0.22 + cos(2.0 * a + 1.2) * 0.20);
  vec2 p3 = vec2( 0.34 + cos(2.0 * a + 4.0) * 0.22,  0.26 + sin(a + 0.3) * 0.22);
  vec2 p4 = vec2( 0.72 + sin(a + 1.6) * 0.18,       -0.14 + cos(a + 2.7) * 0.24);
  vec2 p5 = vec2( 0.98 + cos(a + 3.3) * 0.16,        0.34 + sin(2.0 * a + 5.0) * 0.18);
  vec3 color = uPalBase;
  color += uPal1 * exp(-dot(w - p1, w - p1) * 3.2) * 1.5;
  color += uPal2 * exp(-dot(w - p2, w - p2) * 4.0) * 1.3;
  color += uPal3 * exp(-dot(w - p3, w - p3) * 5.0) * 1.2;
  color += uPal4 * exp(-dot(w - p4, w - p4) * 4.4) * 1.4;
  color += uPal5 * exp(-dot(w - p5, w - p5) * 6.0) * 1.2;
  return color;
}

void main(){
  vec2 mapped = gl_FragCoord.xy / uPixelRatio - uRes * 0.5;
  float ang = radians(uFluteAngle);
  vec2 ax = vec2(cos(ang), sin(ang));
  vec2 ay = vec2(-ax.y, ax.x);
  vec2 rot = vec2(dot(mapped, ax), dot(mapped, ay));
  float fx = fract(rot.x / uFluteWidth);
  float flutedX = uFluteStrength * (fx - 0.5);
  float flutedY = uFluteY * (0.5 - abs(fx - 0.5)) * 2.0;
  vec2 fluted = (rot.x + flutedX) * ax + (rot.y + flutedY) * ay;
  vec3 color = blobs(fluted / 1000.0);
  color = 1.0 - exp(-color * uExposure);

  // bottom fade: let the gradient's own colours sink to the warm brown toward
  // the bottom (full width, smooth — not a flat band), so it flows into the
  // section below while the sides above keep their colour
  if (uBottomFade > 0.001) {
    vec2 fpos = gl_FragCoord.xy / uPixelRatio / uRes;   // 0..1, origin bottom-left
    float bf = uBottomFade * (1.0 - smoothstep(0.0, 0.58, fpos.y));
    color = mix(color, uSafeBase, clamp(bf, 0.0, 1.0));
  }

  // text-safe zone: hold one region dark so light type stays legible
  if (uSafeMode > 0.5) {
    vec2 s = gl_FragCoord.xy / uPixelRatio / uRes;   // 0..1, origin bottom-left
    float fade = max(uSafeFeather, 0.001);
    float m = 0.0;
    float fromLeft   = 1.0 - SS(uSafeSize, uSafeSize + fade, s.x);
    float fromBottom = 1.0 - SS(uSafeSize, uSafeSize + fade, s.y);
    float fromTop    = 1.0 - SS(uSafeSize, uSafeSize + fade, 1.0 - s.y);
    float halfX = 1.0 - SS(uSafeSize, uSafeSize + fade, abs(s.x - 0.5) * 2.0);
    float halfY = 1.0 - SS(uSafeSize, uSafeSize + fade, abs(s.y - 0.5) * 2.0);
    if (uSafeMode < 1.5)      m = fromLeft * fromBottom;   // bottom-left corner
    else if (uSafeMode < 2.5) m = fromLeft;                // left column
    else if (uSafeMode < 3.5) m = fromBottom;              // bottom band
    else if (uSafeMode < 4.5) m = fromLeft * fromTop;      // top-left corner
    else if (uSafeMode < 5.5) m = halfX * halfY;           // centred plate
    else if (uSafeMode < 6.5) m = halfY;                   // centred band
    else if (uSafeMode < 7.5) m = fromTop;                 // top band
    else                      m = 1.0;                     // whole frame
    m = clamp(m, 0.0, 1.0);

    // dim in linear light, then recover chroma so gold doesn't go olive/grey
    float dim = mix(1.0, 1.0 - uSafeDark * 0.85, m);
    vec3 lin = vec3(s2l(color.r), s2l(color.g), s2l(color.b)) * dim;
    float lumLin = dot(lin, vec3(0.2126, 0.7152, 0.0722));
    lin = max(mix(vec3(lumLin), lin, 1.0 + uSafeRich * m), vec3(0.0));
    color = vec3(l2s(lin.r), l2s(lin.g), l2s(lin.b));

    // optional warm tint toward the palette's roasted tone
    if (uSafeStyle > 0.5) {
      float lum = dot(color, vec3(0.2126, 0.7152, 0.0722));
      vec3 warm = uSafeBase + uSafeEmber * smoothstep(0.06, 1.0, lum) * 0.70;
      color = mix(color, warm, m * 0.55);
    }

    // hard WCAG guarantee vs white type: cap the zone's relative luminance at
    // the level the chosen ratio allows (white L = 1, contrast = 1.05/(L+0.05))
    if (uSafeRatio > 1.05) {
      float Lmax = 1.05 / uSafeRatio - 0.05;
      float L = wcagLum(color);
      float k = 1.0 / (1.0 + L / max(Lmax, 1e-4));   // asymptotic, stays under Lmax
      k = mix(1.0, k, m);
      vec3 clin = vec3(s2l(color.r), s2l(color.g), s2l(color.b)) * k;
      float cg = dot(clin, vec3(0.2126, 0.7152, 0.0722));
      clin = max(mix(vec3(cg), clin, 1.0 + uSafeRich * 0.6 * m), vec3(0.0));
      color = vec3(l2s(clin.r), l2s(clin.g), l2s(clin.b));
    }
  }

  float grain = hash(gl_FragCoord.xy + fract(uTime) * 91.7) * 2.0 - 1.0;
  color += grain * uGrain * max(color.r, max(color.g, color.b));
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`

export interface FractalGlassProps {
  className?: string
  palette?: FractalPalette
  loopSeconds?: number
  fluteWidth?: number
  fluteStrength?: number
  fluteShine?: number
  fluteAngle?: number
  warpStrength?: number
  noiseScale?: number
  noiseTravel?: number
  exposure?: number
  grain?: number
  /** 0..1: sink the gradient's own colours to the warm brown toward the bottom
      (smooth, full width) so it flows into the section below. */
  bottomFade?: number
  // WCAG text-safe zone: hold one region dark so light type stays legible
  safeZone?: SafeZone
  safeStyle?: 'clean dim' | 'warm tint'
  safeContrast?: SafeContrast
  safeSize?: number
  safeDarkness?: number
  safeFeather?: number
  safeRichness?: number
  /** Hex the dark zone tints toward (e.g. the section colour it flows into).
      Overrides the palette's warm safe tone; removes the orange ember lift. */
  safeTint?: string
  /** Shown when WebGL is unavailable. */
  poster?: string
}

export default function FractalGlass({
  className = '',
  palette = 'warm ember',
  loopSeconds = 8,
  fluteWidth = 46,
  fluteStrength = 286,
  fluteShine = 26,
  fluteAngle = 0,
  warpStrength = 0.13,
  noiseScale = 2.3,
  noiseTravel = 0.3,
  exposure = 1.45,
  grain = 0,
  bottomFade = 0,
  safeZone = 'off',
  safeStyle = 'warm tint',
  safeContrast = '4.5:1',
  safeSize = 0.3,
  safeDarkness = 0.4,
  safeFeather = 0.52,
  safeRichness = 0.5,
  safeTint,
  poster,
}: FractalGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [failed, setFailed] = useState(false)
  // latest prop values, read inside the animation loop without re-initialising
  const props = useRef({ palette, loopSeconds, fluteWidth, fluteStrength, fluteShine, fluteAngle, warpStrength, noiseScale, noiseTravel, exposure, grain, safeZone, safeStyle, safeContrast, safeSize, safeDarkness, safeFeather, safeRichness, safeTint, bottomFade })
  props.current = { palette, loopSeconds, fluteWidth, fluteStrength, fluteShine, fluteAngle, warpStrength, noiseScale, noiseTravel, exposure, grain, safeZone, safeStyle, safeContrast, safeSize, safeDarkness, safeFeather, safeRichness, safeTint, bottomFade }

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const gl = cv.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) { setFailed(true); return }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
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
      res: U('uRes'), dpr: U('uPixelRatio'), time: U('uTime'),
      fw: U('uFluteWidth'), fs: U('uFluteStrength'), fy: U('uFluteY'),
      warp: U('uWarpStrength'), noise: U('uNoiseScale'),
      phase: U('uPhase'), travel: U('uNoiseTravel'), fAngle: U('uFluteAngle'),
      pBase: U('uPalBase'), p1: U('uPal1'), p2: U('uPal2'), p3: U('uPal3'), p4: U('uPal4'), p5: U('uPal5'),
      exp: U('uExposure'), grain: U('uGrain'),
      sMode: U('uSafeMode'), sSize: U('uSafeSize'), sDark: U('uSafeDark'),
      sFeather: U('uSafeFeather'), sRatio: U('uSafeRatio'),
      sBase: U('uSafeBase'), sEmber: U('uSafeEmber'), sStyle: U('uSafeStyle'), sRich: U('uSafeRich'),
      bf: U('uBottomFade'),
    }

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.max(1, Math.round(cv.clientWidth * dpr))
      cv.height = Math.max(1, Math.round(cv.clientHeight * dpr))
      gl.viewport(0, 0, cv.width, cv.height)
      gl.uniform2f(u.res, cv.clientWidth, cv.clientHeight)
      gl.uniform1f(u.dpr, dpr)
    }
    window.addEventListener('resize', onResize)
    onResize()

    const draw = (clock: number) => {
      const p = props.current
      const P = PALETTES[p.palette] || PALETTES['warm ember']
      const loop = Math.max(1, p.loopSeconds)
      gl.uniform1f(u.time, clock)
      gl.uniform1f(u.phase, (clock % loop) / loop)
      gl.uniform1f(u.travel, p.noiseTravel)
      gl.uniform1f(u.fw, p.fluteWidth)
      gl.uniform1f(u.fs, p.fluteStrength)
      gl.uniform1f(u.fy, p.fluteShine)
      gl.uniform1f(u.warp, p.warpStrength)
      gl.uniform1f(u.noise, p.noiseScale)
      gl.uniform1f(u.exp, p.exposure)
      gl.uniform1f(u.grain, p.grain)
      gl.uniform1f(u.bf, p.bottomFade)
      gl.uniform1f(u.fAngle, p.fluteAngle)
      gl.uniform3fv(u.pBase, P.base); gl.uniform3fv(u.p1, P.c[0]); gl.uniform3fv(u.p2, P.c[1])
      gl.uniform3fv(u.p3, P.c[2]); gl.uniform3fv(u.p4, P.c[3]); gl.uniform3fv(u.p5, P.c[4])
      gl.uniform1f(u.sMode, SAFE_MODES[p.safeZone] ?? 0)
      gl.uniform1f(u.sSize, p.safeSize)
      gl.uniform1f(u.sDark, p.safeDarkness)
      gl.uniform1f(u.sFeather, p.safeFeather)
      gl.uniform1f(u.sRatio, SAFE_RATIOS[p.safeContrast] ?? 0)
      gl.uniform1f(u.sStyle, p.safeStyle === 'warm tint' ? 1 : 0)
      gl.uniform1f(u.sRich, p.safeRichness)
      if (p.safeTint) {
        const t = hexToRgb(p.safeTint)
        // tint toward a flat colour: base = tint, ember = a hair lifted (no orange)
        gl.uniform3fv(u.sBase, t)
        gl.uniform3fv(u.sEmber, [t[0] * 1.1, t[1] * 1.1, t[2] * 1.1])
      } else {
        gl.uniform3fv(u.sBase, P.safe); gl.uniform3fv(u.sEmber, P.ember)
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = performance.now()
    let clock = 0
    let visible = true

    const frame = (now: number) => {
      clock += Math.min((now - last) / 1000, 0.1)
      last = now
      draw(clock)
      raf = requestAnimationFrame(frame)
    }
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }

    draw(0) // always paint an initial frame immediately

    if (reduced) {
      // one still frame, no loop
    } else {
      // only animate while the canvas is on screen
      const io = new IntersectionObserver(
        ([e]) => { visible = e.isIntersecting; visible ? start() : stop() },
        { threshold: 0 },
      )
      io.observe(cv)
      start()
      return () => { io.disconnect(); stop(); window.removeEventListener('resize', onResize) }
    }
    return () => { stop(); window.removeEventListener('resize', onResize) }
  }, [])

  if (failed && poster) {
    return <img src={poster} alt="" className={className} aria-hidden />
  }
  return <canvas ref={canvasRef} className={className} aria-hidden />
}
