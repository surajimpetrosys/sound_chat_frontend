import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import axios from 'axios';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { Link as RouterLink, useNavigate, NavLink, useLocation, useParams } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';

import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@material-ui/lab';

// material
import {
    Link,
    Stack,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel, Box, Grid, Container, Typography,
    InputLabel, MenuItem, FormControl, Select
} from '@mui/material';

// material
import { Card, CardHeader, CardContent } from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    inputimage: {
        position: 'relative',
        left: '43px',
        padding: '0px'
    }
}));

export default function AddInterview() {
    const [content_type, setcontent_type] = useState('');
    const [interview_type, setinterview_type] = useState('');
    const [catogery, setcatogery] = useState('');
    const [Discount, setDiscount] = useState('');
    const [currency, setcurrency] = useState('');
    const [Price, setPrice] = useState('');
    const [Shop, setShop] = useState('');
    const [SKU, setSKU] = useState('');
    const [description, setdescription] = useState('');
    const [title, settitle] = useState('');
    const [Published_At, setPublished_At] = useState('');
    const [Starts_At, setStarts_At] = useState('');
    const [Ends_At, setEnds_At] = useState('');

    const params = useParams();

    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        title: Yup.string('title is required'),
        description: Yup.string('description is required'),
        SKU: Yup.string('SKU is required'),
        Price: Yup.string('Price is required'),
        Discount: Yup.string('Discount is required'),
        Quantity: Yup.string('Quantity is required'),
        currency: Yup.string('currency is required'),
        size: Yup.string('size is required'),
        color: Yup.string('color is required'),
        catogery: Yup.string('catogery is required'),
        // Shop: Yup.string('Shop is required'),
        // Published_At: Yup.string('Publish Date is required'),
        // Starts_At: Yup.string('Start Date is required'),
        // Ends_At: Yup.string('End Date is required')
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            SKU: "",
            Price: "",
            currency: "",
            Discount: "",
            // Quantity: "",
            // size: "", 
            // color: "",
            catogery: "", 
            // Shop: "",
            // Published_At: "",
            // Starts_At: "",
            // Ends_At: ""
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            // bodyFormData.append('mobileimage', mobileimage);
            bodyFormData.append('id',params.productId);
            bodyFormData.append('title',title);
            bodyFormData.append('description',description);
            bodyFormData.append('SKU',SKU);
            bodyFormData.append('Price',Price);
            bodyFormData.append('currency', currency);
            bodyFormData.append('Discount', Discount);
            // bodyFormData.append('Quantity', values.Quantity);
            // bodyFormData.append('size', values.size);
            // bodyFormData.append('color', values.color);
            bodyFormData.append('catogery', catogery);
            bodyFormData.append('mobileimage', mobileimage);
            // bodyFormData.append('Shop', Shop);
            // bodyFormData.append('Published_At', Published_At);
            // bodyFormData.append('Starts_At', Starts_At);
            // bodyFormData.append('Ends_At', Ends_At);
            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/updateproduct`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate('/dashboard/products', { replace: true });
                    toast.success(outlook.data.message)
                })
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    if (localStorage.getItem('token') === 'llll') {
        navigate('/login', { replace: true });
    }
    const classes = useStyles();
    const [gallery_pics, setgallery_pics] = useState();
    const [mobileimage, setMobileimage] = useState();
    const [desktopimage, setDesktopimage] = useState();
    // const { handleSubmit, control } = useForm();

    const handleChange = ({ fileList }) => {
        setMobileimage(fileList[0].originFileObj)
    }

    const handleChange1 = ({ fileList }) => {
        setDesktopimage(fileList[0].originFileObj)
    }

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const onAudioPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Audio(src);
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const [gallery, setgallery] = useState([])
  useEffect(() => {
    const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/productdetails`;
    axios.post(Livechaturl, { id: params.productId }, { 'Content-Type': 'multipart/form-data' })
      .then((response) => {
        const outlook = response
        setgallery(outlook.data.data);
        setcatogery(outlook.data.data.catogery);
        setDiscount(outlook.data.data.Discount);
        setcurrency(outlook.data.data.currency);
        setPrice(outlook.data.data.Price);
        setSKU(outlook.data.data.SKU);
        setdescription(outlook.data.data.description);
        settitle(outlook.data.data.title);
        // setPublished_At(outlook.data.data.Published_At);
        // setStarts_At(outlook.data.data.Starts_At);
        // setEnds_At(outlook.data.data.Ends_At);
        // setShop(outlook.data.data.Shop)
        // window.location.href = '/dashboard/gallery';
      })
  }, [params.productId])

  const changetitle = (event) => {
    settitle(event.target.value)
}

const changedesc = (event) => {
    setdescription(event.target.value)
}

const changeprice = (event) => {
    setPrice(event.target.value)
}

const changediscount = (event) => {
    setDiscount(event.target.value)
}

// const changeshop = (event) => {
//     setShop(event.target.value)
// }

const changecategory = (event) => {
    setcatogery(event.target.value)
}
const changesku = (event) => {
    setSKU(event.target.value)
}
// const changepublish = (event) => {
//     setPublished_At(event.target.value)
// }
// const changestart = (event) => {
//     setStarts_At(event.target.value)
// }

// const changeend = (event) => {
//     setEnds_At(event.target.value)
// }

const changecurrency = (event) => {
    setcurrency(event.target.value)
}
const baseurl = 'http://3.23.210.57/soundradiobackend/images/product/';


// const handleChangeforselect = (event) => {
//     setcontent_type(event.target.value);
// };
// const handleChangeforselect2 = (event) => {
//     setinterview_type(event.target.value);
// };
    return (
        <Page title="Update Product | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update Pruduct
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Product Details" />
                                    <CardContent>
                                        <Grid container spacing={3}>

                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Product Title</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="title"
                                        type ="text"
                                        // label="Product Title"
                                    {...getFieldProps('title')}
                                      value={title}
                                      onChange={changetitle}
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Product Catogery</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="catogery"
                                        type ="text"
                                        // label="Product Catogery"
                                    {...getFieldProps('catogery')}
                                    value={catogery}
                                    onChange={changecategory}
                                        error={Boolean(touched.catogery && errors.catogery)}
                                        helperText={touched.catogery && errors.catogery}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Product Description</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="description"
                                        type ="text"
                                        // label="Product Description"
                                        multiline
                                        rows={5}
                                        rowsMax={10}
                                    {...getFieldProps('description')}
                                    value={description}
                                    onChange={changedesc}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">SKU Number</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="SKU"
                                        type ="text"
                                        // label="SKU Number"
                                    {...getFieldProps('SKU')}
                                    value={SKU}
                                    onChange={changesku}
                                        error={Boolean(touched.SKU && errors.SKU)}
                                        helperText={touched.SKU && errors.SKU}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Pruduct Price</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="Price"
                                        type ="text"
                                        // label=" Pruduct Price"
                                    {...getFieldProps('Price')}
                                    value={Price}
                                    onChange={changeprice}
                                        error={Boolean(touched.Price && errors.Price)}
                                        helperText={touched.Price && errors.Price}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Currency Type</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="currency"
                                        type ="text"
                                        // label="currency Type"
                                    {...getFieldProps('currency')}
                                    value={currency}
                                    onChange={changecurrency}
                                        error={Boolean(touched.currency && errors.currency)}
                                        helperText={touched.currency && errors.currency}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        {/* <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>

                                        <TextField
                                        fullWidth
                                        autoComplete="color"
                                        type ="text"
                                        label=" Pruduct Color"
                                    {...getFieldProps('color')}
                                        error={Boolean(touched.color && errors.color)}
                                        helperText={touched.color && errors.color}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <TextField
                                        fullWidth
                                        autoComplete="size"
                                        type ="text"
                                        label="size"
                                    {...getFieldProps('size')}
                                        error={Boolean(touched.size && errors.size)}
                                        helperText={touched.size && errors.size}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid> */}
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Discount in %</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="Discount"
                                        type ="text"
                                        // label="Discount"
                                    {...getFieldProps('Discount')}
                                    value={Discount}
                                    onChange={changediscount}
                                        error={Boolean(touched.Discount && errors.Discount)}
                                        helperText={touched.Discount && errors.Discount}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        {/* <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <TextField
                                        fullWidth
                                        autoComplete="Quantity"
                                        type ="text"
                                        label="Quantity"
                                    {...getFieldProps('Quantity')}
                                        error={Boolean(touched.Quantity && errors.Quantity)}
                                        helperText={touched.Quantity && errors.Quantity}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid> */}
                                        {/* <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Product Available At Shop</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="Shop"
                                        type ="text"
                                        // label="Product Available At Shop"
                                    {...getFieldProps('Shop')}
                                    value={Shop}
                                    onChange={changeshop}
                                        error={Boolean(touched.Shop && errors.Shop)}
                                        helperText={touched.Shop && errors.Shop}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Published At</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="Published_At"
                                        type ="date"
                                        // label="Published At"
                                    {...getFieldProps('Published_At')}
                                    value={Published_At}
                                    onChange={changepublish}
                                        error={Boolean(touched.Published_At && errors.Published_At)}
                                        helperText={touched.Published_At && errors.Published_At}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Sale Start At</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="Starts_At"
                                        type ="date"
                                        // label=" Sale Start At"
                                    {...getFieldProps('Starts_At')}
                                    value={Starts_At}
                                    onChange={changestart}
                                        error={Boolean(touched.Starts_At && errors.Starts_At)}
                                        helperText={touched.Starts_At && errors.Starts_At}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Sale End At</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="Ends_At"
                                        type ="date"
                                        // label="Sale End At"
                                    {...getFieldProps('Ends_At')}
                                    value={Ends_At}
                                    onChange={changeend}
                                        error={Boolean(touched.Ends_At && errors.Ends_At)}
                                        helperText={touched.Ends_At && errors.Ends_At}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid> */}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
                                <Card>
                                    <CardHeader title="Image For  Product" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}>
                                            <CardContent>
                                                    <img src={baseurl + gallery.image} alt={gallery.image} width='250' height='250'/>
                                               </CardContent>
                                        </Stack>
                                    </Grid>


                                    <Grid xs={12} md={6} lg={6} sx={{ mt: 3 }}>
                                        <Stack spacing={3}>
                                            <CardContent>
                                                <ImgCrop >
                                                    <Upload
                                                        className="upload-img"
                                                        listType="picture-card"
                                                        onChange={handleChange}
                                                        onPreview={onPreview}
                                                        maxCount={1}
                                                        
                                                    >
                                                        + Upload New Image For Product
                            </Upload>
                                                </ImgCrop>
                                            </CardContent>
                                        </Stack>
                                    </Grid>
                                    </Grid>

                                </Card>
                            </Grid>
                        {/* <Grid item xs={12} md={12} lg={12}  sx={{ mt: 3 }}>
                            <Card>
                                <CardHeader title="Image For Desktop Poster" />
                                <CardContent>

                                    <Stack spacing={4}>


                                        <ImgCrop >
                                            <Upload
                                                className="upload-img"
                                                listType="picture-card"
                                                onChange={handleChange1}
                                                onPreview={onPreview}
                                            >
                                                + Upload Image For Desktop Poster
                                            </Upload>
                                        </ImgCrop>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid> */}



                        <Stack spacing={3} sx={{ mt: 4 }} >
                            <div>

                                <LoadingButton

                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Update Product
                                </LoadingButton>
                            </div>
                        </Stack>


                    </Form>
                </FormikProvider >
                <ToastContainer />
            </Container >
        </Page >
    );
}
