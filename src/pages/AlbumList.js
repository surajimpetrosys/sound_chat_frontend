import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import { Link as RouterLink,useNavigate,NavLink,useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/musicalbum';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function AlbumList() {
  const navigate = useNavigate();

  if(localStorage.getItem('token')==='llll'){
    navigate('/login', { replace: true });
  }
  const [openFilter, setOpenFilter] = useState(false);
  const location = useLocation();
  const params = useParams();
  const [gallery, setgallery] = useState({})
  const [Audiolist, setAudiolist] = useState([])
   useEffect(()=> {
       const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/musicalbumdetails`;
        axios.post(Livechaturl, {id:params.albumId}, { 'Content-Type': 'multipart/form-data' })
        .then((response) => {
            const outlook = response
             setgallery(outlook.data.data);
             setAudiolist(outlook.data.data.shows);
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
    <Page title="Album List| SoundChatRadio">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
         Album Audio- {gallery.post_title}
        </Typography>
{/* 
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        <ProductList products={Audiolist} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}
