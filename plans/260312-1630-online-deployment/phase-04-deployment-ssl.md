# Phase 04: Deployment & SSL
Status: ⬜ Pending
Dependencies: Phase 03

## Objective
Đưa code lên VPS, chạy hệ thống và kích hoạt bảo mật SSL.

## Requirements
- [ ] Clone/Transfer code lên VPS.
- [ ] Chạy `docker-compose up -d`.
- [ ] Cài đặt SSL miễn phí qua Certbot (Let's Encrypt).

## Implementation Steps
1. [x] Đẩy mã nguồn lên VPS (Git hoặc SCP).
2. [x] Build images và start containers trên VPS.
3. [x] Chạy Certbot để lấy SSL cho tên miền.
4. [x] Cấu hình Nginx tự động chuyển hướng HTTP sang HTTPS.

## Test Criteria
- [ ] Truy cập được website qua link https://[domain].
- [ ] Chứng chỉ SSL hợp lệ.
