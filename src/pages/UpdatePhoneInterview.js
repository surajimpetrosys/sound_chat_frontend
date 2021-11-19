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

export default function UpdatePhoneInterview(props) {
    const location = useLocation();
    const params = useParams();
    const [gallery, setgallery] = useState([])
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [video_url, setvideo_url] = useState('')
    // useEffect(() => {
    //     const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/interviewsdetails`;
    //     axios.post(Livechaturl, { interview_id: params.interviewId }, { 'Content-Type': 'multipart/form-data' })
    //         .then((response) => {
    //             const outlook = response
    //             console.log(outlook);
    //             setgallery(outlook.data.data);
    //             // window.location.href = '/dashboard/gallery';
    //         })
    // }, [params.interviewId])
    const baseurl = 'http://3.23.210.57/soundradiobackend/images/interviews/';
    const [content_type, setcontent_type] = useState("FREE");
    const [interview_type, setinterview_type] = useState("");
    // const [gallery, setgallery] = useState([])

    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        post_content: Yup.string('post_content is required'),
        post_title: Yup.string('post_title is required'),
        video_url: Yup.string('video_url is required'),
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
            bodyFormData.append('phoneinterviews_id', params.interviewId);
            bodyFormData.append('mobileimage', mobileimage);
            bodyFormData.append('post_content', desc);
            bodyFormData.append('post_title', title);
            bodyFormData.append('video_url', video_url);
            bodyFormData.append('content_type', content_type);

            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/editPhoneinterviews`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate('/dashboard/phoneinterview', { replace: true });
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

    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/PhoneinterviewsviewDetail`;
        axios.post(Livechaturl, { phoneinterviews_id: params.interviewId }, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                setgallery(outlook.data.data);
                settitle(outlook.data.data.post_title)
                setdesc(outlook.data.data.post_content);
                setvideo_url(outlook.data.data.video_url)
                setcontent_type(outlook.data.data.content_type)
                // window.location.href = '/dashboard/gallery';
            })
    }, [params.interviewId])

    const changetitle = (event) => {
        settitle(event.target.value)
    }

    const changedesc = (event) => {
        setdesc(event.target.value)
    }

    const changevideourl = (event) => {
        setvideo_url(event.target.value)
    }
    return (
        <Page title="Update Phone Interview | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update Phone Interview
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Update Interview" />
                                    <CardContent>
                                        <Grid container spacing={3}>

                                            <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                        <InputLabel shrink htmlFor="circle">Interview Title</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_title"
                                                            type="text"
                                                            // label="Interview Title"
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
                                                        <InputLabel shrink htmlFor="circle">Video url</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="video_url"
                                                            type="text"
                                                            // label="Video url"
                                                            {...getFieldProps('video_url')}
                                                            value={video_url}
                                                            onChange={changevideourl}
                                                            error={Boolean(touched.video_url && errors.video_url)}
                                                            helperText={touched.video_url && errors.video_url}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                        <InputLabel shrink htmlFor="circle">Interview Description</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_content"
                                                            type="text"
                                                            // label="Interview Description"
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
                                            {/* <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_name"
                                                            type="text"
                                                            label="Post Name"
                                                            {...getFieldProps('post_name')}
                                                            error={Boolean(touched.post_name && errors.post_name)}
                                                            helperText={touched.post_name && errors.post_name}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>

                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_type"
                                                            type="text"
                                                            label="Post type"
                                                            {...getFieldProps('post_type')}
                                                            error={Boolean(touched.post_type && errors.post_type)}
                                                            helperText={touched.post_type && errors.post_type}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={6}>
                                                <Stack spacing={3}>
                                                    <FormControl>
                                                        <TextField
                                                            fullWidth
                                                            autoComplete="post_excerpt"
                                                            type="text"
                                                            label="Post excerpt"
                                                            {...getFieldProps('post_excerpt')}
                                                            error={Boolean(touched.post_excerpt && errors.post_excerpt)}
                                                            helperText={touched.post_excerpt && errors.post_excerpt}
                                                        />
                                                    </FormControl>
                                                </Stack>
                                            </Grid> */}

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
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
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
