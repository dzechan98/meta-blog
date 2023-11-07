import { cva } from 'class-variance-authority'
import { NavLink } from 'react-router-dom'

interface IButtonProps {
    to?: string
    type?: 'button' | 'submit' | 'reset'
    intent?: 'primary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    rounded?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    onClick?: () => void
    children: React.ReactNode
}

const button = cva(
    'cursor-pointer leading-1 font-semibold flex items-center justify-center rounded-lg text-center transition-all',
    {
        variants: {
            intent: {
                primary: 'bg-gradient-to-r from-primary to-secondary text-white',
                outline: 'border-primary border text-primary'
            },
            size: {
                small: 'px-4 py-2 min-w-[100px]',
                medium: 'px-5 py-2.5 min-w-[120px]',
                large: 'px-7.5 py-4 min-w-[160px]'
            },
            rounded: {
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg'
            },
            disabled: {
                true: 'opacity-50 pointer-events-none'
            }
        }
    }
)

const Button = ({
    to = '',
    type = 'button',
    onClick = () => {},
    intent = 'primary',
    rounded = 'lg',
    disabled,
    size = 'medium',
    children
}: IButtonProps) => {
    if (to !== '') {
        return (
            <NavLink to={to}>
                <button type={type} className={button({ size, intent, rounded, disabled })}>
                    {children}
                </button>
            </NavLink>
        )
    }
    return (
        <button type={type} onClick={onClick} className={button({ size, intent, rounded, disabled })}>
            {children}
        </button>
    )
}

export default Button
