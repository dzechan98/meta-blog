import { IoIosSearch } from '../../../utils/icons'
import Input from '../Input'

interface ISearchInputProps {
    placeholder: string
    position?: 'left' | 'right' | 'default'
    className?: string
}

const SearchInput = ({ placeholder, position = 'right', className }: ISearchInputProps) => {
    return (
        <div className={`${className}`}>
            <Input type='text' position={position} placeholder={placeholder}>
                <IoIosSearch size={25} />
            </Input>
        </div>
    )
}

export default SearchInput
