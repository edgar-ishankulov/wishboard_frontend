import Login from '../pages/Login';
import Header from './Header';
import Wishboard from '../pages/Wishboard';
import useToken from './UseToken';
import Search from './Search';

function Profile(images) {
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
