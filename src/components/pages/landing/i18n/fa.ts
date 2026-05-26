export const fa = {
  nav: {
    features: "امکانات",
    howItWorks: "چطور کار می‌کند",
    donate: "حمایت",
  },
  hero: {
    badge: "Mock API برای دولوپرها",
    title: "بک‌اند آماده نیست؟ UI را بساز",
    description:
      "endpoint ماک بساز، پاسخ JSON بده و تست و دمو را جلو ببر؛ بدون اینکه سراغ کد بک‌اند بروی.",
    cta: "ساخت Mock API",
    secondaryCta: "ببین چطور کار می‌کند",
    proofNoBackend: "بدون کدنویسی بک‌اند",
    proofJson: "پاسخ‌های JSON",
    proofTesting: "برای تست و دمو",
    previewLabel: "پیش‌نمایش زنده",
    requestLabel: "درخواست",
    responseLabel: "پاسخ",
    responseTime: "۴۲ms",
    endpointPath: "/api/v1/users",
    endpointName: "Users endpoint",
    statusText: "201 Created",
    fieldMethod: "Method",
    fieldPath: "Path",
    fieldStatus: "Status",
    fieldBody: "Response body",
  },
  features: {
    eyebrow: "به درد چه کاری می‌خورد؟",
    title: "همان APIای را بساز که فرانت‌اندت منتظرش است",
    description:
      "روند کار ساده است: مسیر را بده، متد و status را انتخاب کن، پاسخ JSON را بنویس و همان لحظه ازش استفاده کن.",
    mockServerTitle: "Route واقعی بساز",
    mockServerDescription:
      "برای هر پروژه مسیرهایی بساز که شبیه API واقعی محصول باشند، نه چند تا fixture پراکنده.",
    endpointsTitle: "پاسخ را خودت شکل بده",
    endpointsDescription:
      "متد، مسیر، status code و بدنه JSON را دقیق تنظیم کن تا حالت‌های مختلف UI را راحت تست کنی.",
    speedTitle: "تست را عقب نینداز",
    speedDescription:
      "حتی وقتی قراردادهای بک‌اند هنوز قطعی نیستند، UI را تست کن، دمو بده و سریع‌تر تکرار کن.",
  },
  howItWorks: {
    eyebrow: "روند کار",
    title: "از یک پروژه خالی تا endpoint آماده استفاده",
    description:
      "چند قدم کوتاه کافی است تا به جای صبر کردن برای بک‌اند، یک Mock API داشته باشی که فرانت‌اندت بتواند صدا بزند.",
    projectTitle: "پروژه",
    projectDescription: "برای محصول، فیچر یا سناریوی تستت یک فضای جدا بساز.",
    controllerTitle: "کنترلر",
    controllerDescription: "یک مسیر پایه مثل /users یا /products تعریف کن.",
    endpointTitle: "اندپوینت",
    endpointDescription: "متد، route، status و پاسخ JSON را مشخص کن.",
    useTitle: "استفاده",
    useDescription: "آدرس mock را به فرانت‌اند بده و کار را ادامه بده.",
  },
  donate: {
    title: "از پروژه حمایت کن",
    description:
      "Endpoint Forge یک پروژه مستقل است. اگر به کارت آمده، حمایت تو کمک می‌کند توسعه‌اش ادامه‌دار بماند.",
    cta: "حمایت مالی",
  },
  footer: {
    madeBy: "ساخته شده توسط تیم Bytepute",
    description:
      "Endpoint Forge برای ساخت سریع Mock API ساخته شده؛ برای وقتی که می‌خواهی UI را تست کنی، دمو بدهی یا بدون بک‌اند واقعی جلو بروی.",
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
