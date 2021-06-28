import { main } from './main'
import type { Event } from './types'

export const failureTelegramBotHandler = async (
  event: Event,
): Promise<void> => {
  await main(event)
}
