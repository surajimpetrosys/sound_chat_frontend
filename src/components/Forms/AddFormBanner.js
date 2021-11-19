import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import { useFileUpload } from "use-file-upload";
import { Stack, IconButton, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  inputimage :{
    position: 'relative',
    left: '43px',
    padding: '0px'
}
}));

const AddForm = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [mobileimage, setMobileimage] = useState();
  const [desktopimage, setDesktopimage] = useState();
  const { handleSubmit, control } = useForm();
  const defaultSrc =
    "data:image/jpeg;base64,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";

  const [files1, selectFiles1] = useState();
  const [files2, selectFiles2] = useState();
 
  const handleChange=(event)=> {
    setMobileimage(URL.createObjectURL(event.target.files[0]))
    selectFiles1(event.target.files[0])
  }

  const handleChange1=(event)=> {
    setDesktopimage(URL.createObjectURL(event.target.files[0]))
    selectFiles2(event.target.files[0])
  }
  const onSubmit = data => {
    const bodyFormData = new FormData();
    bodyFormData.append('mobileimage', files1);
    bodyFormData.append('desktopimage', files2);
    const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/addbanner`;
        axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                console.log(outlook);
                navigate('/dashboard/Homeslider', { replace: true });
            })
  };


  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={{ xs: 'row', sm: 'row',md:'row',lg:'row' }} spacing={2}>
      <img src={mobileimage || defaultSrc} alt="alt" width='200' height='200'/>
        
      </Stack>
      <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: 'row' }} spacing={2}>
            <input type="file" onChange={handleChange} className={classes.inputimage}/>
            </Stack>
      <Stack direction={{ xs: 'row', sm: 'row',md:'row',lg:'row' }} spacing={2}>
      <img src={desktopimage || defaultSrc} alt="alt" width='200' height='200' />
        
      </Stack>
      <Stack direction={{ xs: 'row', sm: 'row', md: 'row', lg: 'row' }} spacing={2}>
            <input type="file" onChange={handleChange1} className={classes.inputimage}/>
            </Stack>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Save Banner Images
        </Button>
      </div>
    </form>
  );
};

export default AddForm;