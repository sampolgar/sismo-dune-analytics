export class DuneError extends Error {
  public statusCode: number;
  public url: string | undefined;

  constructor(statusCode: number, message: string, url?: string) {
    super(message);
    this.statusCode = statusCode;
    this.url = url;
  }
}

export class DuneErrorFactory {
  public static getErrorMessage(statusCode: number): string {
    const errorMap = new Map([
      [
        400,
        '400 - Bad request, check your Dune request URL and query parameters. Your query parameter keys must match your Dune Query',
      ],
      [401, '401 - Unauthorized, check your Dune API key'],
      [403, '403 - Forbidden, check your Dune queryId'],
      [404, '404 - Not found, check your Dune queryId'],
      [500, '500 - Internal server error'],
      [503, '503 - Service unavailable'],
      [
        101,
        'Custom error - No data returned from Dune Analytics. Check the address field matches the address field in Dune. The address field in Dune must not have a space e.g. ETH Address. If so, rename it to ETH_Address or ETHAddress',
      ],
      [
        102,
        'Check the eth address field matches the eth address field in Dune.',
      ],
    ]);
    return errorMap.get(statusCode) || 'Unknown error';
  }

  public static createError(statusCode: number, url?: string): DuneError {
    const errorMessage = DuneErrorFactory.getErrorMessage(statusCode);
    return new DuneError(statusCode, errorMessage, url);
  }
}
