import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
//import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const API_URL = 'http://192.168.4.246:3001/api/tciPagos';

/*const useStyle = makeStyles(
    {
        modal:{
            float:'left'
        },
        formControl:{
            margin:'10px', 
            width:'150px',
        },
        boton:{
            margin:'10px', 
            float:'right'
        }
    }
)*/

export default class Insert extends React.Component{
    constructor(props) {
        super(props);
        const currentDate = new Date();
        const defaultDate = currentDate.toISOString().substr(0,10);
        this.state = {tipo: '', concepto:'', estadopagos:'', cantidad:'', fecha:defaultDate, localizacion:'', tipoPago:'Puntual', periodo:0,  id: null };
        this.handleClick= this.handleClick.bind(this);
    }

    handleChangeTipo = (e) =>{
        this.setState({tipo: e.target.value})
    }
    handleChangeConcepto = (e) =>{
        this.setState({concepto: e.target.value})
    }
    handleChangeEstado = (e) =>{
        this.setState({estadopagos: e.target.value})
    }
    handleChangeCantidad = (e) =>{
        this.setState({cantidad: e.target.value})
    }
    handleChangeFecha = (e) =>{
        this.setState({fecha: e.target.value})
    }
    handleChangeLocalizacion = (e) =>{
        this.setState({localizacion: e.target.value})
    }
    handleChangeTipoPago = (e) =>{
        this.setState({tipoPago: e.target.value})
    }
    handleChangePerioricidad = (e) =>{
        this.setState({periodo: e.target.value})
    }

    handleClick = () => {
        //const data ={'id':'' ,'field':'asd','value':'jhha'};       //Guardo los datos en un array para pasarlos
        let i=0;
        let j = this.state.periodo;
        for(i;i<j;i++){
            var formBody = [];                                                          //Se necesita formatear la lista para pasarla por el fetch
            for (var property in this.state) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(this.state[property]);
                if (encodedKey === 'periodo'){
                    encodedValue = i;
                }
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        console.log(`Vuelta ${i}: ${formBody}`);
        //const abortController = new AbortController();
        //const signal = abortController.signal;
            fetch(`${API_URL}/pago`,{
                //signal: signal,
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                redirect: 'follow',
                //referrerPolicy: 'no-referrer',
                body: formBody
            },[])
        }
        
    }
  
    
    render(){
        return(
        <form noValidate autoComplete="off" >
            <div>
            <FormControl style={{margin:'10px', width:'90px'}}  variant="outlined">
                <InputLabel id="tipo-pagos">Tipo</InputLabel>
                <Select labelId="tipo-pagos" id="pg_tipo" label="Tipo" onChange={this.handleChangeTipo}>
                    <MenuItem value={'P-T'}>P-T</MenuItem>
                    <MenuItem value={'D-C'}>D-C</MenuItem>
                    <MenuItem value={'D-TARJ'}>D-TARJ</MenuItem>
                    <MenuItem value={'I-IAE'}>I-IAE</MenuItem>
                    <MenuItem value={'I-IBI'}>I-IBI</MenuItem>
                    <MenuItem value={'I-IPSI'}>I-IPSI</MenuItem>
                    <MenuItem value={'I-IRPF'}>I-IRPF</MenuItem>
                    <MenuItem value={'I-IS'}>I-IS</MenuItem>
                    <MenuItem value={'I-IVA'}>I-IVA</MenuItem>
                    <MenuItem value={'I-OTROS'}>I-OTROS</MenuItem>
                    <MenuItem value={'P'}>P</MenuItem>
                    <MenuItem value={'P-C'}>P-C</MenuItem>
                    <MenuItem value={'P-D'}>P-D</MenuItem>
                    <MenuItem value={'PP-H'}>PP-H</MenuItem>
                    <MenuItem value={'PP-L'}>PP-L</MenuItem>
                    <MenuItem value={'PP-P'}>PP-P</MenuItem>
                    <MenuItem value={'P-T'}>P-T</MenuItem>
                    <MenuItem value={'S-N'}>S-N</MenuItem>
                    <MenuItem value={'S-SS'}>S-SS</MenuItem>
                </Select>
            </FormControl>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Concepto" variant="outlined" onChange={this.handleChangeConcepto}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Estado pago" variant="outlined" onChange={this.handleChangeEstado}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Cantidad" type="number" variant="outlined" onChange={this.handleChangeCantidad}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Fecha" type="date" variant="outlined" InputLabelProps={{shrink: true}} onChange={this.handleChangeFecha}/>
                <FormControl style={{margin:'10px', width:'120px'}} variant="outlined" width="220">
                    <InputLabel id="tipoPago">Tipo pago</InputLabel>
                    <Select labelId="pg-tipoPago" id="pg_tipoPago" label="Tipo Pago" defaultValue={'Puntual'} onChange={this.handleChangeTipoPago}>
                        <MenuItem value={'day'}>Puntual</MenuItem>
                        <MenuItem value={'week'}>Semanal</MenuItem>
                        <MenuItem value={'month'}>Mensual</MenuItem>
                        <MenuItem value={'year'}>Anual</MenuItem>
                    </Select>
                </FormControl>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Perioricidad" type="number" variant="outlined" onChange={this.handleChangePerioricidad}/>
                <FormControl style={{margin:'10px', width:'90px'}}  variant="outlined" width="220">
                    <InputLabel id="localizacion">Pais</InputLabel>
                    <Select labelId="pg-localizacion" id="pg_localizacion" label="Pais" onChange={this.handleChangeLocalizacion}>
                        <MenuItem value={'ESP'}>ESP</MenuItem>
                        <MenuItem value={'MAR'}>MAR</MenuItem>
                        <MenuItem value={'UK'}>UK</MenuItem>
                        <MenuItem value={'PRU'}>PRU</MenuItem>
                    </Select>
                </FormControl>
                <Button style={{margin:'20px'}} variant="contained" color="primary" onClick={this.handleClick}>ENVIAR</Button>
            </div>
        </form>
        )
    }
}