import React from 'react'

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props

}) 
 
{
  const log = (e)=>{
    console.log(e)
 window.alert("Button clicked")
} 
  return (
<button onClick={log} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>{children}</button>
  )
}
