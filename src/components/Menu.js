import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
//Iconos
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ReceiptIcon from '@material-ui/icons/Receipt';
import WorkIcon from '@material-ui/icons/Work';
import GetAppIcon from '@material-ui/icons/GetApp';
//Componentes
import {LogoutButton} from './Logout';
import Pagos from './Pagos';
import PagosPendientes from './PagosPendientes';
import Bancos from './Bancos';
import Proyectos from './Proyectos';
import Cobros from './Cobros';
import Exportar from './Exportar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,       
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="Menu">
                        <Tab label="Pagos" icon={<PaymentIcon/>} {...a11yProps(0)}/>
                        <Tab label="Cobros"icon={<ReceiptIcon/>}  {...a11yProps(1)} />
                        <Tab label="Bancos"icon={<AccountBalanceIcon/>}  {...a11yProps(2)} />
                        <Tab label="Proyectos" icon={<WorkIcon/>} {...a11yProps(3)} />
                        <Tab label="Exportar" icon={<GetAppIcon/>} {...a11yProps(4)} />
                        <LogoutButton/>
                    </Tabs>
                    
                </Toolbar>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Pagos/>
                <p></p>
                <PagosPendientes/>
            </TabPanel>
            <TabPanel value={value} index={1}>
               <Cobros/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Bancos/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Proyectos/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Exportar/>
            </TabPanel>
        </div>
    );
}
