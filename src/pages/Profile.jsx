import Login from './Login';
import Header from '../components/Header';
import Wishboard from '../components/Wishboard';
import useToken from '../components/UseToken';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  Alert,
  Link as hLink,
  Chip,
  Snackbar,
  Divider,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { verificationEmail } from '../redux/verificationEmailSlice';
import { accExists } from '../redux/accExistsSlice';
import AppBarTop from '../components/AppBarTop';


function Profile() {
  const dispatch = useDispatch();
  const loginName = useSelector(
    (state) => state.loginInfo.name
  );
  
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
    <AppBarTop token={token} removeToken={removeToken} />
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

            <Wishboard token={token} setToken={setToken} />
          </>
        )}
      </div>
      )
    </div>
  );
}

export default Profile;
