import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faXmark, faO } from '@fortawesome/free-solid-svg-icons'
import { FormSelect, FormInput } from '../components/Frontend/FormInput'
import FormBtn from '../components/Frontend/FormBtn'
import { Link } from 'react-router-dom'
import { useRegisterForm } from '../hooks/useRegisterForm.js'

const countries = [
    'Vietnam',
    'Philippines',
    'Singapore',
    'Thailand',
    'Japan',
    'South Korea',
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Australia',
    'Canada',
]

const RegisterPage = () => {
    const { formData, errors, setField, handleSubmit } = useRegisterForm()

    return (
        <div className="w-screen h-dvh flex justify-center items-center relative overflow-hidden">
            <FontAwesomeIcon
                icon={faXmark}
                className="absolute flex portrait:hidden portrait:opacity-0 top-[20vh] left-[10vw] text-pink text-[30vh] opacity-20 rotate-25"
            />

            <FontAwesomeIcon
                icon={faO}
                className="absolute flex portrait:hidden portrait:opacity-0 top-[55vh] left-[65vw] text-yellow text-[40vh] opacity-50 rotate-25"
            />

            <div className="w-2/5 z-10 px-[3vh] py-[3vh] portrait:px-[5vh] portrait:py-0 bg-background portrait:bg-transparent portrait:w-full portrait:border-0 rounded-[1vw] flex flex-col items-center gap-[3vh] portrait:gap-[4vh] border border-pink">
                <div className="w-full flex flex-col gap-[1vh]">
                    <p className="text-[3vh] text-pink font-bold uppercase w-full text-center">
                        <FontAwesomeIcon icon={faGamepad} /> Neon Arena
                    </p>

                    <p className="text-[1.5vh] text-smoke-text w-full text-center">
                        Create your player account and enter the arena
                    </p>
                </div>

                <div className="w-full flex flex-col gap-[2vh] portrait:gap-[4vh] text-white">
                    <FormInput
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={(value) => setField('username', value)}
                        error={errors.username}
                    />

                    <FormInput
                        label="Email"
                        type="text"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(value) => setField('email', value)}
                        error={errors.email}
                    />

                    <FormSelect
                        label="Country"
                        options={countries}
                        value={formData.country}
                        onChange={(value) => setField('country', value)}
                        error={errors.country}
                    />

                    <div className="w-full flex gap-[2vw] portrait:gap-[4vh] justify-between flex-row portrait:flex-col text-white">
                        <FormInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(value) => setField('password', value)}
                            error={errors.password}
                        />

                        <FormInput
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(value) => setField('confirmPassword', value)}
                            error={errors.confirmPassword}
                        />
                    </div>
                </div>

                <FormBtn onClick={handleSubmit}>
                    Initiate Account
                </FormBtn>

                <p className="text-smoke-text text-[1.5vh]">
                    Already have an account?{' '}
                    <Link to="/login" className="text-pink hoverable:hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage