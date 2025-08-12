README — Quốc Chiến Bio (1-file)

───────────────────

TỔNG QUAN
- Đây là trang “bio” 1 file HTML (có CSS/JS inline), tối ưu nhẹ.
- Thành phần chính: Header (avatar + apps), Thông báo, 3 danh mục (Tải Game / Auto Get Key / Tải File Mod),
  Kỹ năng (thanh tiến độ có animation), Lượt truy cập (tuỳ chọn).
  
───────────────────

TÍNH NĂNG CHÍNH
1) Ảnh & Icon từ link ngoài (Google Drive thumbnail, CDN…)
2) Nút icon tải riêng: chỉ khi bấm icon “download/open” mới mở link tải.
3) Thông báo có link bấm được, nút “Đã hiểu” để ẩn (không lưu localStorage mặc định).
4) Hiệu ứng gõ chữ (typing) ở “and I’m a …”.
5) Ripple effect cho các nút/app/icon.
6) Scroll-reveal: thẻ .card xuất hiện mượt khi cuộn tới.
7) Kỹ năng: thanh tiến độ chạy dần khi cuộn tới (IntersectionObserver).
8) 

───────────────────

CÁCH SỬA / TUỲ BIẾN

A) Ảnh đại diện & icon ứng dụng (Header)
- Avatar:
  <img class="avatar" src="LINK_AVATAR" ...>
  → Thay LINK_AVATAR của bạn. Gợi ý dùng: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200
- 3 app (Facebook, YouTube, …):
  <a class="app" href="LINK_CUA_BAN" target="_blank">
    <img src="LINK_ICON_ẢNH" alt="Tên app">
  </a>
  → Thay cả href (link mở) và src (ảnh icon).
  → Thêm app mới: nhân đôi <a class="app">…</a>.

B) Khối THÔNG BÁO
- Thay nội dung trong <ul class="warn-list">…</ul>.
- Link bấm được: dùng <a class="warn-link" href="...">https://...</a>.
- Nút “Đã hiểu” chỉ ẩn tạm ở lần xem hiện tại.
  Muốn “nhớ đã đọc” (ẩn vĩnh cho tới khi xoá cache), thêm vào JS:
    const KEY="notice_ack_v1";
    if(localStorage.getItem(KEY)==="1"){ document.getElementById("warningCard").style.display="none"; }
    document.getElementById("btnGotIt").onclick=()=>{ document.getElementById("warningCard").style.display="none"; localStorage.setItem(KEY,"1"); };

C) 3 danh mục (Tải Game / Auto Get Key / Tải File Mod)
- Mỗi mục là một .list-card gồm:
  - Logo trái (ảnh thật): <span class="logo"><img src="LINK_LOGO" ...></span>
  - Tiêu đề + thời gian: .item-title & .item-time
  - Nút tải bên phải: <a class="action" href="LINK_TAI" target="_blank"><img src="ICON_DOWNLOAD"></a>
- Quan trọng: CHỈ bấm icon .action mới mở LINK_TAI. Phần còn lại của card không mở link (nhằm tránh nhầm).
- Thay:
  • LINK_LOGO → ảnh thumbnail/logo của mục
  • LINK_TAI → link tải thực tế (Google Drive/Blog/Direct…)
  • ICON_DOWNLOAD → ảnh icon nút (có thể dùng cùng một icon cho mọi card)

D) Kỹ năng (progress bars có animation)
- Nằm trong <section id="skills">.
- Mỗi thanh có % ở thuộc tính data-pct:
  <div class="bar"><i data-pct="80" data-gradient="blue|purple|amber"></i></div>
- Đổi số % ở data-pct để thay giá trị.
- Lặp lại animation khi kéo vào khung nhìn:
  Trong JS: const repeat = true; → nếu muốn chỉ chạy 1 lần, đổi thành false.

E) Đếm lượt truy cập (tuỳ chọn)
- Đang để placeholder “sử dụng api của bạn”.
- Nếu muốn dùng CountAPI miễn phí:
    fetch("https://api.countapi.xyz/hit/ten-namespace/visits")
  và hiển thị d.value
- Nếu không cần: xoá nguyên block card “Lượt Truy Cập” + đoạn JS fetch tương ứng.

F) Hiệu ứng gõ chữ (typing)
- Sửa danh sách vai trò ở JS:
    const roles = ["Developer", "Modder", "Content Creator"];
  → đổi thành vai trò của bạn, ví dụ: ["Developer", "Designer"].

G) Màu sắc & giao diện
- Các biến màu ở :root (CSS):
    --bg1, --bg2 (nền), --card (thẻ), --text, --muted, --blue, --blue-dark
- Gradient chữ “and I’m a …” đã fix compatibility:
  .role-typing {
    background-clip:text; -webkit-background-clip:text;
    color:transparent; -webkit-text-fill-color:transparent;
  }

H) Ảnh Google Drive hiển thị nhanh
- Dùng dạng:
  https://drive.google.com/thumbnail?id=FILE_ID&sz=w2000
- Nếu muốn fallback khi lỗi:
  <img src="...thumbnail?id=FILE_ID&sz=w1200"
       onerror="this.onerror=null; this.src='https://drive.google.com/uc?export=view&id=FILE_ID';">
- Nhớ bật quyền Share: Anyone with the link – Viewer.

───────────────────

MẸO TỐI ƯU NHANH
- Thêm loading="lazy" và decoding="async" cho <img> lớn.
- Duy trì kích thước hợp lý (512–1200px) để giảm tải.
- Nếu có nhiều ảnh: cân nhắc CDN như jsDelivr (GitHub) hoặc Postimages.

───────────────────

DANH SÁCH CHỖ CẦN THAY THẾ NHANH
1) Avatar (Header): <img class="avatar" src="LINK_AVATAR">
2) Icon apps (Header): href + src trong <nav class="apps">…</nav>
3) Thông báo (links & text): <ul class="warn-list">…</ul>
4) Các mục danh sách:
   - Logo trái: <span class="logo"><img src="LINK_LOGO"></span>
   - Nút tải:   <a class="action" href="LINK_TAI"><img src="ICON_DOWNLOAD"></a>
5) Kỹ năng: data-pct trong #skills
6) Đếm lượt truy cập: URL API hoặc xoá block
7) Vai trò (typing): const roles = [ ... ]
   
───────────────────

BẢN QUYỀN & GHI CHÚ
- Bạn được tự do chỉnh sửa/triển khai.
- Nếu cần mình đóng gói thành .zip hoặc deploy Netlify/Vercel, cứ nhắn.
