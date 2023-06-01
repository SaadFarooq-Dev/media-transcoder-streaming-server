
export const userSchema = {
  type: 'object',
  required: ['username', 'email', 'password'],
  properties: {
    username: {
      type: 'string',
      minLength: 2
    },
    email: {
      type: 'string',
      format: 'email',
      minLength: 5
    },
    password: {
      type: 'string',
      minLength: 5
    }
  }
}
