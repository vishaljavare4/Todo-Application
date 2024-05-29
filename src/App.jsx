import { ToastContainer } from 'react-toastify'
import './App.css'
import Home from './Component/Home'
import { TODOProvider } from './Utils/TODOContext'


import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <TODOProvider>
        
      <ToastContainer/>
        <div className='w-full items-center justify-center'>
          
        <Home/>
        </div>
      </TODOProvider>
    </>
  )
}

export default App