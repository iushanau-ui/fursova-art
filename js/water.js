/* ============================================================
   WATER — лёгкие «водяные блики» (каустика) поверх хиро.
   Эффект по мотивам paper.design/shaders/water (классическая
   тайловая каустика). Полупрозрачный слой над текстом,
   pointer-events: none — ничему не мешает.
   ============================================================ */
(function () {
  const canvas = document.getElementById("waterFx");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
  if (!gl) { canvas.remove(); return; }

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0., 1.); }`;
  const FRAG = `
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;
    uniform float u_alpha;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      uv.x *= u_res.x / u_res.y;

      vec2 p = mod(uv * 6.2831 * 1.1, 6.2831) - 250.;
      vec2 i = p;
      float c = 1.;
      float inten = .005;

      for (int n = 0; n < 5; n++) {
        float t = u_time * (1. - (3.5 / float(n + 1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1. / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
      }
      c /= 5.;
      c = 1.17 - pow(c, 1.4);
      float glow = pow(abs(c), 8.);

      vec3 col = vec3(.86, .96, .98); /* аква-белый блик */
      float a = clamp(glow, 0., 1.) * u_alpha;
      gl_FragColor = vec4(col * a, a);
    }
  `;

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    return sh;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  const U = {};
  ["u_res", "u_time", "u_alpha"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  /* интенсивность бликов под тему */
  function updateAlpha() {
    const dark = document.documentElement.dataset.theme === "dark";
    gl.uniform1f(U.u_alpha, dark ? 0.10 : 0.16);
  }
  updateAlpha();
  document.addEventListener("themechange", () => {
    updateAlpha();
    if (reducedMotion) draw(5);
  });

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(U.u_res, w, h);
    }
  }
  resize();
  addEventListener("resize", () => { resize(); if (reducedMotion) draw(5); });

  const t0 = performance.now();
  let visible = true;
  new IntersectionObserver((en) => (visible = en[0].isIntersecting), { threshold: 0 })
    .observe(canvas);

  function draw(t) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(U.u_time, t * .55);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  if (reducedMotion) { draw(5); return; }

  (function loop(now) {
    if (visible && !document.hidden) draw((now - t0) / 1000);
    requestAnimationFrame(loop);
  })(t0);
})();
