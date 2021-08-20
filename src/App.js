import './App.css';
import Pago from './components/Pagos';
import {LoginButton} from './components/Login';
import {LogoutButton} from './components/Logout';
import { LicenseInfo } from '@material-ui/x-grid';
import {useAuth0} from '@auth0/auth0-react';

LicenseInfo.setLicenseKey(
    '4a21e63931fd29df326404b13ca47a4bT1JERVI6MjI3OTcsRVhQSVJZPTE2NDc5NjE1MTAwMDAsS0VZVkVSU0lPTj0x',
);



function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <div className="App">
      {isAuthenticated ? <>
        <Pago/>
        <LogoutButton></LogoutButton>
        </>
      :
        <LoginButton></LoginButton>
      } 
    </div>

  );
}

export default App;
