import { useFormik } from 'formik';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog
} from '@material-ui/core';// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';
// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const navigate = useNavigate();

  if(localStorage.getItem('token')==='llll'){
    navigate('/login', { replace: true });
  }
  const [openFilter, setOpenFilter] = useState(false);

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
  const [premiumContent, setPremiumContent] = useState([]);

    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/listproduct`;
        const bodyFormData = new FormData();
        axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                setPremiumContent(outlook.data.data);
            })
    }, []);

  return (
    <Page title="Products List | SoundChatRadio">
      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Prodcut List
          </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/products/addproduct"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Add Product
                        
          </Button>
                </Stack>
        <ProductList products={premiumContent} />
        <ToastContainer />
      </Container>
    </Page>
  );
}
