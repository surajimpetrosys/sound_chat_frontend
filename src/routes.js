import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/Page404';
import Interview from './pages/Interview';
import InterviewDetails from './pages/Interviewdetails';
import AddInterview from './pages/AddInterview'
import UpdateInterview from './pages/UpdateInterview'
import Gallery from './pages/Gallery';
import GalleryImages from './pages/GalleryImages';
import Radiopodcast from './pages/Radiopodcast';
import Musicalbum from './pages/Musicalbum';
import AlbumList from './pages/AlbumList';

import Shows from './pages/Shows';
import Events from './pages/Events';
import Banners from './pages/Banners';
import Homeslider from './pages/Homeslider';
import AddGallery from './pages/AddGallery';
import AddMusicalbum from './pages/AddMusic';
import UpdateGallery from './pages/UpdateGallery';

import UpdateMusicAlbum from './pages/UpdateMusicAlbum'

import AddBanner from './pages/AddBanner';
import UpdateBanner from './pages/UpdateBanner';
import AddHomeslider from './pages/AddHomeslider';
import UpdateHomeslider from './pages/UpdateHomeslider';
import Order from './pages/Order';
import UpdateOrder from './pages/UpdateOrder'
import OrderDetails from './pages/OrderDetails'
import Report from './pages/Report';
import AddProduct from './pages/AddProduct';
import AddProductAvaibility from './pages/AddProductAvaibility';
import ReportDetails from './pages/ReportDetails';
import ProductDetails from './pages/ProductDetails'
import UpdateProduct from './pages/UpdateProduct'
import UpdateProductAvaibility from './pages/UpdateProductAvaibility'
import PhoneInterview from './pages/PhoneInterview';
import PhoneInterviewDetails from './pages/PhoneInterviewdetails';
import AddPhoneInterview from './pages/AddPhoneInterview'
import UpdatePhoneInterview from './pages/UpdatePhoneInterview'
import Showsperday from './pages/Showsperday';
import Updateshowschedule from './pages/UpdateShowSchedule';
import Addshowschedule from './pages/AddShowSchedule';
import Updateshow from './pages/UpdateShow';
import UpdateLiveContent from './pages/UpdateLiveContent';
import LiveContentDetails from './pages/LiveContentDetails';
import AdsQuery from './pages/AdsQuery';
import AdsQueryDetails from './pages/AdsQueryDetails';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard/app', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'user/details/:userId', element: <UserDetails /> },
        { path: 'banner/addbanner', element: <AddBanner /> },
        { path: 'banner/updatebanner/:bannerId', element: <UpdateBanner /> },
        { path: 'interview', element: <Interview /> },
        { path: 'interview/details/:interviewId', element: <InterviewDetails /> },
        { path: 'interview/addinterview', element: <AddInterview /> },
        { path: 'interview/updateinterview/:interviewId', element: <UpdateInterview /> },
        { path: 'gallery/addgallery', element: <AddGallery /> },
        { path: 'gallery/updategallery/:galleryId', element: <UpdateGallery /> },
        { path: 'gallery', element: <Gallery /> },
        { path: 'gallery/details/:galleryId', element: <GalleryImages /> },
        
        { path: 'radio-podcast', element: <Radiopodcast /> },
        { path: 'music-album', element: <Musicalbum /> },
       
        { path: 'music-album/addmusicalbum', element: <AddMusicalbum /> },
        { path: 'music-album/details/:albumId', element: <AlbumList /> },
        { path: 'music-album/updatemusicalbum/:albumId', element: <UpdateMusicAlbum /> },
        { path: 'music-album/details/:albumId', element: <AlbumList /> },
        { path: 'shows', element: <Shows /> },
        { path: 'shows/showslist/:dayId', element: <Showsperday /> },
        { path: 'shows/showslist/addshowschedule/:dayId', element: <Addshowschedule /> },
        { path: 'shows/showslist/updateshowschedule/:dayId/:showId', element: <Updateshowschedule /> },
        { path: 'shows/updateshow/:dayId', element: <Updateshow /> },
        { path: 'livecontent', element: <Events /> },
        { path: 'banner', element: <Banners /> },
        { path: 'homeslider', element: <Homeslider /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'productorder', element: <Order /> },
        { path: 'productorder/details/:orderId', element: <OrderDetails /> },
        { path: 'productorder/update/:orderId', element: <UpdateOrder /> },
        { path: 'query', element: <Report /> },
        { path: 'query/details/:reportId', element: <ReportDetails /> },
        { path: 'adsquery', element: <AdsQuery /> },
        { path: 'adsquery/details/:queryId', element: <AdsQueryDetails /> },
        { path: 'products/addproduct', element: <AddProduct /> },
        { path: 'products/details/addproductavaibility/:productId', element: <AddProductAvaibility /> },
        { path: 'products/details/updateproductavaibility/:productId/:itemId', element: <UpdateProductAvaibility /> },
        { path: 'products/details/:productId', element: <ProductDetails /> },
        { path: 'products/update/:productId', element: <UpdateProduct /> },
        { path: 'homeslider/addhomeslider', element: <AddHomeslider /> },
        { path: 'homeslider/updatehomeslider/:sliderId', element: <UpdateHomeslider /> },
        { path: 'phoneinterview', element: <PhoneInterview /> },
        { path: 'phoneinterview/details/:interviewId', element: <PhoneInterviewDetails /> },
        { path: 'phoneinterview/addinterview', element: <AddPhoneInterview /> },
        { path: 'phoneinterview/updateinterview/:interviewId', element: <UpdatePhoneInterview /> },
        { path: 'livecontent/details/:livecontentId', element: <LiveContentDetails /> },
        { path: 'livecontent/updatelivecontent/:livecontentId', element: <UpdateLiveContent /> },



      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        // { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
