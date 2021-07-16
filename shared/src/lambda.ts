export interface Response {
  statusCode?: number
  [k: string]: any
}

/**
 * Formats the given parameters to a response object
 * @param response
 * @returns 
 */
export function toResponse(response: Response): { statusCode: number , body: string } {
  const { statusCode, ...body } = response;

  return {
    statusCode: statusCode ?? 200,
    body: JSON.stringify(body, null, 2)
  }
}
