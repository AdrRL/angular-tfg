export interface User
{
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface Userlogin
{
  email: string;
  password: string;

  record?: string [];
}

export interface UserRegister
{
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  password: string,

  record?: string [];
}
