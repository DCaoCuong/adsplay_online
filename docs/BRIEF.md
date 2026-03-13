# 💡 BRIEF: AdPlay Online Deployment

**Ngày tạo:** 2026-03-12
**Trạng thái:** Brainstorming hoàn tất

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
Hệ thống AdPlay hiện tại đang chạy ở chế độ Local (mạng LAN). Người dùng muốn đưa hệ thống lên trực tuyến (Online) để quản lý từ xa.

## 2. GIẢI PHÁP ĐỀ XUẤT
Triển khai hệ thống lên VPS cá nhân, sử dụng Docker để đóng gói và Nginx làm Reverse Proxy để map tên miền và cài đặt SSL.

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Chính:** Cá nhân người dùng (quản trị nội bộ).
- **Thiết bị đầu cuối:** Khoảng 10 màn hình (TV/Tablet) truy cập qua Internet.

## 4. TÍNH NĂNG RÀ SOÁT (MVP Online)
- [ ] Chạy Backend & Frontend đồng thời trên VPS.
- [ ] Truy cập qua Domain với HTTPS.
- [ ] Giữ nguyên tính năng Upload video chia nhỏ (quan trọng cho môi trường online).
- [ ] Bảo mật cơ bản (đổi pass admin, cấu hình JWT Secret).

## 5. ƯỚC TÍNH SƠ BỘ
- **Độ phức tạp:** Trung bình (do cần kỹ năng về Docker/VPS).
- **Rủi ro:** Tốc độ stream video phụ thuộc vào băng thông VPS.

## 6. BƯỚC TIẾP THEO
→ Chạy `/plan` để tạo các phase triển khai cụ thể.
