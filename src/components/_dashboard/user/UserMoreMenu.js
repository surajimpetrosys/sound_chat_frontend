import { Icon } from '@iconify/react';
import { useRef, useState,React } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink,NavLink as RouterNavLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import eyeFill from '@iconify/icons-eva/eye-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, ListItemIcon, ListItemText,Button,Dialog,Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CloseIcon from '@material-ui/icons/Close';
// ----------------------------------------------------------------------
import { EditForm } from '../../Forms/index';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          {/* <CloseIcon /> */}
          Close
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
  
 
export default function UserMoreMenu(props) {

  const [premiumContent, setPremiumContent] = useState([]);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleterow = ()=>{
    const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/deleteinterviews`;
        axios.post(Livechaturl, {
          interview_id: props.id,
        }).then((response) => {
          const outlook = response
          // alert(outlook.data.message);
          window.location.href = '/dashboard/interview';
      })
    setOpen(false);
  }
  const editrow = ()=>{
    // alert(JSON.stringify(props.id))
  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            
            {/* <Icon icon={trash2Outline} width={24} height={24} onClick = {deleterow} /> */}
          </ListItemIcon>
          {/* <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} onClick={deleterow}/> */}
        </MenuItem>
        <MenuItem component={RouterNavLink} to={`/dashboard/user/details/${props.id}`}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} onClick={handleClickOpen} />
          </ListItemIcon>
        </MenuItem>
        {/* <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} onClick={handleClickOpen} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} onClick={editrow}/>
        </MenuItem> */}
      </Menu>
      <div>
      <ToastContainer />
    </div>
    </>
  );
}
