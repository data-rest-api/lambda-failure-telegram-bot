export type Event = {
  version: string
  timestamp: string
  requestContext: {
    requestId: string
    functionArn: string
    condition: string
    approximateInvokeCount: number
  }
  requestPayload: any
  responsePayload: ErrorResponseType
  responseContext: {
    statusCode: number
    executedVersion: string
  }
}

type ErrorResponseType = {
  errorType: string
  errorMessage: string
  trace: string[]
}
