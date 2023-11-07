export interface IToggleIconsProps{
     className?:string
     onClick:()=>void
}
const IconEyeClose = ({ className = 'cursor-pointer', onClick = () => {} }:IToggleIconsProps) => {
    return (
        <span className={className} onClick={onClick}>
            <svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M13.5356 8.46454C13.7677 8.69669 13.9519 8.97229 14.0775 9.27561C14.2032 9.57892 14.2678 9.90401 14.2678 10.2323C14.2678 10.5606 14.2031 10.8857 14.0775 11.189C13.9518 11.4923 13.7677 11.7679 13.5355 12.0001C13.3034 12.2322 13.0278 12.4164 12.7245 12.542C12.4211 12.6676 12.0961 12.7323 11.7678 12.7323C11.4394 12.7323 11.1144 12.6676 10.811 12.5419C10.5077 12.4163 10.2321 12.2322 10 12'
                    stroke='#999999'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                />
                <path
                    d='M11 4C7.04003 4 4.01115 6.27449 1.4755 9.39738C1.19014 9.74883 1.19009 10.2511 1.47544 10.6025C2.18711 11.479 2.93763 12.2887 3.73669 13M6.74043 15.0348C8.03446 15.6495 9.44549 16 11 16C11.2884 16 11.5719 15.9879 11.8507 15.9643L12.2607 15.9122M15.7029 5.18844C17.5178 6.15443 19.0991 7.64187 20.5245 9.39741C20.8099 9.74885 20.8099 10.2512 20.5245 10.6026C19.1774 12.2617 17.6911 13.6813 16 14.6476'
                    stroke='#999999'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M19.1217 1.11547L1.9998 18.9996'
                    stroke='#999999'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </span>
    )
}

export default IconEyeClose
