import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faXmark, faO } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { FormInput } from '../components/Frontend/FormInput'
import FormBtn from '../components/Frontend/FormBtn'
import { useLoginForm } from '../hooks/useLoginForm.js'

const LoginPage = () => {
    const {
        credentials,
        errors,
        submitError,
        isLoading,
        updateField,
        handleSubmit,
    } = useLoginForm()

    return (
        <div className="w-screen h-dvh flex justify-center items-center relative overflow-hidden">
            <FontAwesomeIcon
                icon={faXmark}
                className="absolute top-[20vh] left-[10vw] text-red text-[30vh] opacity-20 rotate-25"
            />

            <FontAwesomeIcon
                icon={faO}
                className="absolute top-[55vh] left-[65vw] text-blue text-[40vh] opacity-50 rotate-25"
            />

            <div className="w-2/5 z-10 px-[3vh] py-[3vh] bg-background rounded-[1vw] flex flex-col items-center gap-[3vh] border border-pink">

                <div className="w-full flex flex-col gap-[1vh]">
                    <p className="text-[3vh] text-blue font-bold uppercase text-center">
                        <FontAwesomeIcon icon={faGamepad} /> TicTacToang
                    </p>

                    <p className="text-[1.5vh] text-smoke-text text-center">
                        Sign in to continue your journey
                    </p>
                </div>

                {submitError && (
                    <div className="w-full rounded-[1vh] border border-red-500/60 bg-red-500/10 px-[1vw] py-[1vh] text-[1.5vh] text-red-300">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[2vh] text-white">

                    <FormInput
                        label="Username or Email"
                        type="text"
                        placeholder="Enter username or email"
                        value={credentials.identifier}
                        onChange={(v) => updateField('identifier', v)}
                        error={errors?.identifier}
                    />

                    <FormInput className="text-white"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(v) => updateField('password', v)}
                        error={errors?.password}
                    />

                    <FormBtn type="submit">
                        {isLoading ? 'Signing in...' : 'Enter the arena'}
                    </FormBtn>
                </form>

                <p className="text-[1.5vh] text-smoke-text">
                    Don&apos;t have an account?{' '}
                    <Link to="/register" className="text-blue hoverable:hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage