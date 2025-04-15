import React ,{useId} from 'react'

const Select = ({
    options,
    label,
    ...props
},ref) => {
    const id = useId()
  return (
    <div>
        { 
            label &&<label></label>
        }
        <select {...props}
        id ={id}
        ref={ref}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}

        </select>
        </div>
  )
}

export default React.forwardRef(Select)