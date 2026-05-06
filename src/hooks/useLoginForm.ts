import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  validateLoginField,
  validateLoginForm,
  LoginCredentials,
  LoginErrors,
} from '@/utils/loginValidator'
import { saveAuthUser } from '@/utils/auth'

export const useLoginForm = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    identifier: '',
    password: '',
  })

  const [errors, setErrors] = useState<LoginErrors>({})
  const [submitError, setSubmitError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateField = (
    field: keyof LoginCredentials,
    value: string
  ) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }))

    const error = validateLoginField(field, value)

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))

    setSubmitError('')
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const newErrors = validateLoginForm(credentials)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    setIsLoading(true)
    setSubmitError('')

    try {
      console.log('Login payload:', credentials)

      // TODO: replace with API
      await new Promise((res) => setTimeout(res, 800))

      saveAuthUser({
        username: credentials.identifier.trim(),
      })

      console.log('Login success')
      navigate('/', { replace: true })
    } catch (err) {
      setSubmitError('Invalid username/email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    credentials,
    errors,
    submitError,
    isLoading,
    updateField,
    handleSubmit,
  }
}
