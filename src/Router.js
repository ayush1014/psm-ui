import{
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    // RouterProvider,
  }from "react-router-dom"
import Login from "./components/login"
import SignUp from "./components/signup"
import Posts from "./components/posts"
// import App from "./App"

function Router(){
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path= "/signup" element={<SignUp/>}/>,
                <Route path="/" element={<Login/>}/>,
                <Route path="/posts" element={<Posts/>}/>,
            </>

        )
    )   
    return router;
}

export default Router;