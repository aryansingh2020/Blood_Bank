const Button=({value,onClick})=>{
    return(
        <button onClick={onClick} className="button bg-white text-red-500 font-semibold p-2 rounded hover:bg-gray-50 ">
            {value}
        </button>
    )
}

export default Button;