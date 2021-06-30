import { telegram } from '@awesome-typescript/telegram-push-notification'

import { Event } from './types'

export const main = async (event: Event): Promise<void> => {
  await createTelegramMessageFacade(event)
}

const createTelegramMessageFacade = async (event: Event): Promise<void> => {
  const telegramBot = await telegram()

  // Telegram push message
  await telegramBot.pushInfoMessage(
    truncate(
      '\n ' +
        '\n ' +
        '\n ' +
        '----------------' +
        `Date UTC: ${new Date().toISOString()}` +
        '\n ' +
        `Date Estonia: ${new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/Tallinn',
        })}` +
        '\n ' +
        `Date Germany: ${new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/Berlin',
        })}` +
        '\n ' +
        `Date Moscow: ${new Date().toLocaleString('en-GB', {
          timeZone: 'Europe/Moscow',
        })}` +
        '\n' +
        '---' +
        '\n' +
        `Function start: ${event.timestamp}` +
        '\n' +
        `RequestId: ${event.requestId}` +
        '\n' +
        `Error Type: ${event.errorType}` +
        '\n' +
        `Status: ${event.status}` +
        '\n' +
        `Message: ${event.message}` +
        '\n' +
        `Stack: ${event.stack}` +
        '\n',
      4000,
    ),
  )
}

const truncate = (x: string, n: number) => {
  return x.length > n ? x.slice(0, Math.max(0, n - 1)) : x
}
