export const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  PATCH:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

export const getStatusBadgeColor = (statusCode: number): string => {
  if (statusCode >= 200 && statusCode < 300)
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  if (statusCode >= 400)
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
}
