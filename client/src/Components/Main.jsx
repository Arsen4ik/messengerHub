import { useContext } from "react"
import { RouterContext } from "../Context/RouterContext"

export default function Main(){
  const { token } = useContext(RouterContext)
  // if(!token){
  //   console.log(token);
  //   window.location.pathname = '/'
  // }
  console.log(token);
    return (
        <>
          <h1>main</h1> 

        </>
    )
}