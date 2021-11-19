import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase, paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate, NavLink, useLocation, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment from 'moment';

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
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, ShowscheduleMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------
const TABLE_HEAD = [

  { id: 'name', label: 'Show Name', alignRight: false },
  { id: 'poster', label: 'Show Poster', alignRight: false },
  { id: 'start', label: 'Start Time', alignRight: false },
  { id: 'end', label: 'End Time', alignRight: false },
  { id: 'updated', label: 'Updated Date', alignRight: false },
  { id: '' }
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

export default function Showsperday() {
  const navigate = useNavigate();

  if (localStorage.getItem('token') === 'llll') {
    navigate('/login', { replace: true });
  }
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const [freeContent, setfreeContent] = useState([]);
  const params = useParams();
  useEffect(() => {
    const Livechaturl = `http://3.23.210.57:3000/api/v1/auth/listshowscheduleperday`;

    axios.post(Livechaturl, { day_id: params.dayId })
      .then((response) => {
        const outlook = response
        setfreeContent(outlook.data.data);
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
  const baseurl = 'http://3.23.210.57/soundradiobackend/images/podcast/';

  return (
    <Page title="Show Schedule| SoundChatRadio">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shows
          </Typography>

            <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/dashboard/shows/showslist/addshowschedule/${params.dayId}`}
                        startIcon={<Icon icon={plusFill} />}
                    > Add New Show  
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
                  rowCount={freeContent.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {freeContent
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        show_id,
                        show_name,
                        show_image,
                        show_start_date,
                        show_end_date,
                        show_audio_url,
                        show_description,
                        updatedAt

                      } = row;
                      const isItemSelected = selected.indexOf(show_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={show_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            {/* <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, show_id)}
                            /> */}
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell align="left">{show_name}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar variant="square" alt={show_name} src={baseurl + show_image} />
                            </Stack>
                          </TableCell>

                          {/* <TableCell align="left">{show_audio_url}</TableCell> */}
                          <TableCell align="left">{show_start_date}</TableCell>
                          <TableCell align="left">{show_end_date}</TableCell>
                          <TableCell align="left">{moment(updatedAt).format(' Do MMMM YYYY')}</TableCell>

                          <TableCell align="right">
                            <ShowscheduleMoreMenu dayid={params.dayId} showid = {show_id}  />
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
            count={freeContent.length}
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
