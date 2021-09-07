import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {useAuth0} from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
}));

export const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
    const classes = useStyles();
    return (
        <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs zeroMinWidth>
          <img src="https://www.caldererias.es/wp-content/uploads/2019/01/logo.png" alt="Caldererias Indalicas"/>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container  spacing={3}>
          <Grid item xs={12}>
            <h3>Aplicación de tesorería</h3>
          </Grid>
          <Grid item xs={12}>
                <Button variant="contained" onClick= {() => loginWithRedirect()}>Login</Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
    )
}