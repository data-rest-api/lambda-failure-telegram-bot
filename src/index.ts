import { main } from './main'
import { Event } from './types'

process.env.NTBA_FIX_319 = '1'

/**
 * Startup
 */
// eslint-disable-next-line import/no-commonjs
exports.handler = async (event: Event) => {
  await main(event)
}
