export const fa = {
  nav: {
    features: "امکانات",
    howItWorks: "نحوه کار",
    donate: "حمایت از پروژه",
  },
  hero: {
    badge: "Endpoint Forge",
    title: "ساخت سریع Mock API برای توسعه فرانت‌اند",
    description:
      "Endpoint Forge ابزاری برای توسعه‌دهندگان فرانت‌اند است که اجازه می‌دهد بدون نیاز به بک‌اند واقعی، APIهای مورد نیاز خود را سریع شبیه‌سازی کنید.",
    cta: "ساخت پروژه جدید",
  },
  features: {
    title: "امکانات اصلی",
    mockServerTitle: "ساخت Mock Server",
    mockServerDescription:
      "با چند کلیک یک پروژه بسازید که endpointهای تعریف شده شما را روی سرور ما اجرا می‌کند. localhost به‌زودی اضافه می‌شود.",
    endpointsTitle: "مدیریت Endpointها",
    endpointsDescription:
      "متد، مسیر، status code و پاسخ JSON را برای هر endpoint تعریف و مدیریت کنید.",
    speedTitle: "توسعه سریع",
    speedDescription:
      "فرانت‌اند را بدون انتظار برای آماده شدن بک‌اند توسعه دهید.",
  },
  howItWorks: {
    title: "نحوه کار",
    projectTitle: "۱. ایجاد پروژه",
    projectDescription:
      "ابتدا یک پروژه ایجاد کنید تا endpointهای مربوط به آن را مدیریت کنید.",
    controllerTitle: "۲. ایجاد Controller",
    controllerDescription:
      "مسیر پایه API مثل /users یا /products را تعریف کنید.",
    endpointTitle: "۳. تعریف Endpoint",
    endpointDescription:
      "متد و پاسخ JSON را تعریف کنید و بلافاصله از API استفاده کنید.",
  },
  donate: {
    title: "حمایت از پروژه",
    description:
      "Endpoint Forge یک پروژه مستقل است. اگر این ابزار برای شما مفید بوده، می‌توانید با حمایت مالی به ادامه توسعه آن کمک کنید.",
    cta: "حمایت مالی",
  },
  footer: {
    madeBy: "ساخته شده با عشق توسط تیم Bytepute",
    description:
      "این پروژه برای ساخت سریع و ساده Mock API طراحی شده تا بدون نیاز به بک‌اند واقعی، بتوانید رابط کاربری‌تان را توسعه، تست و دمو کنید.",
    developers: "توسعه‌دهندگان",
  },
  auth: {
    login: "ورود",
    loginTitle: "ورود به حساب",
    loginDescription: "لطفاً اطلاعات حساب خود را وارد کنید.",
    register: "ثبت نام",
    registerTitle: "ساخت حساب",
    registerDescription: "لطفاً اطلاعات خود را برای ایجاد حساب وارد کنید.",
    username: "نام کاربری",
    usernamePlaceholder: "نام کاربری",
    email: "ایمیل",
    password: "رمز عبور",
    passwordPlaceholder: "رمز عبور",
    confirmPassword: "تکرار رمز عبور",
    loginSuccess: "با موفقیت وارد شدید",
    loginError: "خطا در ورود. دوباره تلاش کنید",
    registerSuccess: "ثبت نام با موفقیت انجام شد",
    registerError: "خطا در ثبت نام. دوباره تلاش کنید",
  },
  validation: {
    usernameMin: "نام کاربری نمی‌تواند کمتر از ۳ کاراکتر باشد.",
    passwordMin: "رمز عبور نمی‌تواند کمتر از ۶ کاراکتر باشد.",
    registerUsernameMin: "نام کاربری باید حداقل ۳ کاراکتر باشد.",
    invalidEmail: "ایمیل معتبر نیست.",
    passwordMismatch: "رمز عبور مطابقت ندارد.",
  },
  language: {
    toggle: "Switch to English",
    shortLabel: "EN",
  },
} as const
