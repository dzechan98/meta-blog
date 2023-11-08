import { cva } from 'class-variance-authority'
import { ChangeEvent } from 'react'

export interface IInputProps {
    value?: string
    type?: string
    name?: string
    error?: string | null
    placeholder?: string
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    outline?: 'default' | 'primary'
    spacing?: 'default' | 'right'
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
        <div className={`relative w-full ${error ? 'mb-4' : ''}`}>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                className={input({ spacing, outline })}
                {...rest}
            />
            {error && <span className='absolute left-0 top-12 text-primary font-medium'>{error}</span>}
            {children && <div className='absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointe'>{children}</div>}
        </div>
    )
}

export default Input
