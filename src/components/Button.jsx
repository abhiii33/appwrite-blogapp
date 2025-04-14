import React from 'react'

const Button = ({
    children,
 bgcolor

}) => {
  return (
<button className={`px-4 py-2 rounded-lg ${bgcolor}`}>{children}</button>
  )
}

export default Button