import React from 'react'

const Button = ({ onClick, text, color = "#BFBFBF", hoverColor = "#000", style }) => {
  return (
    <button
    onClick={onClick}
    // className="bg-[#F22539]  hover:bg-[#e30c21]  "

    className={`${style} ${color} ${hoverColor} h-[44px] w-[275px] py-[11px] px-[20px] rounded-[60px] text-white font-bold transition-all duration-200 hover:cursor-pointer`}
  >
    {text}
  </button>
  )
}

export default Button