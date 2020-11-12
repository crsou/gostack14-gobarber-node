class Error {
  public readonly message: string;

  public readonly statusCode: number;

  /**
   * if statusCode isn't informed, it'll be a genereic 400 error
   */

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default Error;
