import { useLocation } from "react-router-dom";

export const CenterElement = ()=>{
    const location = useLocation().pathname.split("/")[1]
    console.log(location);
    
    let element;
    
    return(
        <div>
            {element}
        </div>
    )
}