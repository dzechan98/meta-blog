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
    onClickIcons?: () => void
    outline?: 'default' | 'primary'
    position?: 'default' | 'right' | 'left'
    children?: React.ReactNode
}

const input = cva('w-full py-2.5 rounded-lg border focus:bg-light transition-all outline-none', {
    variants: {
        outline: {
            primary: 'border-transparent focus:border-primary bg-gray-light',
            default: 'border-gray-light'
        },
        position: {
            default: 'px-4',
            right: 'pl-4 pr-10',
            left: 'pl-10 pr-4'
        }
    }
})

const Input = ({
    type = 'text',
    name,
    error,
    outline = 'default',
    position = 'default',
    placeholder,
    onClickIcons = () => {},
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
                className={input({ position, outline })}
                {...rest}
            />
            {error && <span className='absolute left-0 top-12 text-primary font-medium'>{error}</span>}
            {children && (
                <div
                    className={`cursor-pointer absolute top-1/2 -translate-y-1/2 ${
                        position === 'right' || position === 'default' ? 'right-4' : 'left-4'
                    }`}
                    onClick={onClickIcons}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

export default Input
