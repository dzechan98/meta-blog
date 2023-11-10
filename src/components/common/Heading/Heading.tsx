interface IHeadingProps {
    className?: string
    children: React.ReactNode
}

const Heading = ({ className = '', children }: IHeadingProps) => {
    return (
        <h2
            className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold text-2xl relative after:absolute after:w-1/2 after:h-[3px] after:left-0 after:-top-2 after:bg-gradient-to-r after:from-primary after:to-secondary ${className}`}
        >
            {children}
        </h2>
    )
}

export default Heading
