import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  validateField,
  validateForm,
  FormData,
  Errors,
} from '@/utils/registerValidator'

export const useRegisterForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
  })

  const [errors, setErrors] = useState<Errors>({})

  const setField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    const error = validateField(field, value, formData)

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  const handleSubmit = () => {
    const newErrors = validateForm(formData)

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Validation passed!', formData)
      // call API here
      navigate('/login', { replace: true })
    }
  }

  return { formData, errors, setField, handleSubmit }
}
