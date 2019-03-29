export class ErrorModel {
  statusCode: number;
  message: string;
  additions: any;
  isSuccessfully = false;

  constructor(statusCode: number, message: string, additions?: any) {
    Object.assign(this, { statusCode, message, additions });
  }
}
