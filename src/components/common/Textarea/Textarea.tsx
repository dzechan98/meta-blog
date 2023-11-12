import { ChangeEvent, FocusEvent } from 'react'

interface ITextareaProps {
    id?: string
    className?: string
    placeholder?: string
    onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
    value?: string
    error?: string | null
}

const Textarea = ({ id, className, placeholder, value, error, ...rest }: ITextareaProps) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <textarea
                id={id}
                value={value}
                placeholder={placeholder}
                className={`px-4 py-2.5 min-h-[160px] w-full resize-none outline-none border border-gray-light rounded-lg focus:bg-light transition-all ${className}`}
                {...rest}
            />
            {error && <span className='text-primary font-medium'>{error}</span>}{' '}
        </div>
    )
}

export default Textarea
