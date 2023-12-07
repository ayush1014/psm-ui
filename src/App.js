import { RouterProvider } from 'react-router-dom';
import './App.css';
// import Login from './components/login';
import Router from './Router';
function App() {
  return (
    <>
      <RouterProvider router = {Router()}/>

    </>
  );
}


export default App;
