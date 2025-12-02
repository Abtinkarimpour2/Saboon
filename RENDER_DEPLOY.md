# راهنمای Deploy روی Render.com

## مراحل Deploy:

### 1. آماده‌سازی پروژه

پروژه شما آماده است! فایل‌های لازم اضافه شده‌اند.

### 2. ایجاد حساب در Render.com

1. به [render.com](https://render.com) بروید
2. یک حساب کاربری بسازید (می‌توانید با GitHub وارد شوید)
3. وارد داشبورد شوید

### 3. اتصال Repository

1. در داشبورد Render، روی **"New +"** کلیک کنید
2. **"Static Site"** را انتخاب کنید (برای React apps)
3. Repository خود را اتصال دهید:
   - اگر روی GitHub است، آن را انتخاب کنید
   - یا URL repository را وارد کنید

### 4. تنظیمات Deploy

در بخش تنظیمات:

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
dist
```

**Environment:**
- Node Version: `18.x` یا `20.x` (اختیاری)

### 5. Environment Variables (اختیاری)

اگر نیاز به متغیرهای محیطی دارید، می‌توانید در بخش Environment Variables اضافه کنید.

### 6. Deploy

1. روی **"Create Static Site"** کلیک کنید
2. Render به صورت خودکار build و deploy می‌کند
3. بعد از چند دقیقه، لینک سایت شما آماده می‌شود

## نکات مهم:

- ✅ Render به صورت خودکار از GitHub deploy می‌کند
- ✅ هر بار که push می‌کنید، deploy جدید انجام می‌شود
- ✅ لینک شما به صورت `your-app-name.onrender.com` خواهد بود
- ✅ می‌توانید custom domain اضافه کنید

## Troubleshooting:

اگر مشکلی پیش آمد:

1. **Build Error:** لاگ‌های build را در داشبورد Render بررسی کنید
2. **404 Error:** مطمئن شوید که `Publish Directory` روی `dist` تنظیم شده
3. **Routing Error:** برای React Router، باید یک `_redirects` یا تنظیمات خاص اضافه کنید

## هزینه:

- **Free Tier:** رایگان است اما:
  - بعد از 15 دقیقه عدم استفاده، sleep می‌شود
  - اولین درخواست بعد از sleep ممکن است 30-60 ثانیه طول بکشد
  - برای production بهتر است از پلن پولی استفاده کنید

## Alternative: Web Service (برای بهتر بودن)

اگر می‌خواهید از Web Service استفاده کنید (بهتر برای React Router):

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npx serve -s dist -l $PORT
```

**Environment:**
- Node: `18.x` یا `20.x`

این روش بهتر است چون:
- ✅ Sleep نمی‌شود
- ✅ React Router بهتر کار می‌کند
- ✅ Performance بهتر

