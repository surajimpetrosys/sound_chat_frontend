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

export default function UpdateShowSchedule(props) {
    const location = useLocation();
    const params = useParams();
    const [gallery, setgallery] = useState([])
 
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
    const [content_type, setcontent_type] = useState(gallery.content_typ);
    const [interview_type, setinterview_type] = useState(gallery.interview_type);
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    const [video_url, setvideo_url] = useState('')
    const [start, setstart] = useState('');
    const [end, setend] = useState('');
    const [poster, setposter] = useState('');
    const handleChangeforselect = (event) => {
        setcontent_type(event.target.value);
    };
    const handleChangeforselect2 = (event) => {
        setinterview_type(event.target.value);
    };
    const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        show_name: Yup.string('show name is required'),
        show_description: Yup.string('show description is required'),
        show_start_date: Yup.string('start time is required'),
        show_end_date: Yup.string('end time is required'),
        show_audio_url: Yup.string('show Link time is required'),
    });

    const formik = useFormik({
        initialValues: {
            show_name: '',
            show_description: '',
            show_start_date: '',
            show_end_date: '',
            show_audio_url: '',
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            const bodyFormData = new FormData();
            bodyFormData.append('mobileimage', mobileimage);
            bodyFormData.append('show_name', title);
            bodyFormData.append('show_audio_url', video_url);
            bodyFormData.append('show_description', desc);
            bodyFormData.append('show_start_date', start);
            bodyFormData.append('show_end_date', end);
            bodyFormData.append('day_id', params.dayId);
            bodyFormData.append('show_id', params.showId);

            const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/updateperdayschedule`;
            axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
                .then((response) => {
                    const outlook = response
                    navigate(`/dashboard/shows/showslist/${params.dayId}`, { replace: true });
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
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/detailsperdayschedule`;
        axios.post(Livechaturl, { show_id: params.showId }, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                // alert(JSON.stringify(outlook.data.data));
                setgallery(outlook.data.data);
                settitle(outlook.data.data.show_name)
                setdesc(outlook.data.data.show_description);
                setvideo_url(outlook.data.data.show_audio_url)
                setcontent_type(outlook.data.data.show_description)
                setstart(outlook.data.data.show_start_date)
                setend(outlook.data.data.show_end_date)
                setposter(outlook.data.data.show_image)

                // window.location.href = '/dashboard/gallery';
            })
    }, [params.showId])

    const changetitle = (event) => {
        settitle(event.target.value)
    }

    const changedesc = (event) => {
        setdesc(event.target.value)
    }

    const changevideourl = (event) => {
        setvideo_url(event.target.value)
    }
    const changestart = (event) => {
        setstart(event.target.value)
    }
    const changeend = (event) => {
        setend(event.target.value)
    }
    const baseurl = 'http://3.23.210.57/soundradiobackend/images/podcast/';


    return (
        <Page title="Update Schedules | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Update New Show Schedule
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <CardHeader title="Update Show Details" />
                                    <CardContent>
                                        <Grid container spacing={3}>

                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Show Name</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="show_name"
                                        type ="text"
                                        // label="Show Name"
                                    {...getFieldProps('show_name')}
                                    value={title}
                                    onChange={changetitle}
                                        error={Boolean(touched.show_name && errors.show_name)}
                                        helperText={touched.show_name && errors.show_name}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Show Link</InputLabel>

                                        <TextField
                                        fullWidth
                                        autoComplete="show_audio_url"
                                        type ="text"
                                        // label="Show link"
                                    {...getFieldProps('show_audio_url')}
                                    value={video_url}
                                    onChange={changevideourl}
                                        error={Boolean(touched.show_audio_url && errors.show_audio_url)}
                                        helperText={touched.show_audio_url && errors.show_audio_url}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={12}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Show Description</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="show_description"
                                        type ="text"
                                        // label="Show Description"
                                        multiline
                                        rows={5}
                                        rowsMax={10}
                                    {...getFieldProps('show_description')}
                                    value={desc}
                                    onChange={changedesc}
                                        error={Boolean(touched.show_description && errors.show_description)}
                                        helperText={touched.show_description && errors.show_description}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>
                                       
                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Show Start Time</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="show_start_date"
                                        type ="text"
                                        // label="Show Start Time"
                                    {...getFieldProps('show_start_date')}
                                    value={start}
                                    onChange={changestart}
                                        error={Boolean(touched.show_start_date && errors.show_start_date)}
                                        helperText={touched.show_start_date && errors.show_start_date}
                                        />
                                        </FormControl>
                                        </Stack>
                                        </Grid>

                                        <Grid item xs={12} md={6} lg={6}>
                                        <Stack spacing={3}>
                                        <FormControl>
                                        <InputLabel shrink htmlFor="circle">Show End Time</InputLabel>
                                        <TextField
                                        fullWidth
                                        autoComplete="show_end_date"
                                        type ="text"
                                        // label="Show End Time"
                                    {...getFieldProps('show_end_date')}
                                    value={end}
                                    onChange={changeend}
                                        error={Boolean(touched.show_end_date && errors.show_end_date)}
                                        helperText={touched.show_end_date && errors.show_end_date}
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
                                    <CardHeader title="Image For Mobile Poster" />
                                    <Grid container spacing={3}>
                                    <Grid xs={12} md={3} lg={3} sx={{ mt: 3,ml
                                    :3,mb:0,pb:0 }}>
                                        <Stack spacing={3}>
                                            <CardContent >
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
                                                        onChange={handleChange}
                                                        onPreview={onPreview}
                                                        maxCount={1}
                                                        
                                                    >
                                                        + Upload New Poster
                            </Upload>
                                                </ImgCrop>
                                            </CardContent>
                                        </Stack>
                                    </Grid>
                                    </Grid>

                                </Card>
                            </Grid>


                        <Stack spacing={3} sx={{ mt: 4 }} >
                            <div>

                                <LoadingButton

                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Update Show Schedule
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
