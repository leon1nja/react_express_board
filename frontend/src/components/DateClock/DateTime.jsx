
import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div>
            Central Time  {''}{''}
         {date.toLocaleTimeString('en-US', { timeZone: 'America/chicago' })} {date.toLocaleDateString()   }
       
        </div>
    )
}

export default DateTime