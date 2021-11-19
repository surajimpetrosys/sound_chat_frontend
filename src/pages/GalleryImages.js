import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import axios from 'axios';
import { Link as RouterLink,useNavigate,NavLink,useLocation, useParams } from 'react-router-dom';


// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/Galleries';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function GalleryImages() {
  const navigate = useNavigate();

  if(localStorage.getItem('token')==='llll'){
    navigate('/login', { replace: true });
  }

  const [openFilter, setOpenFilter] = useState(false);
  const location = useLocation();
  const params = useParams();
  const [gallery, setgallery] = useState([])
  const [galleries, setgalleries] = useState([])
   useEffect(()=> {
       const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/gallerydetails`;
        axios.post(Livechaturl, {id:params.galleryId}, { 'Content-Type': 'multipart/form-data' })
        .then((response) => {
            const outlook = response
             setgallery(outlook.data.data);
             setgalleries(outlook.data.data.galleryimages);
            // window.location.href = '/dashboard/gallery';
        })
   }, [params.galleryId])
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  return (
    <Page title="Gallery List | SoundChatRadio">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
         Gallery Images- {gallery.post_title}
        </Typography>

       

        <ProductList products={galleries} />
       
      </Container>
    </Page>
  );
}
