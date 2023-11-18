import { useState, useContext, createContext } from 'react'

type CategoryType = {
    checkAddCategory: boolean
    setCheckAddCategory: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryContext = createContext<CategoryType>({} as CategoryType)

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [checkAddCategory, setCheckAddCategory] = useState<boolean>(false)
    return (
        <CategoryContext.Provider
            value={{
                checkAddCategory,
                setCheckAddCategory
            }}
        >
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategory = (): CategoryType => {
    const context = useContext(CategoryContext)
    return context
}

export default CategoryProvider
