import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Tab from '@material-ui/core/Tab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const LogoutButton = () => {
    const {logout} = useAuth0();
    return  <Tab style={{marginRight: '20px'}} label="Cerrar sesion" icon={<AccountCircleIcon/>} onClick= {() => logout({returnTo: window.location.origin})}/>
     /*<Button style={{margin:'20px'}} variant="outlined" color="secondary" onClick= {() => logout({returnTo: window.location.origin})}>Logout</Button>*/
       
}