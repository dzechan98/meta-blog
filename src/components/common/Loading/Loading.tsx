import { cva } from 'class-variance-authority'

interface ILoadingProps {
    size?: 'medium' | 'large'
    border?: 'light' | 'primary'
}

const loading = cva('border-[4px] border-t-transparent rounded-[50%] inline-block animate-spin', {
    variants: {
        border: {
            primary: 'border-primary',
            light: 'border-light'
        },
        size: {
            medium: 'w-8 h-8',
            large: 'w-12 h-12'
        }
    }
})

const Loading = ({ size = 'medium', border = 'light' }: ILoadingProps) => {
    return <div className={loading({ border, size })}></div>
}

export default Loading
