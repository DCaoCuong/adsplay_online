# AdPlay - Digital Signage Solution (Giải pháp trình chiếu nội dung kỹ thuật số)

[English Version](#english-version) | [Phiên Bản Tiếng Việt](#vietnamese-version-phiên-bản-tiếng-việt)

---

## English Version

### What is AdPlay?
AdPlay is a lightweight digital signage system designed to run on your local network. It allows you to upload videos, organize them into playlists (Profiles), and play them on any device (TV, phone, tablet) connected to the same Wi-Fi.

### How to Start the App
To use the app easily, we have provided startup scripts that will run both the Backend and Frontend for you automatically.

**For Windows Users:**
1. Open the folder containing the `AdPlay` project.
2. Double-click the `start.bat` file.
3. Two command windows will open automatically (one for the Backend, one for the Frontend). *Do not close these windows while using the app.*

**For macOS / Linux Users:**
1. Open a terminal and navigate to the `AdPlay` folder.
2. Run the startup script by typing:
   ```bash
   ./start.sh
   ```
3. Leave this terminal open while using the app. You can press `Ctrl+C` to stop the servers later.

### How to Access the App
- **On this computer (Host Machine):**
  - **Dashboard** (Manage content): Open your browser and go to `http://localhost:4200/admin`
  - **Player** (Show videos): Open your browser and go to `http://localhost:4200/player`
- **On other devices (TV, iPad, Phone):**
  - Make sure they are connected to the **same Wi-Fi network**.
  - Open a browser and type: `http://<YOUR_IP>:4200/admin` or `http://<YOUR_IP>:4200/player` (Replace `<YOUR_IP>` with the IP address from step 1, like `192.168.1.10`).

### How to Use the Dashboard (`/admin`)
1. **Upload Videos**: First, upload the video files you want to display.
2. **Create Profiles (Playlists)**: A Profile is a playlist of videos. Create a new Profile, give it a name, and select the uploaded videos you want to include in it.

### How to Use the Player (`/player`)
1. Open the Player link on your display device.
2. The player provides a clean, full-screen video experience.
3. You can play a specific profile by adding the profile name to the link: `http://<YOUR_IP>:4200/player/<ProfileName>`
4. *Note: Browsers often block automatic video sound. If the video has sound, you may need to click "Chạm Để Bật Tiếng" (Tap to Unmute) on the screen to hear the audio.*

---

## Vietnamese Version (Phiên Bản Tiếng Việt)

### AdPlay là gì?
AdPlay là một hệ thống trình chiếu nội dung kỹ thuật số (digital signage) nhỏ gọn, hoạt động trên mạng nội bộ (mạng LAN/Wi-Fi). Hệ thống giúp bạn tải video lên, sắp xếp chúng thành các danh sách phát (Profile) và trình chiếu trên bất kỳ thiết bị nào (TV, điện thoại, máy tính bảng) cùng kết nối chung một mạng Wi-Fi.

### Cách Khởi Động Ứng Dụng
Để sử dụng dễ dàng hơn, chúng tôi đã tạo sẵn các file khởi động tự động để chạy cả Backend và Frontend cùng một lúc.

**Dành cho người dùng Windows:**
1. Mở thư mục chứa dự án `AdPlay`.
2. Nhấn đúp chuột (chuột trái 2 lần) vào file `start.bat`.
3. Hai cửa sổ lệnh sẽ tự động xuất hiện (một cái cho Backend, một cái cho Frontend). *Vui lòng không đóng hai cửa sổ này trong quá trình sử dụng.*

**Dành cho người dùng macOS / Linux (Macbook):**
1. Mở ứng dụng Terminal và đi tới thư mục `AdPlay`.
2. Chạy lệnh khởi động bằng cách gõ:
   ```bash
   ./start.sh
   ```
3. Giữ cửa sổ terminal này mở trong lúc sử dụng. Bạn có thể nhấn tổ hợp phím `Ctrl+C` để tắt máy chủ sau đó.

### Cách Truy Cập Ứng Dụng
- **Trên máy tính đang chạy phần mềm (Host Machine):**
  - **Trang quản trị (Dashboard)**: Mở trình duyệt web và truy cập `http://localhost:4200/admin`
  - **Chế độ phát (Player)**: Mở trình duyệt web và truy cập `http://localhost:4200/player`
- **Trên các thiết bị khác (TV, iPad, Điện thoại):**
  - Đảm bảo thiết bị đã kết nối vào **cùng một mạng Wi-Fi** với máy chủ.
  - Mở trình duyệt web và gõ: `http://<ĐỊA_CHỈ_IP>:4200/admin` hoặc `http://<ĐỊA_CHỈ_IP>:4200/player` (Thay `<ĐỊA_CHỈ_IP>` bằng địa chỉ lấy được ở bước 1, ví dụ: `192.168.1.10`).

### Cách Sử Dụng Trang Quản Trị (`/admin`)
1. **Tải Video Lên (Upload Videos)**: Trước tiên, hãy tải lên các file video bạn muốn trình chiếu.
2. **Tạo Profile (Danh sách phát)**: Profile chính là danh sách các video sẽ được phát liên tục. Hãy tạo một Profile mới, đặt tên, và chọn các video bạn muốn đưa vào danh sách này.

### Cách Sử Dụng Chế Độ Phát (`/player`)
1. Mở đường link Player trên thiết bị dùng để trình chiếu (ví dụ: TV).
2. Màn hình Player sẽ phát video tràn viền, không có giao diện rườm rà.
3. Bạn có thể chọn phát một Profile cụ thể bằng cách thêm tên Profile vào sau đường link: `http://<ĐỊA_CHỈ_IP>:4200/player/<Tên_Profile>`
4. *Lưu ý: Các trình duyệt web thường chặn tự động phát âm thanh. Nếu video có tiếng, bạn có thể cần nhấn vào nút "Chạm Để Bật Tiếng" trên màn hình để nghe được âm thanh.*
