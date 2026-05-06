export interface LoginCredentials {
  identifier: string
  password: string
}

export type LoginErrors = Partial<Record<keyof LoginCredentials, string>>

export const validateLoginField = (
  name: keyof LoginCredentials,
  value: string
): string => {
  let error = ''

  switch (name) {
    case 'identifier':
      if (!value.trim()) {
        error = 'Username or email is required'
      }
      break

    case 'password':
      if (!value) {
        error = 'Password is required'
      }
      break
  }

  return error
}

export const validateLoginForm = (
  credentials: LoginCredentials
): LoginErrors => {
  const errors: LoginErrors = {}

  Object.keys(credentials).forEach((key) => {
    const field = key as keyof LoginCredentials
    const error = validateLoginField(field, credentials[field])

    if (error) {
      errors[field] = error
    }
  })

  return errors
}