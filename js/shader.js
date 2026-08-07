/* ============================================================
   GRAIN GRADIENT — живой фон всего сайта.
   Эффект по мотивам paper.design/shaders/grain-gradient:
   мягкие перетекающие пастельно-морские градиенты + плёночное
   зерно. Без библиотек, чистый WebGL, работает офлайн.
   ============================================================ */
(function () {
  const canvas = document.getElementById("bgShader");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) { canvas.remove(); return; }

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const VERT = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0., 1.); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2  u_res;
    uniform float u_time;
    uniform vec2  u_mouse;
    uniform vec3  u_c0; /* база */
    uniform vec3  u_c1; /* аква */
    uniform vec3  u_c2; /* пудрово-голубой */
    uniform vec3  u_c3; /* морская пена */

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(
        mix(hash(i), hash(i + vec2(1., 0.)), f.x),
        mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x),
        f.y);
    }
    float fbm(vec2 p) {
      float v = 0., a = .5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = p * 2.03 + vec2(1.7, 9.2);
        a *= .5;
      }
      return v;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - .5 * u_res) / min(u_res.x, u_res.y);
      uv += u_mouse * .4;
      float t = u_time * .05;

      /* домен-варпинг: градиент «течёт» */
      vec2 q = vec2(fbm(uv * 1.3 + t), fbm(uv * 1.3 - t * 1.4 + 5.2));
      float f = fbm(uv * 1.1 + q * 1.7 + vec2(t * .9, -t * .6));

      vec3 col = mix(u_c0, u_c1, smoothstep(.3, .62, f));
      col = mix(col, u_c2, smoothstep(.5, .8, q.x) * .85);
      col = mix(col, u_c3, smoothstep(.55, .88, q.y) * .7);

      /* плёночное зерно (медленно живёт) */
      float g = hash(floor(gl_FragCoord.xy) + floor(u_time * 6.) * .37) - .5;
      col += g * .045;

      gl_FragColor = vec4(col, 1.);
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

  const U = {};
  ["u_res", "u_time", "u_mouse", "u_c0", "u_c1", "u_c2", "u_c3"].forEach(
    (n) => (U[n] = gl.getUniformLocation(prog, n))
  );

  /* ---------- Пастельно-морские палитры для двух тем ---------- */
  function updateColors() {
    const dark = document.documentElement.dataset.theme === "dark";
    if (dark) {
      gl.uniform3f(U.u_c0, 0.07, 0.085, 0.095); /* глубокая ночная вода */
      gl.uniform3f(U.u_c1, 0.10, 0.23, 0.26);   /* тёмная аква */
      gl.uniform3f(U.u_c2, 0.12, 0.20, 0.32);   /* синяя глубина */
      gl.uniform3f(U.u_c3, 0.13, 0.27, 0.21);   /* тёмная пена */
    } else {
      gl.uniform3f(U.u_c0, 0.965, 0.949, 0.918); /* крем-белый */
      gl.uniform3f(U.u_c1, 0.68, 0.84, 0.83);    /* аква */
      gl.uniform3f(U.u_c2, 0.66, 0.77, 0.89);    /* пудрово-голубой */
      gl.uniform3f(U.u_c3, 0.78, 0.88, 0.77);    /* морская пена */
    }
  }
  updateColors();
  document.addEventListener("themechange", () => {
    updateColors();
    if (reducedMotion) drawFrame(20);
  });

  /* ---------- Размер ---------- */
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.6);
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
  addEventListener("resize", () => { resize(); if (reducedMotion) drawFrame(20); });

  /* ---------- Мышь (плавное следование) ---------- */
  let mx = 0, my = 0, tx = 0, ty = 0;
  addEventListener("mousemove", (e) => {
    tx = (e.clientX / innerWidth - 0.5);
    ty = -(e.clientY / innerHeight - 0.5);
  }, { passive: true });

  /* ---------- Рендер ---------- */
  const t0 = performance.now();

  function drawFrame(t) {
    mx += (tx - mx) * 0.1;
    my += (ty - my) * 0.1;
    gl.uniform2f(U.u_mouse, mx, my);
    gl.uniform1f(U.u_time, t);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  if (reducedMotion) {
    drawFrame(20);
    return;
  }

  (function loop(now) {
    if (!document.hidden) drawFrame((now - t0) / 1000);
    requestAnimationFrame(loop);
  })(t0);
})();
