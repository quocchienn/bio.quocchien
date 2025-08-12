// Typing
const roles = ["Developer", "Modder", "Content Creator"];
let i = 0, ch = 0, del = false;
(function loop() {
  const w = roles[i % roles.length],
        el = document.getElementById("roleTyping");
  el.textContent = del ? w.slice(0, --ch) : w.slice(0, ++ch);
  if (!del && ch === w.length) setTimeout(() => del = true, 900);
  if (del && ch === 0) { del = false; i++; }
  setTimeout(loop, del ? 40 : 70);
})();

// Ripple
function rip(e) {
  const a = e.currentTarget, s = document.createElement("span");
  s.className = "ripple";
  s.style.left = e.offsetX + "px";
  s.style.top = e.offsetY + "px";
  a.appendChild(s);
  setTimeout(() => s.remove(), 600);
}
document.querySelectorAll(".app,.action").forEach(x => x.addEventListener("click", rip));

// Thông báo: ẩn khi bấm, KHÔNG lưu localStorage
document.getElementById("btnGotIt").onclick = () => {
  document.getElementById("warningCard").style.display = "none";
};

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
setStamp(document.getElementById("time1"));
setStamp(document.getElementById("time2"));

// Lượt truy cập (sửa URL API của bạn)
(async () => {
  try {
    const r = await fetch("sử dụng api của bạn");
    const d = await r.json();
    document.getElementById("visitCounter").textContent = new Intl.NumberFormat().format(d.value) + "+";
  } catch {
    document.getElementById("visitCounter").textContent = "Không tải được";
  }
})();

// Year + Reveal
document.getElementById("year").textContent = new Date().getFullYear();
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) {
    en.target.classList.add("reveal");
    io.unobserve(en.target);
  }
}), { threshold: .12 });
document.querySelectorAll(".card,.list-card").forEach(c => io.observe(c));

// ===== Progress bars animate on view =====
(function () {
  const bars = document.querySelectorAll('#skills .bar i');
  // reset width = 0% lúc đầu
  bars.forEach(b => { b.style.width = '0%'; });

  const repeat = true; // true: kéo tới sẽ chạy lại; false: chỉ 1 lần
  const io2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach((b, idx) => {
          const pct = parseInt(b.getAttribute('data-pct') || '0', 10);
          b.style.transitionDelay = (idx * 120) + 'ms';
          requestAnimationFrame(() => { b.style.width = pct + '%'; });
        });
        if (!repeat) io2.unobserve(entry.target);
      } else if (repeat) {
        bars.forEach(b => {
          b.style.transitionDelay = '0ms';
          b.style.width = '0%';
        });
      }
    });
  }, { threshold: 0.35 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) io2.observe(skillsSection);
})();