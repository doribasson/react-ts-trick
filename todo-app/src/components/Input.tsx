
interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {
    customProp?: string;
}

const Input = ({...props}:Iprops) => {
 
    return(
        <div>
            <input {...props} />
        </div>
    )
}

export default Input