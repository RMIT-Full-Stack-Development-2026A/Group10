export interface FormData {
    username: string
    email: string
    password: string
    confirmPassword: string
    country: string
}

export type Errors = Partial<Record<keyof FormData, string>>

export const validateField = (
    name: keyof FormData,
    value: string,
    formData: FormData
): string => {
    let errorMsg = ''

    switch (name) {
        case 'username': {
            const usernameRegex = /^[a-zA-Z0-9_-]+$/
            if (!value.trim()) {
                errorMsg = 'Username is required'
            } else if (!usernameRegex.test(value)) {
                errorMsg =
                    'Username can only contain letters, numbers, _, and -. Example: John_Doe-99'
            }
            break
        }

        case 'email': {
            const emailRegex = /^[^\s@()]+@[^\s@()]+\.[^\s@()]+$/
            if (!value.trim()) {
                errorMsg = 'Email is required'
            } else if (value.length >= 255 || !emailRegex.test(value)) {
                errorMsg =
                    'Invalid email syntax. Must contain exactly one "@" and "." after it. Example: user@domain.com'
            }
            break
        }

        case 'password': {
            if (!value) errorMsg = 'Password is required'
            else if (value.length < 8)
                errorMsg = 'Password must be at least 8 characters.'
            else if (!/(?=.*\d)/.test(value))
                errorMsg = 'Password must contain at least 1 number.'
            else if (!/(?=.*[!@#$%^&*])/.test(value))
                errorMsg =
                    'Password must contain at least 1 special character (!@#$%^&*).'
            else if (!/(?=.*[A-Z])/.test(value))
                errorMsg = 'Password must contain at least 1 uppercase letter.'
            break
        }

        case 'confirmPassword': {
            if (!value) errorMsg = 'Confirm password is required'
            else if (value !== formData.password) {
                errorMsg = 'Passwords do not match.'
            }
            break
        }

        case 'country': {
            if (!value) {
                errorMsg = 'Country is required'
            }
            break
        }

        default:
            break
    }

    return errorMsg
}

export const validateForm = (formData: FormData): Errors => {
    const errors: Errors = {}

    Object.keys(formData).forEach((key) => {
        const field = key as keyof FormData
        const error = validateField(field, formData[field], formData)

        if (error) {
            errors[field] = error
        }
    })

    return errors
}