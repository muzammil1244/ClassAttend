const Ok_button = ({text,onClick})=>{
    return <button  onClick={onClick} className=" bg-white shadow cursor-pointer hover:bg-gray-50 text-black font-semibold py-2 px-4 rounded-xl ">
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