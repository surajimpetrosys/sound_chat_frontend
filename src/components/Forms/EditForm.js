import * as Yup from 'yup';
import { useState ,useEffect} from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment,Avatar } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import ImgCrop from 'antd-img-crop';
import { Upload,Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
// ----------------------------------------------------------------------
const ProductImgStyle = styled('img')({
  top: 50,
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  position: 'absolute'
});
export default function EditForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [vehicleimageerror, setVehicleimageerror] = useState(false);
  const [premiumContent, setPremiumContent] = useState({});
  const [vehiclemage, setVehiclemage] = useState();
  useEffect(() => {
    const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/interviewsdetails`;
    const bodyFormData = new FormData();
    axios.post(Livechaturl, {
      interview_id: props.id,
    }).then((response) => {
            const outlook = response
            console.log(outlook.data.data);
            setPremiumContent(outlook.data.data);
        })
}, [props.id]);
  const RegisterSchema = Yup.object().shape({
    pimage: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Interview Poster Link required'),
    interviewtitle: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Interview Title required'),
    content: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Interview Description required'),
    itype: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!').required('Interview Type required'),
    vlink: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Video Link required')
  });

  const formik = useFormik({
    initialValues: {
      pimage: '',
      interviewtitle: '',
      content: '',
      itype: '',
      vlink: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const onChange = ({ fileList }) => {
    setVehiclemage({ fileList });
    console.log('Vehiclemage', vehiclemage)
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
  const imgurl = ``
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* <img variant="square" alt={premiumContent.post_title} src={premiumContent.feature_img} /> */}
          <ProductImgStyle alt={premiumContent.post_title} src={premiumContent.feature_img} />
            <TextField
              fullWidth
              label="Poster Image"
              {...getFieldProps('pimage')}
              error={Boolean(touched.pimage && errors.pimage)}
              helperText={touched.pimage && errors.pimage}
              value={premiumContent.feature_img}
            />
                        {/* <Upload
                            action={imgurl}
                            listType="picture"
                            onChange={onChange}
                            onPreview={onPreview}
                            maxCount={1}
                        >
                            <Button> Upload Poster (Max: 1)</Button>
                        </Upload> */}
                        

            
          <TextField
              fullWidth
              label="Interview Title"
              {...getFieldProps('interviewtitle')}
              error={Boolean(touched.interviewtitle && errors.interviewtitle)}
              helperText={touched.interviewtitle && errors.interviewtitle}
              value={premiumContent.post_title}
            />
          <TextField
              fullWidth
              label="Interview Content"
              {...getFieldProps('content')}
              error={Boolean(touched.content && errors.content)}
              helperText={touched.content && errors.content}
              value={premiumContent.post_excerpt}
            />
            <TextField
              fullWidth
              label="Interview Title"
              {...getFieldProps('interviewtitle')}
              error={Boolean(touched.interviewtitle && errors.interviewtitle)}
              helperText={touched.interviewtitle && errors.interviewtitle}
              value={premiumContent.feature_img}
            />
            <TextField
              fullWidth
              label="Interview Type"
              {...getFieldProps('itype')}
              error={Boolean(touched.itype && errors.itype)}
              helperText={touched.itype && errors.itype}
              value={premiumContent.interview_type}
            />
            <TextField
              fullWidth
              label="Video Link"
              {...getFieldProps('vlink')}
              error={Boolean(touched.vlink && errors.vlink)}
              helperText={touched.vlink && errors.vlink}
              value={premiumContent.video_url}
            />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes{props.id}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
