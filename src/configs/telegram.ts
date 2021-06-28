import { ConfigurationException } from '@awesome-typescript/crawler-exceptions'

import telegram from './telegram.json'

type Telegram = {
  s3Bucket: string
  telegramBotName: string
  telegramUserName: string
  telegramToken: string
  telegramChannelId: string
}

export const telegramBotConfiguration = (): Telegram => {
  const s3Bucket = process.env.AMAZONAWS_S3_BUCKET || telegram.s3Bucket || ''
  if (!s3Bucket) {
    throw new ConfigurationException('AMAZONAWS_S3_BUCKET')
  }
  if (s3Bucket.length <= 3) {
    throw new ConfigurationException('AMAZONAWS_S3_BUCKET')
  }

  const telegramBotName =
    process.env.TELEGRAM_BOT_NAME || telegram.telegramBotName || ''
  if (!telegramBotName) {
    throw new ConfigurationException('TELEGRAM_BOT_NAME')
  }
  if (telegramBotName.length <= 3) {
    throw new ConfigurationException('TELEGRAM_BOT_NAME')
  }

  const telegramUserName =
    process.env.TELEGRAM_USER_NAME || telegram.telegramUserName || ''
  if (!telegramUserName) {
    throw new ConfigurationException('TELEGRAM_USER_NAME')
  }
  if (telegramUserName.length <= 3) {
    throw new ConfigurationException('TELEGRAM_USER_NAME')
  }

  const telegramToken =
    process.env.TELEGRAM_TOKEN || telegram.telegramToken || ''
  if (!telegramToken) {
    throw new ConfigurationException('TELEGRAM_TOKEN')
  }
  if (telegramToken.length <= 3) {
    throw new ConfigurationException('TELEGRAM_TOKEN')
  }

  const telegramChannelId =
    process.env.TELEGRAM_CHANNEL_ID || telegram.telegramFailureChannelId || ''
  if (!telegramChannelId) {
    throw new ConfigurationException('TELEGRAM_CHANNEL_ID')
  }
  if (telegramChannelId.length <= 3) {
    throw new ConfigurationException('TELEGRAM_CHANNEL_ID')
  }

  return {
    s3Bucket,
    telegramBotName,
    telegramUserName,
    telegramToken,
    telegramChannelId,
  }
}
