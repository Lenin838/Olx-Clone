import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Details from './Components/Details/Details'
import WishlistPage from './Components/Pages/WishlistPage'
import LoginPage from './Components/Pages/LoginPage'
import PostAdPage from './Components/Pages/PostAdPage'
import MyAdsPage from './Components/Pages/MyAdsPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
   <>
    <Routes>
     <Route  path='/' element={<Home/>}/>
     <Route  path='/details' element={<Details/>}/>
     <Route  path='/wishlist' element={<WishlistPage/>}/>
     <Route  path='/login' element={<LoginPage/>}/>
     <Route  path='/post' element={<PostAdPage/>}/>
     <Route  path='/my-ads' element={<MyAdsPage/>}/>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
   </>
  )
}

export default App
