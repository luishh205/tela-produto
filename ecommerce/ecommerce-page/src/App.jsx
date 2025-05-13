
import './App.css'
import ProductPage from './components/ProductPage'
import Header from './components/Header'
import { Toaster } from "react-hot-toast";

function App() {
 
  return (
    <div className="App">

      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Header/>

      <ProductPage />
   
    </div>
  )
}

export default App
