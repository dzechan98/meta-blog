interface ILabelProps {
    htmlFor: string
    children: React.ReactNode
}

const Label = ({ htmlFor, children }: ILabelProps) => {
    return (
        <label htmlFor={htmlFor} className='font-semibold cursor-pointer text-gray-dark'>
            {children}
        </label>
    )
}

export default Label
