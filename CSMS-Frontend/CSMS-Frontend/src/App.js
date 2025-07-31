import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Register from './components/authentication/Register';
import { ToastContainer } from 'react-toastify';
import AuthContext, { CustomContext } from './context/AuthContext';
import Home from './components/home/Home';
import AddCar from './components/car-details/page/AddCar';
import CarGallery from './components/car-details/page/CarGallery';
import Car from './components/car-details/page/CarPage';
import UserBiddingDashboard from './components/user/UserBiddingDash';
import BiddingDashBoard from './components/car-details/bidding/BiddingDashBoard';
import UserProfile from './components/user/UserProfile';
import PageNotFound from './utilities/PageNotFound';
import GetBidderDetails from './components/car-details/bidding/GetBidderDetails';

export const TOAST_PROP = { position: 'top-center', hideProgressBar: true }
 
export default function App() {

  const AuthenticatedRoute = () => {

    const context = CustomContext();
    if (context?.isAuthenticated || context?.isAuthenticated === undefined) {
      return <Outlet />;
    } else {
      return <Navigate to={"/"} />
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/car-gallery' element={<CarGallery />} />
            <Route path='/car/:slug' element={<Car />} />
            <Route path='/bidding/dashboard' element={<BiddingDashBoard />} />
            <Route path='/bidder/details' element={<GetBidderDetails />} />
            <Route path='*' element={<PageNotFound />} />

            {/* Private Routes */}
            <Route path='/users' element={<AuthenticatedRoute />} >
              <Route path='bidding' element={<UserBiddingDashboard />} />
              <Route path='profile' element={<UserProfile />} />
            </Route>

            <Route element={<AuthenticatedRoute />}>
              <Route path='/add-car' element={<AddCar />} />
            </Route>
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}
