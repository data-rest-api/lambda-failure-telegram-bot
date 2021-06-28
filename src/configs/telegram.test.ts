import { ConfigurationException } from '@awesome-typescript/exceptions'

import { telegramBotConfiguration } from './telegram'

describe('telegram-bot-configuration', () => {
  test('should throw an error, if TELEGRAM_BOT_NAME are missed', () => {
    process.env.AMAZONAWS_S3_BUCKET = ''
    process.env.TELEGRAM_BOT_NAME = ''
    process.env.TELEGRAM_USER_NAME = ''
    process.env.TELEGRAM_TOKEN = ''
    process.env.TELEGRAM_CHANNEL_ID = ''

    expect(() => {
      telegramBotConfiguration()
    }).toThrow(ConfigurationException)
  })

  test('should throw an error, if TELEGRAM_USER_NAME are missed (2)', () => {
    process.env.AMAZONAWS_S3_BUCKET = ''
    process.env.TELEGRAM_BOT_NAME = '1234'
    process.env.TELEGRAM_USER_NAME = ''
    process.env.TELEGRAM_TOKEN = ''
    process.env.TELEGRAM_CHANNEL_ID = ''

    expect(() => {
      telegramBotConfiguration()
    }).toThrow(ConfigurationException)
  })

  test('should throw an error, if TELEGRAM_TOKEN are missed (3)', () => {
    process.env.AMAZONAWS_S3_BUCKET = ''
    process.env.TELEGRAM_BOT_NAME = '1234'
    process.env.TELEGRAM_USER_NAME = '1234'
    process.env.TELEGRAM_TOKEN = ''
    process.env.TELEGRAM_CHANNEL_ID = ''

    expect(() => {
      telegramBotConfiguration()
    }).toThrow(ConfigurationException)
  })

  test('should throw an error, if TELEGRAM_CHANNEL_ID are missed (4)', () => {
    process.env.AMAZONAWS_S3_BUCKET = ''
    process.env.TELEGRAM_BOT_NAME = '1234'
    process.env.TELEGRAM_USER_NAME = '1234'
    process.env.TELEGRAM_TOKEN = '1234'
    process.env.TELEGRAM_CHANNEL_ID = ''

    expect(() => {
      telegramBotConfiguration()
    }).toThrow(ConfigurationException)
  })

  test('should not throw an error, if FAILURE_SCREENSHOTS_STORAGE_PATH are missed (5)', () => {
    process.env.AMAZONAWS_S3_BUCKET = '1234'
    process.env.TELEGRAM_BOT_NAME = '1234'
    process.env.TELEGRAM_USER_NAME = '1234'
    process.env.TELEGRAM_TOKEN = '1234'
    process.env.TELEGRAM_CHANNEL_ID = '1234'

    expect(() => {
      telegramBotConfiguration()
    }).not.toThrow(ConfigurationException)
  })

  test('should not throw an error, if all env exist', () => {
    process.env.AMAZONAWS_S3_BUCKET = '1234'
    process.env.TELEGRAM_BOT_NAME = '1234'
    process.env.TELEGRAM_USER_NAME = '1234'
    process.env.TELEGRAM_TOKEN = '1234'
    process.env.TELEGRAM_CHANNEL_ID = '1234'

    expect(() => {
      telegramBotConfiguration()
    }).not.toThrow(Error)
  })
})
