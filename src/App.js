import './App.css';
import Menu from './components/Menu';
import {LoginButton} from './components/Login';
import { LicenseInfo } from '@material-ui/x-grid';
import {useAuth0} from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';

LicenseInfo.setLicenseKey(
    '4a21e63931fd29df326404b13ca47a4bT1JERVI6MjI3OTcsRVhQSVJZPTE2NDc5NjE1MTAwMDAsS0VZVkVSU0lPTj0x',
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  body:{backgroundColor: 'grey',}

}));

function App() {
  const {isAuthenticated} = useAuth0();
  const classes = useStyles();
  return (
    <div className={classes.app}>
      {isAuthenticated ? <>
        <Menu/>
        </>
      :
        <div className={classes.root}><LoginButton/>
        </div>
        
      } 
    </div>

  );
}

export default App;
