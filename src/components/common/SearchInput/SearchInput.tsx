import { useEffect, useState } from 'react'
import { IoIosSearch } from '../../../utils/icons'
import Input from '../Input'
import { createSearchParams, useNavigate } from 'react-router-dom'

interface ISearchInputProps {
    placeholder: string
    position?: 'left' | 'right' | 'default'
    value?: string
    className?: string
}

const SearchInput = ({ placeholder, position = 'right', value, className }: ISearchInputProps) => {
    const [keyword, setKeyword] = useState<string>(value || '')
    const navigate = useNavigate()

    useEffect(() => {
        const navigateSearchPage = (e: any) => {
            if (e.key === 'Enter' && keyword.length > 0) {
                navigate({ pathname: '/search', search: createSearchParams({ keyword }).toString() })
            }
        }
        window.addEventListener('keyup', navigateSearchPage)

        return () => {
            window.removeEventListener('keyup', navigateSearchPage)
        }
    }, [keyword])

    return (
        <div className={`${className}`}>
            <Input
                type='text'
                position={position}
                placeholder={placeholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            >
                <IoIosSearch
                    size={25}
                    onClick={() => {
                        navigate({ pathname: '/search', search: createSearchParams({ keyword }).toString() })
                    }}
                />
            </Input>
        </div>
    )
}

export default SearchInput
