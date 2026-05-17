interface FormBtnProps {
    children: React.ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
}

const FormBtn: React.FC<FormBtnProps> = ({
                                             children,
                                             onClick,
                                             type = 'button',
                                         }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
        w-full py-[1vh]
        text-[1.8vh] uppercase font-bold
        text-dark-purple
        bg-linear-165 from-purple to-pink
        rounded-[1vh]
        cursor-pointer
        transition-all
        hoverable:hover:brightness-110
        active:scale-[0.98]
      "
        >
            {children}
        </button>
    )
}

export default FormBtn