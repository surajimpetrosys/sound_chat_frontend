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

export default function UpdateHomeslider() {
    const location = useLocation();
    const params = useParams();
    const [content_type, setcontent_type] = useState('free_content');
    const [interview_type, setinterview_type] = useState('YELLOW_TENT');
    const [gallery, setgallery] = useState([]);
    const baseurl = 'http://3.23.210.57/soundradiobackend/images/';
    const navigate = useNavigate();

    if (localStorage.getItem('token') === 'llll') {
        navigate('/login', { replace: true });
    }
    const classes = useStyles();
    const [gallery_pics, setgallery_pics] = useState();
    const [mobileimage, setMobileimage] = useState();
    const [desktopimage, setDesktopimage] = useState();
    const [title, settitle] = useState('')
    // const { handleSubmit, control } = useForm();

    const handleChange = ({ fileList }) => {
        setMobileimage(fileList[0].originFileObj)
    }

    const handleChange1 = ({ fileList }) => {
        setDesktopimage(fileList[0].originFileObj)
    }
    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const LoginSchema = Yup.object().shape({
        title: Yup.string('title is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            bodyFormData.append('id', params.sliderId);
            bodyFormData.append('mobileimage', mobileimage);
            // bodyFormData.append('desktopimage', desktopimage);
            bodyFormData.append('title', title);
            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/updateslider`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate('/dashboard/homeslider', { replace: true });
                    toast.success(outlook.data.message)
                })
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    const onChange = ({ fileList }) => {
        setgallery_pics({ fileList });
    };
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

    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/sliderdetails`;
        axios.post(Livechaturl, { id: params.sliderId }, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                setgallery(outlook.data.data);
                settitle(outlook.data.data.title)
                // window.location.href = '/dashboard/gallery';
            })
    }, [params.sliderId])
    const changetitle = (event) => {
        settitle(event.target.value)
    }
    return (
        <Page title="Update Slider | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update Slider Images
                    </Typography>
                </Stack>

                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Update Images" />
                                    <CardContent>

                                        <Stack spacing={3}>
                                            <FormControl>
                                                <TextField
                                                    fullWidth
                                                    autoComplete="title"
                                                    type="text"
                                                    label="Title"
                                                    {...getFieldProps('title')}
                                                    value={title}
                                                    onChange={changetitle}
                                                    error={Boolean(touched.title && errors.title)}
                                                    helperText={touched.title && errors.title}
                                                />
                                            </FormControl>
                                        </Stack>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
                                <Card>
                                    <CardHeader title="Image For Slider" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}>
                                            <CardContent>
                                                    <img src={baseurl + gallery.img} alt={gallery.img} width='250' height='250'/>
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
                                                        + Upload New Image For Slider
                            </Upload>
                                                </ImgCrop>
                                            </CardContent>
                                        </Stack>
                                    </Grid>
                                    </Grid>

                                </Card>
                            </Grid>
                            {/* <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
                                <Card>
                                    <CardHeader title="Image For Desktop Slider" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}>
                                            <CardContent>
                                                    <img src={baseurl + gallery.desktopimage} alt={gallery.desktopimage} width='250' height='250'/>
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
                                                        + Upload New Image For Desktop Slider
                            </Upload>
                                                </ImgCrop>
                                            </CardContent>
                                        </Stack>
                                    </Grid>
                                    </Grid>

                                </Card>
                            </Grid> */}
                        </Grid>
                        <Stack spacing={3} sx={{ mt: 4 }} >
                            <div>
                                <LoadingButton

                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Update Slider
                                </LoadingButton>
                            </div>
                        </Stack>
                    </Form>
                </FormikProvider>
                <ToastContainer />
            </Container>
        </Page>
    );
}
