import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import axios from 'axios';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
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
    const [content_type, setcontent_type] = useState('free_content');
    const [interview_type, setinterview_type] = useState('YELLOW_TENT');

    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        post_content: Yup.string().required('post_content is required'),
        post_title: Yup.string().required('post_title is required'),
        video_url: Yup.string().required('video_url is required'),
    });

    const formik = useFormik({
        initialValues: {
            post_content: "",
            post_title: "",
            video_url: "",
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            bodyFormData.append('mobileimage', mobileimage);
            // bodyFormData.append('desktopimage', desktopimage);
            bodyFormData.append('post_content', values.post_content);
            bodyFormData.append('post_title', values.post_title);
            bodyFormData.append('video_url', values.video_url);
            bodyFormData.append('content_type', content_type);
            bodyFormData.append('interview_type', interview_type);

            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/interviewsadd`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate('/dashboard/interview', { replace: true });
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
        <Page title="Add Interview | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add New Interview
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Add Interview" />
                                    <CardContent>
                                        <Grid container spacing={3}>

                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <TextField
                                        fullWidth
                                        autoComplete="post_title"
                                        type ="text"
                                        label="Interview Title"
                                    {...getFieldProps('post_title')}
                                        error={Boolean(touched.post_title && errors.post_title)}
                                        helperText={touched.post_title && errors.post_title}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <TextField
                                        fullWidth
                                        autoComplete="video_url"
                                        type ="text"
                                        label="Video url"
                                    {...getFieldProps('video_url')}
                                        error={Boolean(touched.video_url && errors.video_url)}
                                        helperText={touched.video_url && errors.video_url}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <TextField
                                        fullWidth
                                        autoComplete="post_content"
                                        type ="text"
                                        label="Interview Description"
                                        multiline
                                        rows={5}
                                        rowsMax={10}
                                    {...getFieldProps('post_content')}
                                        error={Boolean(touched.post_content && errors.post_content)}
                                        helperText={touched.post_content && errors.post_content}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel id="demo-simple-select-helper-label">Content type </InputLabel>
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
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel id="demo-simple-select-helper-label">Interview type </InputLabel>
                                        <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={interview_type}
                                        label="Interview Type"
                                        onChange={handleChangeforselect2}
                                        >
                                        <MenuItem value='YELLOW-TENT'>YELLOW-TENT</MenuItem>
                                        <MenuItem value='IN-STUDIO'>IN-STUDIO	</MenuItem>
                                        </Select>

                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}  sx={{ mt: 3 }}>
                            <Card>
                                <CardHeader title="Image For Poster" />
                                <CardContent>


                                    <Stack spacing={4}>

                                        <ImgCrop >
                                            <Upload
                                                className="upload-img"
                                                listType="picture-card"
                                                onChange={handleChange}
                                                onPreview={onPreview}
                                                maxCount={1}
                                            >
                                                + Upload Image For Poster
                                            </Upload>
                                        </ImgCrop>
                                    </Stack>
                                </CardContent>
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
                                                maxCount={1}
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
                                    Add Interview
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
