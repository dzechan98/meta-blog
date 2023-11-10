import { useState } from 'react'
import Input from '../Input'
import { IconEyeClose, IconEyeOpen } from '../Icons'
import { IInputProps } from '../Input/Input'

const TogglePassword = ({ name, error, placeholder, ...rest }: IInputProps) => {
    const [toggle, setToggle] = useState<boolean>(false)

    const handleTogglePassword = () => {
        setToggle(!toggle)
    }

    return (
        <>
            <Input name={name} type={toggle ? 'text' : 'password'} error={error} placeholder={placeholder} {...rest}>
                {!toggle && <IconEyeClose onClick={handleTogglePassword} />}
                {toggle && <IconEyeOpen onClick={handleTogglePassword} />}
            </Input>
        </>
    )
}

export default TogglePassword
