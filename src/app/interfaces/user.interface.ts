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
  name?: string;
  surname?: string;

  record?: string [];
}

export interface UserProfile
{
  name: string;
  surname: string;
  email: string;

  record?: string [];
}
