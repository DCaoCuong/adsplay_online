# HƯỚNG DẪN TRIỂN KHAI TRÊN DOKPLOY 🚀

Dự án: AdPlay
Domain: adsplay.caocuong.tech

## 1. Tạo Project & Application
- Vào Dokploy Dashboard -> Click "Create Project" -> Đặt tên: `AdPlay Online`
- Trong Project vừa tạo -> Click "Create Application" -> Chọn "Compose"
- Đặt tên App: `adplay-system`

## 2. Kết nối GitHub
- Tại tab **"Source"**: Chọn Repository GitHub của anh.
- **Branch**: `main` (hoặc branch anh đang code).
- **Compose Path**: để mặc định `./docker-compose.yml`.

## 3. Cấu hình Biến môi trường (Environment)
Vào tab **"Environment"**, chọn chế độ "Bulk Edit" và dán toàn bộ nội dung dưới đây vào:

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=IerNaq+Ogi/nn+D2Yn2WVD+TP8zjSvZzMRLc0628zeE=
ADMIN_USERNAME=doancaocuong
ADMIN_PASSWORD=113dcc
MAX_UPLOAD_SIZE_MB=2048
RESUMABLE_CHUNK_SIZE_MB=8
```
*(Ghi chú: Anh có thể đổi JWT_SECRET và mật khẩu nếu muốn bảo mật hơn nhé)*

## 4. Cấu hình Domain (Reverse Proxy)
- Vào tab **"Domains"** của service `frontend`.
- Nhập Domain: `adsplay.caocuong.tech`.
- Port: `80` (Của frontend container).
- Bật **"Certificate" (SSL)** để có HTTPS.

## 5. Triển khai
- Quay lại tab **"Deploy"** -> Click **"Deploy"**.
- Chờ Dokploy kéo code, build image và chạy.

## 6. Lưu ý về Dữ liệu (Persistence)
- Hệ thống đã cấu hình 2 volume: `adplay-uploads` và `adplay-db`. 
- Khi anh xóa app hoặc redeploy, video và dữ liệu sẽ KHÔNG bị mất nhờ 2 volume này quản lý độc lập.

---
Xong rồi đó anh! Chúc anh triển khai thành công rực rỡ! 🎯
