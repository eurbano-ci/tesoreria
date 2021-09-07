import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { Button } from '@material-ui/core';

const API_URL = 'http://192.168.4.246:3001/api/tciProyectos';

export default class Insert extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: null, nproyecto: '', descripcion:'', cliente:'', importe:0, ampliacion:0, fecha:'', comentarios:'', finalizado:false, localizacion:'' };
        this.handleClick= this.handleClick.bind(this);
    }

    handleChangeNoProyecto = (e) =>{
        this.setState({nproyecto: e.target.value})
    }
    handleChangeDescripcion = (e) =>{
        this.setState({descripcion: e.target.value})
    }
    handleChangeCliente = (e) =>{
        this.setState({cliente: e.target.value})
    }
    handleChangeImporteTotal = (e) =>{
        this.setState({importe: e.target.value})
    }
    handleChangeAmpliacion = (e) =>{
        this.setState({ampliacion: e.target.value})
    }
    handleChangeFechaFinal = (e) =>{
        this.setState({fecha: e.target.value})
    }
    handleChangeComentarios = (e) =>{
        this.setState({comentarios: e.target.value})
    }
    handleChangeFinalizado= (e) =>{
        this.setState({finalizado: e.target.value})
    }
    handleChangeLocalizacion = (e) =>{
        this.setState({localizacion: e.target.value})
    }

    handleClick = () => {
        //const data ={'id':'' ,'field':'asd','value':'jhha'};       //Guardo los datos en un array para pasarlos
        var formBody = [];                                                          //Se necesita formatear la lista para pasarla por el fetch
        for (var property in this.state) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(this.state[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
console.log(formBody);
        fetch(`${API_URL}/proyectos`,{
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
                <TextField style={{margin:'10px'}} id="outlined-basic" label="No. Proyecto" variant="outlined" onChange={this.handleChangeNoProyecto}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Descripcion" variant="outlined" onChange={this.handleChangeDescripcion}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Cliente" variant="outlined" onChange={this.handleChangeCliente}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Importe" type="number" variant="outlined" onChange={this.handleChangeImporteTotal}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Ampliacion" type="number" variant="outlined" onChange={this.handleChangeAmpliacion}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Fecha final" type="date" InputLabelProps={{shrink: true}} variant="outlined" onChange={this.handleChangeFechaFinal}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Comentarios" variant="outlined" onChange={this.handleChangeComentarios}/>                
                <FormControl style={{margin:'10px', width:'120px'}}  variant="outlined" width="250">
                    <InputLabel id="finalizado">Finalizado</InputLabel>
                    <Select labelId="pg-finalizado" id="pg_finalizado" label="Finalizado" onChange={this.handleChangeFinalizado}>
                        <MenuItem value={true}>Abierto</MenuItem>
                        <MenuItem value={false}>Cerrado</MenuItem>
                    </Select>
                </FormControl>
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