import { type ExternalToast, toast } from "sonner"

type NotificationOptions = ExternalToast & {
  direction?: "ltr" | "rtl"
}

class NotificationService {
  private getOptions(options?: NotificationOptions): ExternalToast {
    const direction = options?.direction ?? "ltr"

    const { direction: _, className, ...toastOptions } = options ?? {}

    return {
      ...toastOptions,
      className: [className, direction === "rtl" ? "toast-rtl" : undefined]
        .filter(Boolean)
        .join(" "),
      style: {
        textAlign: direction === "rtl" ? "right" : "left",
        ...toastOptions.style,
      },
    }
  }

  success(message: string, options?: NotificationOptions) {
    return toast.success(message, this.getOptions(options))
  }

  error(message: string, options?: NotificationOptions) {
    return toast.error(message, this.getOptions(options))
  }

  warning(message: string, options?: NotificationOptions) {
    return toast.warning(message, this.getOptions(options))
  }

  info(message: string, options?: NotificationOptions) {
    return toast.info(message, this.getOptions(options))
  }

  loading(message: string, options?: NotificationOptions) {
    return toast.loading(message, this.getOptions(options))
  }

  dismiss(id?: string | number) {
    return toast.dismiss(id)
  }
}

export const notificationService = new NotificationService()
