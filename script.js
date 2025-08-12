"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Typing
  const roles = ["Developer", "Modder", "Content Creator"];
  let i = 0, ch = 0, del = false;

  (function loop() {
    const w = roles[i % roles.length];
    const el = document.getElementById("roleTyping");
    if (!el) return;
    el.textContent = del ? w.slice(0, --ch) : w.slice(0, ++ch);
    if (!del && ch === w.length) setTimeout(() => (del = true), 900);
    if (del && ch === 0) {
      del = false;
      i++;
    }
    setTimeout(loop, del ? 40 : 70);
  })();

  // Ripple
  function rip(e) {
    const a = e.currentTarget;
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.left = e.offsetX + "px";
    s.style.top = e.offsetY + "px";
    a.appendChild(s);
    setTimeout(() => s.remove(), 600);
  }
  document.querySelectorAll(".app,.action").forEach((x) => x.addEventListener("click", rip));

  // Thông báo: ẩn khi bấm, KHÔNG lưu localStorage
  const btnGotIt = document.getElementById("btnGotIt");
  if (btnGotIt) {
    btnGotIt.onclick = () => {
      const card = document.getElementById("warningCard");
      if (card) card.style.display = "none";
    };
  }

  // Time stamp
  function setStamp(el) {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    el.textContent = `${hh}:${mm}:${ss} ${dd}/${mo}/${yy}`;
  }
  const t1 = document.getElementById("time1");
  const t2 = document.getElementById("time2");
  if (t1) setStamp(t1);
  if (t2) setStamp(t2);

  // Lượt truy cập (sửa URL API của bạn)
  (async () => {
    const el = document.getElementById("visitCounter");
    if (!el) return;
    try {
      const r = await fetch("sử dụng api của bạn");
      const d = await r.json();
      el.textContent = new Intl.NumberFormat().format(d.value) + "+";
    } catch {
      el.textContent = "Không tải được";
    }
  })();

  // Year + Reveal
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const io = new IntersectionObserver(
    (es) =>
      es.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("reveal");
          io.unobserve(en.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".card,.list-card").forEach((c) => io.observe(c));

  // ===== Progress bars animate on view =====
  (function () {
    const bars = document.querySelectorAll("#skills .bar i");
    bars.forEach((b) =>
