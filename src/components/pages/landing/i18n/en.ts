export const en = {
  nav: {
    features: "Features",
    howItWorks: "How it works",
    donate: "Support",
  },
  hero: {
    badge: "Mock API workbench",
    title: "Ship frontend flows before the backend exists",
    description:
      "Endpoint Forge lets developers create realistic mock APIs for testing, demos, and contract experiments without touching backend code.",
    cta: "Create mock API",
    secondaryCta: "See the workflow",
    proofNoBackend: "No backend required",
    proofJson: "JSON responses",
    proofTesting: "Built for testing",
    previewLabel: "Live mock preview",
    requestLabel: "Request",
    responseLabel: "Response",
    responseTime: "42ms",
    endpointPath: "/api/v1/users",
    endpointName: "Users endpoint",
    statusText: "201 Created",
    fieldMethod: "Method",
    fieldPath: "Path",
    fieldStatus: "Status",
    fieldBody: "Response body",
  },
  features: {
    eyebrow: "Why teams use it",
    title: "Mock the API surface your frontend expects",
    description:
      "Endpoint Forge keeps the workflow close to how developers already think: route, method, status, response, then use it.",
    mockServerTitle: "Mock real routes",
    mockServerDescription:
      "Create project-level APIs with controller paths that feel like production routes, not throwaway fixtures.",
    endpointsTitle: "Shape responses",
    endpointsDescription:
      "Define methods, paths, status codes, and JSON bodies so frontend states can be tested deliberately.",
    speedTitle: "Unblock testing",
    speedDescription:
      "Demo, test, and iterate on UI flows while backend contracts are still moving.",
  },
  howItWorks: {
    eyebrow: "The workflow",
    title: "From blank project to usable endpoint",
    description:
      "Four small steps replace the backend waiting room with a mock API your frontend can call immediately.",
    projectTitle: "Project",
    projectDescription:
      "Group a product, feature, or test surface into one mock workspace.",
    controllerTitle: "Controller",
    controllerDescription: "Define a base path such as /users or /products.",
    endpointTitle: "Endpoint",
    endpointDescription: "Set the method, route, status, and JSON response.",
    useTitle: "Use it",
    useDescription: "Point your frontend at the mock URL and keep building.",
  },
  donate: {
    title: "Support the project",
    description:
      "Endpoint Forge is an independent project. If this tool has been useful, you can help keep development moving.",
    cta: "Donate",
  },
  footer: {
    madeBy: "Built with love by the Bytepute team",
    description:
      "This project is designed for fast, simple Mock API creation so you can build, test, and demo interfaces without a real backend.",
    developers: "Developers",
  },
  auth: {
    login: "Log in",
    loginTitle: "Log in to your account",
    loginDescription: "Enter your account information.",
    register: "Sign up",
    registerTitle: "Create an account",
    registerDescription: "Enter your information to create an account.",
    username: "Username",
    usernamePlaceholder: "Username",
    email: "Email",
    password: "Password",
    passwordPlaceholder: "Password",
    confirmPassword: "Confirm password",
    loginSuccess: "Logged in successfully",
    loginError: "Login failed. Please try again.",
    registerSuccess: "Registration completed successfully",
    registerError: "Registration failed. Please try again.",
  },
  validation: {
    usernameMin: "Username must be at least 3 characters.",
    passwordMin: "Password must be at least 6 characters.",
    registerUsernameMin: "Username must be at least 3 characters.",
    invalidEmail: "Enter a valid email address.",
    passwordMismatch: "Passwords do not match.",
  },
  language: {
    toggle: "Switch to Persian",
    shortLabel: "FA",
  },
} as const
