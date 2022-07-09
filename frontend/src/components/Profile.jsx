import Login from '../pages/Login';
import Header from './Header';
import Wishboard from '../pages/Wishboard';
import useToken from './UseToken';
import { useSelector, useDispatch } from 'react-redux';
import { AlertTitle, Alert, Link as hLink, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Profile(images) {
  const { token, removeToken, setToken } = useToken();
  const imgLengthCheck = useSelector((state) => state.imgLengthCheck.length);
  console.log(imgLengthCheck);

  return (
    <div>
      <Header removeToken={removeToken} token={token} />
      {imgLengthCheck == 0 ? (
        <Container className='d-flex justify-content-center'>
          <Alert variant="outlined" severity="info" sx={{ width: '60%'}} >
            {/* <AlertTitle>Info</AlertTitle> */}
            Your Wishboard is empty. <strong>Please <Link to='/' style={{ textDecoration: 'none', color: 'none'}}><Chip
  label="Search"
  icon={<SearchIcon />}
  size="small"
  component="a"
  href="#basic-chip"
  variant="outlined"
  clickable
/></Link> for images and save them to your Wishboard</strong>
          </Alert>
        </Container>
      ) : (
        <div>
          {!token && token != '' && token !== undefined ? (
            <Login setToken={setToken} />
          ) : (
            <Wishboard token={token} setToken={setToken} />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
