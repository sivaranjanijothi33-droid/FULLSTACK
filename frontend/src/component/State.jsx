import React,{useState} from "react"

const State = () => {
    // variable [variable, setter function] = useState(initiative)
    const[count,setCount] = useState(0);
    return(
        <div>
            <p>count : {count}</p>
            <button onClick={()=>{setCount(count+1)}}>Increment</button>
        </div>
    )
}
export default State