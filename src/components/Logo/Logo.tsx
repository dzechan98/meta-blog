import { cva } from 'class-variance-authority'
import logoImage from '../../assets/img/logo.png'
import { NavLink } from 'react-router-dom'

interface ILogoProps {
    to?: string
    size?: 'medium' | 'large'
    rounded?: 'sm' | 'md' | 'lg' | 'full'
    children?: React.ReactNode
}

const logo = cva('block', {
    variants: {
        size: {
            medium: 'w-[140px]',
            large: 'w-[220px]'
        },
        rounded: {
            sm: 'rounded-sm',
            md: 'rounde-md',
            lg: 'rounded-lg',
            full: 'rounded-[50%]'
        }
    }
})
const Logo = ({ to, size = 'medium', rounded, children }: ILogoProps) => {
    if (to) {
        return (
            <NavLink to={to}>
                <>
                    <img src={logoImage} alt='logo' className={logo({ size, rounded })} />
                    {children}
                </>
            </NavLink>
        )
    }
    return (
        <>
            <img src={logoImage} alt='logo' className={logo({ size, rounded })} />
            {children}
        </>
    )
}

export default Logo
