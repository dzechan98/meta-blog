interface IToggleCheckboxProps {
    label: string
    checked: boolean
    setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const ToggleCheckbox = ({ label, checked, setChecked }: IToggleCheckboxProps) => {
    return (
        <label className='relative inline-flex items-center cursor-pointer'>
            <input
                type='checkbox'
                className='sr-only peer'
                checked={checked}
                onChange={() => {
                    setChecked(!checked)
                }}
            />
            <div className="w-[70px] h-9 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-light after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-light after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all peer-checked:bg-primary" />
            <span className='ms-3 font-bold text-gray-dark'>{label}</span>
        </label>
    )
}

export default ToggleCheckbox
