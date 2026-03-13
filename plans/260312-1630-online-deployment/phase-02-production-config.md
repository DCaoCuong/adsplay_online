# Phase 02: Production Config
Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Cấu hình các tham số môi trường và bảo mật cho phiên bản chạy thật (Production).

## Requirements
- [ ] Tạo file `.env.production` cho Backend.
- [ ] Cấu hình `JWT_SECRET` mạnh.
- [ ] Thiết lập quyền truy cập và hạn chế dung lượng upload tối đa.
- [ ] Cấu hình Nginx config bên trong Docker (nếu cần).

## Implementation Steps
1. [x] Tạo file `.env` mẫu cho môi trường online.
2. [x] Kiểm tra và cập nhật logic xác thực (đảm bảo admin password đã được đổi).
3. [x] Cấu hình đường dẫn lưu trữ video trong container để persist ra ngoài VPS.

## Test Criteria
- [ ] Các biến môi trường được load đúng trong Container.
- [ ] Token đăng nhập được tạo và xác thực thành công.
