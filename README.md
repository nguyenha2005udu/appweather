# WeatherNow

Ứng dụng dự báo thời tiết viết bằng React Native CLI, không dùng Expo. Ứng dụng xin quyền vị trí, lấy tọa độ GPS và gọi API thời tiết thật từ Open-Meteo để hiển thị thời tiết hiện tại, dự báo 24 giờ, dự báo 7 ngày và màn hình chi tiết.

## Chức năng chính

- Xem thời tiết theo vị trí hiện tại, nhiệt độ, trạng thái thời tiết, nhiệt độ cao/thấp và nhiệt độ cảm nhận.
- Xem dự báo 24 giờ với thời gian, biểu tượng, nhiệt độ và khả năng mưa.
- Xem dự báo 7 ngày với trạng thái, nhiệt độ cao/thấp và khả năng mưa.
- Chạm vào thời tiết hiện tại, từng giờ hoặc từng ngày để xem chi tiết.
- Theo dõi nhiệt độ, độ ẩm, tốc độ gió, hướng gió, UV, lượng mưa, áp suất và tầm nhìn.
- Xin quyền truy cập vị trí, lấy GPS và fallback về Hà Nội nếu người dùng từ chối quyền hoặc GPS lỗi.
- Xử lý Loading, Error và Empty.

## Công nghệ

- React Native CLI `0.76.5`
- React Navigation
- `@react-native-community/geolocation`
- `react-native-linear-gradient`
- Open-Meteo Forecast API

## API sử dụng

Ứng dụng dùng Open-Meteo Forecast API:

```text
https://api.open-meteo.com/v1/forecast
```

API này không yêu cầu API key cho mục đích phi thương mại. Ứng dụng truyền `latitude`, `longitude`, `current`, `hourly`, `daily`, `forecast_days=7` và `timezone=auto`.

## Cài đặt

```bash
npm install
```

Sau khi cài dependency iOS:

```bash
cd ios
pod install
cd ..
```

## Chạy ứng dụng

Metro:

```bash
npm start
```

Nếu app mở lên nhưng trắng màn hình, reset Watchman và Metro cache:

```bash
watchman watch-del-all
npm run start:reset
```

Sau đó mở terminal khác và chạy lại iOS:

```bash
npm run ios
```

Android Emulator hoặc thiết bị Android:

```bash
npm run android
```

iOS Simulator:

```bash
npm run ios
```

Nếu máy có nhiều thiết bị và React Native chọn nhầm iPhone thật, chạy rõ Simulator:

```bash
npm run ios:simulator
```

## Build APK

Tạo APK debug:

```bash
cd android
./gradlew assembleDebug
```

File APK thường nằm tại:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Cấu trúc mã nguồn

```text
App.tsx
index.js
android/
ios/
src/
  components/
    DailyRow.tsx
    HourlyCard.tsx
    MetricCard.tsx
    StateView.tsx
  screens/
    HomeScreen.tsx
    DetailScreen.tsx
  services/
    location.ts
    weatherApi.ts
  types/
    navigation.ts
    weather.ts
  utils/
    details.ts
    format.ts
    weatherCodes.ts
```

## Gợi ý quay video nộp bài

Mở ứng dụng trên Emulator/Simulator hoặc thiết bị thật, quay khoảng 1-2 phút gồm các bước:

1. Màn hình tải dữ liệu thời tiết Hà Nội.
2. Màn hình thời tiết hiện tại.
3. Vuốt danh sách dự báo theo giờ.
4. Chạm vào một giờ để xem chi tiết.
5. Xem dự báo 7 ngày và chạm vào một ngày bất kỳ.
6. Kéo để xem các chỉ số thời tiết.
