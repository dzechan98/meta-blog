import { cva } from 'class-variance-authority'

export interface IInputProps {
    type?: string
    name: string
    error?: string
    outline?: 'default' | 'primary'
    spacing?: 'default' | 'right'
    placeholder?: string
    children?: React.ReactNode
}

const input = cva('w-full rounded-lg border focus:bg-white transition-all outline-none', {
    variants: {
        outline: {
            primary: 'border-transparent focus:border-primary bg-gray-light',
            default: 'border-gray-light'
        },
        spacing: {
            default: 'px-5 py-2.5',
            right: 'py-2.5 pl-4 pr-10'
        }
    }
})

const Input = ({
    type = 'text',
    name,
    error,
    outline = 'default',
    spacing = 'default',
    placeholder,
    children,
    ...rest
}: IInputProps) => {
    return (
        <div className='relative w-full'>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                className={input({ spacing, outline })}
                {...rest}
            />
            {error && <span className='absolute left-0 bottom-6 text-red'>{error}</span>}
            {children && <div className='absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointe'>{children}</div>}
        </div>
    )
}

export default Input