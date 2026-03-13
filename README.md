<div align="center">
  <h1>AdPlay Online 🚀</h1>
  <p><b>Giải pháp truyền thông nội bộ & Màn hình trình chiếu số chuyên nghiệp.</b></p>

  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="CI/CD" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</div>

---

## 🌟 AdPlay là gì?

**AdPlay** là một hệ thống quản lý nội dung số (Digital Signage) mạnh mẽ, cho phép bạn biến bất kỳ chiếc TV, máy tính bảng hay màn hình nào thành một bảng hiệu điện tử chuyên nghiệp mà không cần phụ thuộc vào dịch vụ đám mây đắt đỏ.

### Tính năng nổi bật:
- 🚀 **Resumable Upload:** Tải video dung lượng lớn (GB) cực kỳ ổn định, tự động tiếp tục nếu mất mạng.
- 📺 **Quản lý Màn hình:** Phân loại và gán nội dung riêng biệt cho hàng chục màn hình khác nhau.
- ⚡ **HLS Streaming:** Tự động tối ưu video và phát dưới dạng luồng (streaming), giúp TV load cực nhanh và mượt.
- 🎨 **Modern Dashboard:** Giao diện quản trị hiện đại, hỗ trợ Dark Mode và tương thích hoàn hảo trên điện thoại.
- 🔄 **CI/CD Tự động:** Tích hợp GitHub Actions & Dokploy giúp cập nhật hệ thống chỉ trong vài giây.

---

## 🚀 Triển khai (Deployment)

Hệ thống được thiết kế để chạy mượt mà trên môi trường Docker.

### 1. Triển khai Online (Khuyên dùng)
Hệ thống hiện tại đã hỗ trợ deploy lên VPS thông qua **Dokploy** và **GitHub Actions**.

- **Workflow:** Code -> Push GitHub -> GitHub Actions (Build Image) -> GHCR -> Dokploy (Pull & Deploy).
- **Domain:** [adsplay.caocuong.tech](https://adsplay.caocuong.tech)

> [!TIP]
> Chi tiết từng bước cấu hình VPS và CI/CD có thể xem tại: [DOKPLOY_DEPLOY_GUIDE.md](./docs/DOKPLOY_DEPLOY_GUIDE.md)

### 2. Chạy Local (Máy cá nhân)
Nếu bạn chỉ muốn dùng trong mạng LAN nội bộ:

**Windows:** Chạy file `start.bat`
**macOS/Linux:** Chạy lệnh `./start.sh`

Mặc định trang quản trị sẽ mở tại: `http://localhost:3000/admin`

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** Angular 19+ (Signal-based state management, TailwindCSS).
- **Backend:** Node.js, Express, LowDB (JSON Database).
- **Media:** FFmpeg (Optimize, HLS, Poster generation).
- **Infrastructure:** Docker, Nginx, GitHub Actions, Dokploy.

---

## 📂 Codebase Map

- `frontend/`: Toàn bộ mã nguồn giao diện Angular.
- `backend/`: API Server và logic xử lý Media.
- `.github/workflows/`: Quy trình tự động Build & Push Docker Image.
- `docker-compose.yml`: Cấu hình hệ thống Container.

---

## 🇻🇳 Hướng dẫn tiếng Việt

### Quy trình sử dụng:
1. **Upload Video:** Tải video lên kho lưu trữ (hỗ trợ kéo thả).
2. **Tạo Màn hình (Profile):** Đặt tên cho TV hoặc thiết bị trình chiếu.
3. **Thiết lập Playlist:** Chọn các video muốn phát cho màn hình đó.
4. **Trình chiếu:** Copy link Player (ví dụ: `https://adsplay.caocuong.tech/player/oppo-f11`) dán vào trình duyệt của TV/Máy tính bảng.

### Lưu ý quan trọng:
- Hệ thống tự động tối ưu video sau khi upload.
- Link trình chiếu sẽ tự động nhận diện Domain hoặc IP mà bạn đang truy cập.
- Dữ liệu (Video & Database) được bảo vệ trong các Volume độc lập, không bị mất khi cập nhật code.

---

## 📝 License

Dự án được phát hành dưới giấy phép **MIT**. Bạn hoàn toàn có quyền sử dụng, sửa đổi và phân phối lại.

---
<div align="center">
  Made with ❤️ by <b>D.Cao Cuong</b>
</div>
