import Login from '../pages/Login';
import Header from './Header';
import Wishboard from '../pages/Wishboard';
import useToken from './UseToken';
import { useSelector, useDispatch } from 'react-redux';
import {
  Alert,
  Link as hLink,
  Chip,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { verificationEmail } from '../redux/verificationEmailSlice';
import { accExists } from '../redux/accExistsSlice';

function Profile() {
  const dispatch = useDispatch();
  const verificationEmailSent = useSelector(
    (state) => state.verificationEmail.verificationEmail
  );
  const accExistsState = useSelector((state) => state.accExists.accExists);
  const imgLengthCheck = useSelector((state) => state.imgLengthCheck.length);
  const { token, removeToken, setToken } = useToken();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(verificationEmail(false));
    dispatch(accExists(false));
  };

  return (
    <div>
      <Header removeToken={removeToken} token={token} />
      <div>
        <Snackbar
          open={accExistsState}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert variant="filled" severity="error">
            An account with this email already exists. Please login.
          </Alert>
        </Snackbar>

        <Snackbar
          open={verificationEmailSent}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert variant="filled" severity="success">
            Verification email is sent. Please check your mailbox.
          </Alert>
        </Snackbar>
        {!token && token != '' && token !== undefined ? (
          <Login setToken={setToken} />
        ) : (
          <>
            {imgLengthCheck == 0 ? (
              <Container className="d-flex justify-content-center">
                <Alert variant="outlined" severity="info" sx={{ width: '60%' }}>
                  Your Wishboard is empty.{' '}
                  <strong>
                    Please{' '}
                    <Link
                      to="/"
                      style={{ textDecoration: 'none', color: 'none' }}
                    >
                      <Chip
                        label="Search"
                        icon={<SearchIcon />}
                        size="small"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                      />
                    </Link>{' '}
                    for images and save them to your Wishboard
                  </strong>
                </Alert>
              </Container>
            ) : (
              ''
            )}
            <Wishboard token={token} setToken={setToken} />
          </>
        )}
      </div>
      )
    </div>
  );
}

export default Profile;
