const Ok_button = ({text,onClick})=>{
    return <button  onClick={onClick} className=" bg-orange-300 cursor-pointer hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-xl ">
        {text}
    </button>
}

export default Ok_button

const Cancel_button = ({text,onClick})=>{   
    return <button onClick={onClick} className=" bg-white border-2 border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer font-bold py-2 px-4 rounded-xl ">
        {text}
    </button>
}
export {Cancel_button}


export const Delete_button = ({text,onClick})=>{   
    return <button onClick={onClick} className=" bg-red-200 hover:bg-red-100 text-red-400 cursor-pointer font-bold py-2 px-4 rounded-xl ">
        {text}
    </button>
}