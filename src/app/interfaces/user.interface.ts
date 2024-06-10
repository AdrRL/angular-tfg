import { ApiResponse } from "./result.interface";

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

  photo?: string;
  name?: string;
  surname?: string;

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

export interface UserProfile
{
  email: string,
  username: string,
  firstName: string,
  lastName: string,

  record: UserRecord[],
  photo?:string
}

export interface UserRecord
{
  type: 'calcular' | 'complejidad',
  name: string,
  data: ApiResponse
}
