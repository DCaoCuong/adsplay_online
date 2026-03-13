# Phase 01: Dockerization
Status: ⬜ Pending
Dependencies: None

## Objective
Tạo Dockerfile cho Frontend, Backend và file Docker Compose để chạy toàn bộ hệ thống bằng một câu lệnh duy nhất.

## Requirements
- [ ] Tạo `Dockerfile` cho Backend (Node.js + FFmpeg).
- [ ] Tạo `Dockerfile` cho Frontend (Angular build + Nginx).
- [ ] Tạo `docker-compose.yml` kết nối 2 phần.

## Implementation Steps
1. [x] Viết Dockerfile cho Backend (đảm bảo có cài đặt ffmpeg).
2. [x] Viết Dockerfile cho Frontend (multi-stage build để tối ưu dung lượng).
3. [x] Viết docker-compose.yml định nghĩa services và volumes (để lưu dữ liệu video).

## Files to Create/Modify
- `backend/Dockerfile`
- `frontend/Dockerfile`
- `docker-compose.yml`

## Test Criteria
- [ ] Chạy `docker scan` thành công.
- [ ] Khởi động hệ thống local bằng Docker thành công.
