# 🚀 Hướng Dẫn Triển Khai AdPlay Online

Chào anh! Em đã chuẩn bị tất cả các file cần thiết để anh có thể đưa AdPlay lên VPS của mình. Dưới đây là tóm tắt các file và cách sử dụng chúng.

## 📂 Danh sách các file quan trọng

| File | Đường dẫn | Công dụng |
|------|-----------|-----------|
| **Docker Compose** | `./docker-compose.yml` | File chính để chạy toàn bộ hệ thống bằng Docker. |
| **Backend Docker** | `./backend/Dockerfile` | Cấu hình cho máy chủ xử lý video. |
| **Frontend Docker** | `./frontend/Dockerfile` | Cấu hình cho giao diện web (dùng Nginx). |
| **Biến môi trường** | `./.env.production` | Mẫu cấu hình bảo mật tên miền, mật khẩu. |
| **VPS Setup** | `./deploy/vps-setup.sh` | Script cài đặt nhanh Docker trên VPS. |
| **Nginx Host** | `./deploy/nginx-host.conf` | Cấu hình Nginx trên VPS để nhận tên miền. |
| **SSL Setup** | `./deploy/ssl-setup.sh` | Hướng dẫn cài đặt HTTPS miễn phí. |

---

## 🛠️ Các bước thực hiện trên VPS

### Bước 1: Chuẩn bị hạ tầng
Copy mã nguồn lên VPS (dùng Git hoặc SCP). Sau đó chạy script cài đặt Docker:
```bash
bash deploy/vps-setup.sh
```

### Bước 2: Cấu hình môi trường
Copy file mẫu `.env.production` thành `.env` và chỉnh sửa các thông số:
```bash
cp .env.production .env
nano .env # Đổi JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
```

### Bước 3: Chạy ứng dụng
Khởi động Docker Compose (lần đầu sẽ tốn vài phút để build):
```bash
docker-compose up -d
```

### Bước 4: Cài đặt Tên miền & SSL
1. Copy file `deploy/nginx-host.conf` vào `/etc/nginx/sites-available/adplay`.
2. Chỉnh sửa `server_name` thành tên miền của anh.
3. Tạo symlink và restart Nginx.
4. Chạy script SSL:
```bash
bash deploy/ssl-setup.sh
# Hoặc chạy trực tiếp: sudo certbot --nginx -d tên-miền-của-anh.com
```

---

## 📺 Kiểm tra với 10 màn hình
- Truy cập `https://[domain-của-anh]/admin` để quản lý.
- Mở link player trên các Tivi/Tablet qua 4G/Wifi khác để test độ mượt.
- Hệ thống hỗ trợ "Resumable Upload" nên nếu mạng yếu vẫn có thể upload video lớn.

**Chúc anh triển khai thành công! Nếu gặp lỗi gì lúc chạy lệnh trên VPS, anh cứ nhắn em nhé.**
