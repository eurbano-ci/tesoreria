import React,{useState,useEffect} from 'react';
import { XGrid } from '@material-ui/x-grid';

import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    formulario:{
        margin:theme.spacing(2),
    },
    formularioElemento:{
        margin:theme.spacing(2),
    }
}));

const columns = [
    { field: 'id', headerName: 'ID', type:'number', width: 70 },
    { field: 'tipo', headerName: 'Tipo', type:'string', width: 150 },
    { field: 'acu', headerName: 'Acumulado', type:'string', width: 150 },
    { field: 'jan', headerName: 'Enero', type:'string', width: 150 },
    { field: 'feb', headerName: 'Febrero', type:'string', width: 150 },
    { field: 'mar', headerName: 'Marzo', type:'string', width: 150 },
    { field: 'apr', headerName: 'Abril', type:'string', width: 150 },
    { field: 'may', headerName: 'Mayo', type:'string', width: 150 },
    { field: 'jun', headerName: 'Junio', type:'string', width: 150 },
    { field: 'jul', headerName: 'Julio', type:'string', width: 150 },
    { field: 'aug', headerName: 'Agosto', type:'string', width: 150 },
    { field: 'sep', headerName: 'Septiembre', type:'string', width: 150 },
    { field: 'oct', headerName: 'Octubre', type:'string', width: 150 },
    { field: 'nov', headerName: 'Noviembre', type:'string', width: 150 },
    { field: 'dec', headerName: 'Diciembre', type:'string', width: 150 },
];

export default class Editarpagos extends React.Component {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        const defaultDate = currentDate.toISOString().substr(0,10);
        this.state = {tipo: 'P', concepto:'', estado:'', cantidad:'', fechaInicio:defaultDate, fechaFin:defaultDate, localizacion:'ESP', render:true, urlapi:'' };
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick= this.handleClick.bind(this);
        console.log('url:'+this.state.urlapi)
    }

    handleChangeFechaInicio = (e) =>{
        this.setState({fechaInicio: e.target.value})
    }
    handleChangeFechaFin = (e) =>{
        this.setState({fechaFin: e.target.value})
    }
    handleChangeLocalizacion = (e) =>{
        this.setState({localizacion: e.target.value})
    }

    handleClick = (e) =>{
        const url = 'http://192.168.4.246:3001/api/tciPagos/extractpago?localizacion='+this.state.localizacion+'&fechainicio='+this.state.fechaInicio+'&fechafin='+this.state.fechaFin
        this.setState({urlapi:url});
        e.preventDefault();
    }

    render() {
        return (
            <div>
            <form /*noValidate autoComplete="off"*/ onSubmit={this.handleSubmit}>
                <TextField style={{margin:'10px'}} id="fecha_inicio" label="Fecha Inicio" type="date" variant="outlined"
                           InputLabelProps={{shrink: true}} onChange={this.handleChangeFechaInicio} value={this.state.fechaInicio}/>
                <TextField style={{margin:'10px'}} id="fecha_fin" label="Fecha Fin" type="date" variant="outlined"
                           InputLabelProps={{shrink: true}} onChange={this.handleChangeFechaFin} value={this.state.fechaFin}/>
                <FormControl style={{margin:'10px'}} variant="outlined" width="220">
                    <InputLabel id="localizacion">Pais</InputLabel>
                    <Select labelId="pg-localizacion" id="pg_localizacion" label="Pais" value={this.state.localizacion} onChange={this.handleChangeLocalizacion}>
                        <MenuItem value={'ESP'}>ESP</MenuItem>
                        <MenuItem value={'MAR'}>MAR</MenuItem>
                        <MenuItem value={'UK'}>UK</MenuItem>
                        <MenuItem value={'PRU'}>PRU</MenuItem>
                    </Select>
                </FormControl>
                <Fab style={{margin:'10px'}} color="primary" aria-label="add" type="submit" value="Submit" onClick={this.handleClick}><AddIcon/></Fab>
            </form>
                <TablaPagos url={this.state}/>
            </div>
        );
    }
}

 function TablaPagos(props) {
    const classes = useStyles();// eslint-disable-next-line
    const [error, setError] = useState(null); // eslint-disable-next-line
    const [isLoaded, setIsLoaded] = useState(false); // eslint-disable-next-line
    const [items, setItems] = useState([]); // eslint-disable-next-line
    const [open,setOpen] = useState(false); // eslint-disable-next-line
    const currentDate = new Date() ; // eslint-disable-next-line
    const defaultDate = currentDate.toISOString().substr(0,10) // eslint-disable-next-line
    const handleClose = (value) => { // eslint-disable-next-line
        setOpen(false);
    };
    const url = props.url.urlapi;
    console.log('La url:'+url);

    //Fetch de los datos de
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(url,{signal: signal})
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
        return function cleanup(){
            abortController.abort();
        }
    }, [url])

        return(
            <div className={classes.root} style={{ height: 700, width: '100%' }}>
                <XGrid columns={columns} rows={items} pagination={items}  /*filterModel={{items: [
                                {columnField:'fecha', operatorValue:'is',value:defaultDate},
                            ],}}*//>
            </div>
        )

    //Devolvemos la tabla y la ventana modal (oculta)
}