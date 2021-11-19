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
// import TextField from '@material-ui/core/TextField';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';

import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
// import Select from "react-select";
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@material-ui/lab';
// import FormControl from '@mui/material/FormControl';


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

export default function UpdateOrder(props) {
    const location = useLocation();
    const params = useParams();
    const [gallery, setgallery] = useState([])
    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/orderdetails`;
        axios.post(Livechaturl, { id: params.orderId }, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response 
                setgallery(outlook.data.data);
                // window.location.href = '/dashboard/gallery';
            })
    }, [params.orderId])
    const baseurl = 'http://3.23.210.57/soundradiobackend/images/interviews/';
    const [content_type, setcontent_type] = useState('1');
    const [interview_type, setinterview_type] = useState(gallery.interview_type);

    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({

    });

    const formik = useFormik({
        initialValues: {
            post_content: "",
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            bodyFormData.append('order_id', params.orderId);
            bodyFormData.append('order_status', content_type);

            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/updateorder`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate(`/dashboard/productorder/details/${params.orderId}`, { replace: true });
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
    return (
        <Page title="Update Order | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update Order Status
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Update Status" />
                                    <CardContent>
                                        <Grid container spacing={3}>

                                            
                                            <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                        <InputLabel id="demo-simple-select-helper-label">Order Status </InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={content_type}
                                                            label="Status"
                                                            onChange={handleChangeforselect}
                                                        >
                                                            <MenuItem value='0'>Placed</MenuItem>
                                                            <MenuItem value='1'>Prepared</MenuItem>
                                                            <MenuItem value='2'>Shipped</MenuItem>
                                                            <MenuItem value='3'>Delivered</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                     
                        <Stack spacing={3} sx={{ mt: 4 }}>
                            <div>

                                <LoadingButton

                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Update
                                </LoadingButton>
                            </div>
                        </Stack>
            
                    </Form >
                </FormikProvider >
                <ToastContainer />
            </Container >
        </Page >
    );
}
