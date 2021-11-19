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

export default function UpdateGallery() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [content_type, setcontent_type] = useState('free_content');
    const [interview_type, setinterview_type] = useState('YELLOW_TENT');
    const [gallery, setgallery] = useState([])
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
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
    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const LoginSchema = Yup.object().shape({
        post_content: Yup.string('post_content is required'),
        post_title: Yup.string('post_title is required'),

    });

    const formik = useFormik({
        initialValues: {
            post_content: "",
            post_title: "",
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            bodyFormData.append('id', params.galleryId);
            bodyFormData.append('mobileimage', mobileimage);
            // bodyFormData.append('desktopimage', desktopimage);
            bodyFormData.append('post_content', desc);
            bodyFormData.append('post_title', title);
            bodyFormData.append('content_type', content_type);
            bodyFormData.append('img_gallery_pic', gallery_pics);
            if (gallery_pics.fileList) {
                for (let i = 0; i < gallery_pics.fileList.length; i += 1) {
                    bodyFormData.append('gallery_pics', gallery_pics.fileList[i].originFileObj);
                }
            }

            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/updategallery`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate('/dashboard/gallery', { replace: true });
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
    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/gallerydetails`;
        axios.post(Livechaturl, { id: params.galleryId }, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                // (JSON.stringify(outlook.data.data));
                // setcontent_type(outlook.data.data.content_type)
                setgallery(outlook.data.data);
                settitle(outlook.data.data.post_title)
                setdesc(outlook.data.data.post_content);
                // window.location.href = '/dashboard/gallery';
            })
    }, [params.galleryId])

    const changetitle = (event) => {
        settitle(event.target.value)
    }

    const changedesc = (event) => {
        setdesc(event.target.value)
    }

    const baseurl = "http://3.23.210.57/soundradiobackend/images/gallery/"

    return (
        <Page title="Update Gallery | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update Gallery
                    </Typography>
                </Stack>

                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Update Gallery" />
                                    <CardContent>
                                        <Grid container spacing={3}>

                                            <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                    <InputLabel shrink htmlFor="circle">
                                                    Gallery Title</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_title"
                                                            type="text"
                                                            // label="Gallery Title"
                                                            {...getFieldProps('post_title')}
                                                            value={title}
                                                            onChange={changetitle}
                                                            error={Boolean(touched.post_title && errors.post_title)}
                                                            helperText={touched.post_title && errors.post_title}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                        <InputLabel id="demo-simple-select-helper-label">Content type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-helper-label"
                                                            id="demo-simple-select-helper"
                                                            value={content_type}
                                                            label="Content Type"
                                                            onChange={handleChangeforselect}
                                                        >
                                                            <MenuItem value='free_content'>FREE</MenuItem>
                                                            <MenuItem value='premium_content'>PAID</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                    <InputLabel shrink htmlFor="circle">
                                                    Gallery Description</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_content"
                                                            type="text"
                                                            //  label="Gallery Description"
                                                            multiline
                                                            rows={5}
                                                            rowsMax={10}
                                                            {...getFieldProps('post_content')}
                                                            value={desc}
                                                            onChange={changedesc}
                                                            error={Boolean(touched.post_content && errors.post_content)}
                                                            helperText={touched.post_content && errors.post_content}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                            
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
                            <Card>
                                <CardHeader title="Upload pics. for Album" />
                                <CardContent>
                                    {/* <h3>Upload Images for gallery</h3> */}
                                    <Stack spacing={4}>
                                        <ImgCrop grid>
                                            <Upload
                                                className="upload-img"
                                                listType="picture-card"
                                                onChange={onChange}
                                                onPreview={onPreview}
                                            >
                                                + Upload Images for gallery
                                            </Upload>
                                        </ImgCrop>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12} sx={{ mt: 3 }}>
                                <Card>
                                    <CardHeader title="Image For Poster" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}>
                                            <CardContent >
                                                    <img src={baseurl + gallery.feature_img} alt={gallery.feature_img} width='250' height='250'/>
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
                                                        + Upload New Image For Poster
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
                                    <CardHeader title="Image For Desktop Poster" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}>
                                            <CardContent >
                                                    <img src={baseurl + gallery.feature_img_desktop} alt={gallery.feature_img} width='250' height='250'/>
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
                                                        + Upload New Image For Desktop Poster
                            </Upload>
                                                </ImgCrop>
                                            </CardContent>
                                        </Stack>
                                    </Grid>
                                    </Grid>

                                </Card>
                            </Grid> */}

                        <Stack spacing={3} sx={{ mt: 4 }}>
                            <div>
                                <LoadingButton

                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Update Gallery
                                </LoadingButton>
                            </div>
                        </Stack>
                    </Form>
                </FormikProvider>
                <ToastContainer />
            </Container>
        </Page >
    );
}
