import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { Button } from '@material-ui/core';

const API_URL = 'http://192.168.4.246:3001/api/tciBancos';

export default class Insert extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: null, tipo: '', fecha:'', cantidad:0, lineaPoliza:0, nombreBanco:'', disponibilidad:'', localizacion:'' };
        this.handleClick= this.handleClick.bind(this);
    }

    handleChangeTipo = (e) =>{
        this.setState({tipo: e.target.value})
    }
    handleChangeFecha = (e) =>{
        this.setState({fecha: e.target.value})
    }
    handleChangeCantidad = (e) =>{
        this.setState({cantidad: e.target.value})
    }
    handleChangeLineaPoliza = (e) =>{
        this.setState({lineaPoliza: e.target.value})
    }
    handleChangenombreBanco = (e) =>{
        this.setState({nombreBanco: e.target.value})
    }
    handleChangeDisponibilidad = (e) =>{
        this.setState({disponibilidad: e.target.value})
    }
    handleChangeLocalizacion = (e) =>{
        this.setState({localizacion: e.target.value})
    }

    handleClick = () => {
        var formBody = [];                                                          //Se necesita formatear la lista para pasarla por el fetch
        for (var property in this.state) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(this.state[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(`${API_URL}/bancos`,{
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
  
    
    render(){
        return(
        <form noValidate autoComplete="off" >
            <div>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Tipo" variant="outlined" onChange={this.handleChangeTipo}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Fecha" type="date" InputLabelProps={{shrink: true}} variant="outlined" onChange={this.handleChangeFecha}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Cantidad" type='number' variant="outlined"  onChange={this.handleChangeCantidad}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Linea Poliza" type="number" variant="outlined" onChange={this.handleChangeLineaPoliza}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Nombre banco" variant="outlined" onChange={this.handleChangenombreBanco}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Disponibilidad" type="date" variant="outlined" InputLabelProps={{shrink: true}} onChange={this.handleChangeDisponibilidad}/>              
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