export const fa = {
  nav: {
    features: "امکانات",
    howItWorks: "چطور کار می‌کنه",
    donate: "حمایت",
  },
  hero: {
    badge: "Mock API برای دولوپرها",
    title: "بک‌اند آماده نیست؟ UI رو بساز",
    description:
      "endpoint ماک بساز، جواب JSON بده و تست و دمو رو جلو ببر؛ بدون اینکه سراغ کد بک‌اند بری.",
    cta: "ساخت Mock API",
    secondaryCta: "ببین چطور کار می‌کنه",
    proofNoBackend: "بدون کدنویسی بک‌اند",
    proofJson: "جواب JSON",
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
    eyebrow: "کجا به کارت میاد؟",
    title: "همون APIای رو بساز که فرانت‌اندت لازم داره",
    description:
      "مسیر رو بده، متد و status رو انتخاب کن، جواب JSON رو بنویس و همون لحظه ازش استفاده کن.",
    mockServerTitle: "Route واقعی بساز",
    mockServerDescription:
      "برای هر پروژه routeهایی بساز که شبیه API واقعی محصول باشن، نه چند تا fixture پراکنده.",
    endpointsTitle: "جواب رو خودت بچین",
    endpointsDescription:
      "متد، مسیر، status code و بدنه JSON رو تنظیم کن تا stateهای مختلف UI رو راحت تست کنی.",
    speedTitle: "تست را عقب نینداز",
    speedDescription:
      "حتی وقتی قراردادهای بک‌اند هنوز قطعی نیستن، UI رو تست کن، دمو بده و سریع‌تر تغییرش بده.",
  },
  howItWorks: {
    eyebrow: "روند کار",
    title: "از پروژه خالی تا endpoint آماده",
    description:
      "چند قدم کوتاه کافیه تا به جای صبر کردن برای بک‌اند، یه Mock API داشته باشی که فرانت‌اندت صداش بزنه.",
    projectTitle: "پروژه",
    projectDescription: "برای محصول، فیچر یا سناریوی تستت یه فضای جدا بساز.",
    controllerTitle: "کنترلر",
    controllerDescription: "یک مسیر پایه مثل /users یا /products تعریف کن.",
    endpointTitle: "اندپوینت",
    endpointDescription: "متد، route، status و پاسخ JSON را مشخص کن.",
    useTitle: "استفاده",
    useDescription: "آدرس mock رو به فرانت‌اند بده و کارت رو ادامه بده.",
  },
  donate: {
    title: "از پروژه حمایت کن",
    description:
      "Endpoint Forge یه پروژه مستقله. اگه به کارت اومده، حمایتت کمک می‌کنه توسعه‌اش ادامه‌دار بمونه.",
    cta: "حمایت مالی",
  },
  footer: {
    madeBy: "ساخته شده توسط تیم Bytepute",
    description:
      "Endpoint Forge برای وقتیه که می‌خوای سریع Mock API بسازی، UI رو تست کنی، دمو بدی یا بدون بک‌اند واقعی جلو بری.",
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
