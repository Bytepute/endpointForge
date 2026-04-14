/**
 * helper function to simulate delay on mock data
 * @param ms time for delay
 * @returns resolved promise after delay
 */
export function sleep(ms: number = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
