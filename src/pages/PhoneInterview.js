import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Dialog
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, PhoneInterviewMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import { AddFormInterview } from '../components/Forms/index';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'poster', label: 'Poster', alignRight: false },
    // { id: 'poster desktop', label: ' Desktop Poster', alignRight: false },
    { id: 'title', label: 'Title', alignRight: false },
    { id: 'content', label: 'Description', alignRight: false },
    { id: 'videourl', label: 'Video Url', alignRight: false },
    // { id: 'createdat', label: 'Created At', alignRight: false },
    { id: 'updatedat', label: 'Updated At', alignRight: false },
    { id: 'Action', label: 'Action' }
    
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

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

export default function PhoneInterview() {
    const navigate = useNavigate();

  if(localStorage.getItem('token')==='llll'){
    navigate('/login', { replace: true });
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [premiumContent, setPremiumContent] = useState([]);
    const [freeContent, setfreeContent] = useState([]);

    useEffect(() => {
        const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/listphoneinterviews`;
        const bodyFormData = new FormData();
        axios.post(Livechaturl, bodyFormData, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                const outlook = response
                setPremiumContent(outlook.data.data);
            })
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const baseurl = 'http://3.23.210.57/soundradiobackend/images/interviews/';
    return (
        <Page title=" Phone Interview | SoundChatRadio">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Phone Interviews List
          </Typography>
                    <Button
                        variant="contained"
                        component={RouterLink}
                        to="/dashboard/phoneinterview/addinterview"
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Add New Phone Interview
                        
          </Button>
                </Stack>

                <Card>
                    {/* <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    /> */}

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {premiumContent
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { 
                                                createdAt,
                                                feature_img,
                                                feature_img_mobile,
                                                id,
                                                post_content,
                                                interview_type,
                                                post_title,
                                                updatedAt,
                                                video_url } = row;
                                            const isItemSelected = selected.indexOf(id) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        {/* <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, id)}
                                                        /> */}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar variant="square" alt={post_title} src={baseurl+feature_img} />
                                                        </Stack>
                                                        </TableCell>
                                                        {/* <TableCell component="th" scope="row" padding="none">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar variant="square" alt={post_title} src={feature_img_mobile} />
                                                        </Stack>
                                                    </TableCell> */}
                                                    <TableCell align="left">{post_title}</TableCell>
                                                    <TableCell align="left">{post_content}</TableCell>
                                                    <TableCell align="left">{video_url}</TableCell>
                                                    {/* <TableCell align="left">{moment(createdAt).format('MMMM Do YYYY')}</TableCell> */}
                                                    <TableCell align="left">{moment(updatedAt).format(' Do MMMM YYYY')}</TableCell>

                                                    <TableCell align="center">
                                                        <PhoneInterviewMoreMenu id={id}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        count={premiumContent.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
      <ToastContainer />
            </Container>
        </Page>
    );
}
