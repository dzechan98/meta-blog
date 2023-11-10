import { cva } from 'class-variance-authority'

interface ICategoryProps {
    size?: 'base' | 'medium'
    margin?: 'base' | 'medium'
    children: React.ReactNode
}

const category = cva('p-1 inline-block rounded-md font-medium text-primary bg-tertiary', {
    variants: {
        size: {
            base: 'text-[12px] mb-2',
            medium: 'text-sm mb-2'
        },
        margin: {
            base: 'mb-2',
            medium: 'mb-4'
        }
    }
})

const Category = ({ margin = 'base', size = 'medium', children }: ICategoryProps) => {
    return <h2 className={category({ size, margin })}>{children}</h2>
}

export default Category
