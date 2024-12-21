export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatar: {
    invalidFormat: 'avatarPath is required',
  },
  name: {
    invalidFormat: 'name is required',
    invalidLength: 'name length must be from 1 to 15'
  },
  type: {
    invalidFormat: 'type must be basic or pro',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;
