import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  // Link,
} from "react-router-dom";
import LogIn from "./Components/LogIn";
import Registration from "./Components/Registration";
// import FindNeededRoute from "./Components/FindNeededRoute";
import { RouterContext } from "./Context/RouterContext";
import { useEffect, useState } from "react";
import Main from "./Components/Main";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LogIn />} />
      <Route path="registration" element={<Registration />} />
      <Route path="main" element={<Main />} >

      </Route>
    </Route>
  )
);

export default function App() {
  const [token, setToken] = useState()
  const setTokenFunc = newToken => {
    console.log(newToken, typeof newToken);
    setToken(newToken)
    // console.log(newToken, token);
  }
  useEffect(() => {
    if (token) {
      // findNeededRoute(token);
      window.location.pathname = '/main'
    }
  }, [token]);
  // useEffect(() => {
  //   if(token) 
  // }, [token])
//   useEffect(() => {
//     console.log(window.location.pathname);
//   setPath(window.location.pathname)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [window.location.pathname])
  return (
    <RouterContext.Provider value={{ token, setTokenFunc }}>
      <RouterProvider router={router} />
    </RouterContext.Provider>
  )
}

// function findNeededRoute(token){
//   console.log(token);
//   window.location.pathname = '/main'
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   // const { path } = useContext(RouterContext)
//   // console.log(path);
//   // window.location.pathname = '/registration'
// }