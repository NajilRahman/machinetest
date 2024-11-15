import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/header';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
     <Header/>
     <Home/>
     <Toaster position="top-center" reverseOrder={false} />

    </>
  )
}

export default App
