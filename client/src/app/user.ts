export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public subscribe_email: boolean,
    public email: string,
    public subscribe_phone: boolean,
    public phoneNumber: number,
    public supervisor: string
  ) { }
}