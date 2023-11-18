import { cva } from 'class-variance-authority'
import { NavLink } from 'react-router-dom'
import Loading from '../Loading'

interface IButtonProps {
    to?: string
    type?: 'button' | 'submit' | 'reset'
    intent?: 'primary' | 'outline' | 'light' | 'warning'
    size?: 'small' | 'medium' | 'large'
    rounded?: 'sm' | 'md' | 'lg'
    sizeLoading?: 'small' | 'medium' | 'large'
    loading?: boolean
    disabled?: boolean
    className?: string
    onClick?: () => void
    children: React.ReactNode
}

const Button = ({
    to = '',
    type = 'button',
    onClick = () => {},
    intent = 'primary',
    rounded = 'lg',
    loading,
    disabled,
    size = 'medium',
    className,
    sizeLoading = 'medium',
    children
}: IButtonProps) => {
    const button = cva(
        `cursor-pointer max-h-[56px] leading-1 font-semibold flex items-center justify-center rounded-lg text-center transition-all outline-none ${className}`,
        {
            variants: {
                intent: {
                    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
                    light: 'bg-light text-primary',
                    warning: 'bg-[#d33] text-light',
                    outline:
                        'shadow-lg shadow-primary border-primary border text-primary hover:bg-primary hover:text-light'
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

    if (to !== '') {
        return (
            <NavLink to={to}>
                <button type={type} className={button({ size, intent, rounded, disabled })}>
                    {loading && <Loading />}
                    {!loading && children}
                </button>
            </NavLink>
        )
    }
    return (
        <button type={type} onClick={onClick} className={button({ size, intent, rounded, disabled })}>
            {loading && <Loading size={sizeLoading} />}
            {!loading && children}
        </button>
    )
}

export default Button
