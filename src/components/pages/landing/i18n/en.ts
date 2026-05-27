export const en = {
  nav: {
    features: "Features",
    howItWorks: "How it works",
    donate: "Support",
  },
  hero: {
    badge: "Endpoint Forge",
    title: "Build Mock APIs fast for frontend development",
    description:
      "Endpoint Forge helps frontend developers simulate the APIs they need without waiting for a real backend.",
    cta: "Create a new project",
  },
  features: {
    title: "Core features",
    mockServerTitle: "Build a mock server",
    mockServerDescription:
      "Create a project in a few clicks and run your endpoints on our server. Localhost support is coming soon.",
    endpointsTitle: "Manage endpoints",
    endpointsDescription:
      "Define and manage the method, path, status code, and JSON response for each endpoint.",
    speedTitle: "Move faster",
    speedDescription:
      "Build the frontend without waiting for backend work to be ready.",
  },
  howItWorks: {
    title: "How it works",
    projectTitle: "1. Create a project",
    projectDescription:
      "Start with a project so you can manage its related endpoints.",
    controllerTitle: "2. Create a controller",
    controllerDescription:
      "Define a base API path such as /users or /products.",
    endpointTitle: "3. Define endpoints",
    endpointDescription:
      "Set the method and JSON response, then use the API immediately.",
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
