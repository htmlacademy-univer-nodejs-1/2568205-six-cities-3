import { UserType } from "./user/user_type.enum.js"

export type User = {
  name: string,
  email: string,
  avatar: string,
  password: string,
  type: UserType
}
export function isUser(obj: any): obj is User {
  return (
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.avatar === 'string' &&
    typeof obj.password === 'string'
    //['Basic', 'Pro'].includes(obj.type)
  );
}

