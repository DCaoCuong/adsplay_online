# Phase 03: VPS Setup & Nginx
Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Chuẩn bị hạ tầng VPS và cài đặt trình điều hướng (Nginx).

## Requirements
- [ ] Cài đặt Docker & Docker Compose trên VPS.
- [ ] Cài đặt Nginx trên VPS làm Reverse Proxy.
- [ ] Cấu hình tường lửa (Firewall) mở cổng 80, 443.

## Implementation Steps
1. [x] Hướng dẫn/Thực hiện cài đặt Docker engine trên Ubuntu/Linux của VPS.
2. [x] Viết file cấu hình Nginx (sites-available) để trỏ tên miền vào Docker port.
3. [x] Kiểm tra kết nối từ Domain tới VPS.

## Test Criteria
- [ ] Lệnh `docker ps` chạy được trên VPS.
- [ ] Tên miền trỏ về đúng IP VPS.
