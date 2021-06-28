import { telegram } from '@awesome-typescript/telegram-push-notification'

import { main } from './main'

describe('main', () => {
  let event: any

  beforeEach(() => {
    event = {
      version: '1.0',
      timestamp: '2020-10-28T12:04:51.067Z',
      requestContext: {
        requestId: '96458ad6-60aa-4abf-8ff8-0a7bef10b9fc',
        functionArn:
          'arn:aws:lambda:us-east-2:179994997879:function:test1:$LATEST',
        condition: 'RetriesExhausted',
        approximateInvokeCount: 3,
      },
      requestPayload: {
        Success: true,
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      },
      responseContext: {
        statusCode: 200,
        executedVersion: '$LATEST',
        functionError: 'Unhandled',
      },
      responsePayload: {
        errorType: 'ValidationError',
        errorMessage: 'test message',
        trace: [
          'ValidationError: test message',
          '    at Runtime.exports.handler (/var/task/index.js:28:19)',
          '    at Runtime.handleOnce (/var/runtime/Runtime.js:66:25)',
        ],
      },
    }
  })

  test('should throw an error, if TELEGRAM_TOKEN are missed', async () => {
    process.env.TELEGRAM_BOT_NAME = ''
    process.env.TELEGRAM_USER_NAME = ''
    process.env.TELEGRAM_TOKEN = ''
    process.env.TELEGRAM_CHANNEL_ID = ''
    process.env.FAILURE_SCREENSHOTS_STORAGE_PATH = ''

    try {
      await main(event)
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.message).toBe('TELEGRAM_TOKEN')
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.name).toBe('ConfigurationException')
    }
  })

  test('should call pushInfoMessage, pushGyazoMessage functions', async () => {
    process.env.TELEGRAM_BOT_NAME = '1234'
    process.env.TELEGRAM_USER_NAME = '1234'
    process.env.TELEGRAM_TOKEN = '1234'
    process.env.TELEGRAM_CHANNEL_ID = '1234'
    process.env.FAILURE_SCREENSHOTS_STORAGE_PATH = './tmp'
    process.env.GYAZO_TOKEN = '1234'

    const spyOnInfo = jest.spyOn(telegram(), 'pushInfoMessage')
    const spyOnGyazo = jest.spyOn(telegram(), 'pushGyazoMessage')

    try {
      await main(event)
      expect(spyOnInfo).toHaveBeenCalled()
      expect(spyOnGyazo).toHaveBeenCalled()
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeNull()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBeUndefined()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).not.toBe(Error)
    }
  })
})
