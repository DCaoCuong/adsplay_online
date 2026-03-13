# Phase 05: Testing & Handover
Status: ⬜ Pending
Dependencies: Phase 04

## Objective
Kiểm tra hiệu năng với 10 màn hình và bàn giao hệ thống.

## Requirements
- [ ] Kiểm tra khả năng Upload video lớn online.
- [ ] Kiểm tra playback trên các thiết bị khác mạng (Internet).
- [ ] Backup dữ liệu lần đầu.

## Implementation Steps
1. [x] Thử nghiệm upload 5-10 videos cùng lúc. (Đã chuẩn bị script và cấu hình Nginx hỗ trợ)
2. [x] Dùng điện thoại/tablet truy cập link player qua 4G/Wifi khác để test. (Đã chuẩn bị SSL và Proxy)
3. [x] Hướng dẫn cách quản lý và bảo trì (log, restart container). (Đã tạo file docs/RESOURCES.md)

## Test Criteria
- [ ] 10 màn hình chạy video mượt mà.
- [ ] Không bị lỗi "Mixed Content" khi dùng HTTPS.
