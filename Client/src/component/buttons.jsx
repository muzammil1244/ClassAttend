const Ok_button = ({text,onClick})=>{
    return <button onClick={onClick} className=" bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl ">
        {text}
    </button>
}

export default Ok_button

const Cancel_button = ({text,onClick})=>{   
    return <button onClick={onClick} className=" bg-white hover:bg-gray-100 text-gray-700 cursor-pointer font-bold py-2 px-4 rounded-xl ">
        {text}
    </button>
}
export {Cancel_button}