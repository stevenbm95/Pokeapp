import React from 'react'

const Button = ({ onClick, text, color = "bg-gray-400", hoverColor = "hover:bg-gray-600", width = "w-40", height = "h-12", className }) => {
  return (
    <button
    onClick={onClick}
    style={{ width, height, backgroundColor: color }}
    className={`${color} ${hoverColor} ${width} ${height} py-[11px] px-[20px] rounded-[60px] text-white font-bold transition-all duration-200 hover:cursor-pointer ${className}`}
  >
    {text}
  </button>
  )
}

export default Button