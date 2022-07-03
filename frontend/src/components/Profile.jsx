import Login from './Login';
import Header from './Header';
import Wishboard from '../pages/Wishboard';
import useToken from './UseToken';

function Profile() {
  const { token, removeToken, setToken } = useToken();

  return (
    <div>
      <Header removeToken={removeToken} token={token} />
      {!token && token != '' && token !== undefined ? (
        <Login setToken={setToken} />
      ) : (
        <Wishboard token={token} setToken={setToken} />
      )}
    </div>
  );
}

export default Profile;
