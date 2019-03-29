export class Response {
  isSuccessfully = true;
  additions: any;

  constructor(additions?: any) {
    Object.assign(this, { ...additions });
  }
}
