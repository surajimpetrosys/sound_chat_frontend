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
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
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
    const params = useParams();
    const [displayColorPicker, setdisplayColorPicker] = useState(false);
    const [colors, setcolors] = useState('#181cbe');
    const [color, setcolor] = useState('#181cbe');
    const [size, setsize] = useState('M');
    const [gallery, setgallery] = useState([])
    const [price, setprice] = useState('')
    const [avaibility, setavaibility] = useState('')
    const [quantity, setquantity] = useState('')
    const [poster, setposter] = useState('');
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        // title: Yup.string().required('title is required'),
        // description: Yup.string().required('description is required'),
        // SKU: Yup.string().required('SKU is required'),
        // Price: Yup.string().required('Price is required'),
        // Discount: Yup.string().required('Discount is required'),
        // Quantity: Yup.string().required('Quantity is required'),
        // currency: Yup.string().required('currency is required'),
        // size: Yup.string().required('size is required'),
        // color: Yup.string().required('color is required'),
        // catogery: Yup.string().required('catogery is required'),
        // Shop: Yup.string().required('Shop is required'),
        // Published_At: Yup.string().required('Publish Date is required'),
        // Starts_At: Yup.string().required('Start Date is required'),
        // Ends_At: Yup.string().required('End Date is required')
        price: Yup.string('Price is required'),
        quantity: Yup.string('Quantity is required'),
        color: Yup.string('color is required'),
        avaibility: Yup.number('avaibility is required'),
    });

    const formik = useFormik({
        initialValues: {
            price: '',
            hexcode: '',
            avaibility: '',
            quantity: '',
            size: '', 
            color: '',
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            bodyFormData.append('id', params.itemId);
            bodyFormData.append('id_product',params.productId);
            bodyFormData.append('price', price);
            bodyFormData.append('avaibility', avaibility);
            bodyFormData.append('quantity', quantity);
            bodyFormData.append('size', size);
            bodyFormData.append('color', color);
            bodyFormData.append('hexcode', colors);
            bodyFormData.append('mobileimage', mobileimage);
            
            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/updateproductavailibility`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate(`/dashboard/products/details/${params.productId}`, { replace: true });
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
    
    const handleChangeforselect = (event) => {
        setsize(event.target.value);
    };
    const handleClick2 = () => {
        setdisplayColorPicker(!displayColorPicker)
    };

    const handleClose2 = () => {
        setdisplayColorPicker(false)
    };

    const handleChange2 = (color) => {
        setcolors(color.hex)
    };
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
    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '36px',
                marginTop: '3px',
                borderRadius: '2px',
                background: `${colors}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    

    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/detailsproductavailibility`;
        axios.post(Livechaturl, { id: params.itemId }, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                setgallery(outlook.data.data);
                setcolor(outlook.data.data.color)
                setsize(outlook.data.data.size);
                setprice(outlook.data.data.price)
                setquantity(outlook.data.data.quantity)
                setavaibility(outlook.data.data.avaibility)
                setcolors(outlook.data.data.hexcode)
                setposter(outlook.data.data.Image)

                // window.location.href = '/dashboard/gallery';
            })
    }, [params.interviewId])

    const changecolor = (event) => {
        setcolor(event.target.value)
    }

    const changecolors = (event) => {
        setcolors(event.target.value)
    }

    const changeprice = (event) => {
        setprice(event.target.value)
    }

    const changesize= (event) => {
        setsize(event.target.value)
    }


    const changeavaibility= (event) => {
        setavaibility(event.target.value)
    }
    const changequantity= (event) => {
        setquantity(event.target.value)
    }

    // const handleChangeforselect = (event) => {
    //     setcontent_type(event.target.value);
    // };
    // const handleChangeforselect2 = (event) => {
    //     setinterview_type(event.target.value);
    // };

    const baseurl = 'http://3.23.210.57/soundradiobackend/images/product/';

    return (
        <Page title="Update Product Availibility | SoundChatRadio">
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Update Pruduct Avaibility with Size-Color-Quantity
                </Typography>
            </Stack>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} md={12} lg={12}>
                            <Card>
                                <CardHeader title="Update Product Avaibility" />
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Stack spacing={3}>
                                                <FormControl>
                                                    <TextField
                                                        fullWidth
                                                        autoComplete="color"
                                                        type="text"
                                                        label="Product color"
                                                        {...getFieldProps('color')}
                                                        error={Boolean(touched.color && errors.color)}
                                                        helperText={touched.color && errors.color}
                                                        value={color}
                                                        onChange={changecolor}
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <Stack spacing={3}>
                                                <FormControl>
                                                    <TextField
                                                        fullWidth
                                                        autoComplete="hexcode"
                                                        type="text"
                                                        label="Color hexcode"
                                                        aria-readonly
                                                        {...getFieldProps('hexcode')}
                                                        error={Boolean(touched.hexcode && errors.hexcode)}
                                                        helperText={touched.hexcode && errors.hexcode}
                                                        value={colors}
                                                        onChange={changecolors}
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={3} lg={3}>
                                            <Stack spacing={3}>
                                                <div>
                                                    <div role="button"
                                                        tabIndex="0" style={styles.swatch} onClick={handleClick2} onKeyDown={handleClick2}>
                                                        <div style={styles.color} />
                                                    </div>
                                                    {displayColorPicker ? <div style={styles.popover}>
                                                        <div role="button"
                                                            tabIndex="0" style={styles.cover} onClick={handleClose2} onKeyDown={handleClose2} />
                                                        <SketchPicker color={colors} onChange={handleChange2} />
                                                    </div> : null}

                                                </div>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={6}>
                                            <Stack spacing={3}>
                                                <FormControl>

                                                    <TextField
                                                        fullWidth
                                                        autoComplete="price"
                                                        type="text"
                                                        label=" Pruduct Price"
                                                        {...getFieldProps('price')}
                                                        error={Boolean(touched.price && errors.price)}
                                                        helperText={touched.price && errors.price}
                                                        value={price}
                                                        onChange={changeprice}
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={6}>
                                            <Stack spacing={3}>
                                                <FormControl>
                                                    <TextField
                                                        fullWidth
                                                        autoComplete="avaibility"
                                                        type="text"
                                                        label="avaibility"
                                                        {...getFieldProps('avaibility')}
                                                        error={Boolean(touched.avaibility && errors.avaibility)}
                                                        helperText={touched.avaibility && errors.avaibility}
                                                        value={avaibility}
                                                        onChange={changeavaibility}
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Stack spacing={3}>
                                                <FormControl>
                                                    <TextField
                                                        fullWidth
                                                        autoComplete="quantity"
                                                        type="text"
                                                        label="quantity"
                                                        {...getFieldProps('quantity')}
                                                        error={Boolean(touched.quantity && errors.quantity)}
                                                        helperText={touched.quantity && errors.quantity}
                                                        value={quantity}
                                                        onChange={changequantity}
                                                    />
                                                </FormControl>
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                    <Stack spacing={3}>
                                    <FormControl>
                                    <InputLabel id="demo-simple-select-helper-label">Size </InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={size}
                                    label="Select Size"
                                    onChange={handleChangeforselect}
                                    >
                                    <MenuItem value='S'>S</MenuItem>
                                    <MenuItem value='M'>M</MenuItem>
                                    <MenuItem value='L'>L</MenuItem>
                                    <MenuItem value='XL'>XL</MenuItem>
                                    <MenuItem value='XXL'>XXL</MenuItem>
                                    </Select>
                                    </FormControl>
                                    </Stack>
                                    </Grid>
                                        {/* <Grid item xs={12} md={6} lg={6}>
                                            <Stack spacing={3}>
                                                <FormControl>
                                                    <TextField
                                                        fullWidth
                                                        autoComplete="size"
                                                        type="text"
                                                        label="size"
                                                        {...getFieldProps('size')}
                                                        error={Boolean(touched.size && errors.size)}
                                                        helperText={touched.size && errors.size}
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
                                    <CardHeader title="Product Image" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}> 
                                            <CardContent>
                                                    <img src={baseurl + poster} alt={poster} width='250' height='250'/>
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
                                                        onChange={handleChange1}
                                                        onPreview={onPreview}
                                                        maxCount={1}
                                                        
                                                    >
                                                        + Upload New Pic.
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
                                Update Avaibility
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