import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { Button } from '@material-ui/core';

const API_URL = 'http://192.168.4.246:3001/api/tciCobros';

export default class Insert extends React.Component{
    constructor(props) {
        super(props);
        this.state = { id: null, tipo: '', estado_pago:'', cantidad:0, vencimiento:'', cliente:'', fecha_factura:'', base:0, iva_ipsi:0, tipo_cobro:'',importe_impuesto:0, retencion:0, porcentaje_retencion:0, porcentaje_impuesto:0, concepto:'', no_proyecto:'',localizacion:'' };
        this.handleClick= this.handleClick.bind(this);
    }

    handleChangeTipo = (e) =>{
        this.setState({tipo: e.target.value})
    }
    handleChangeEstadoPago = (e) =>{
        this.setState({estado_pago: e.target.value})
    }
    handleChangeCantidad = (e) =>{
        this.setState({cantidad: e.target.value})
    }
    handleChangeVencimiento = (e) =>{
        this.setState({vencimiento: e.target.value})
    }
    handleChangeCliente = (e) =>{
        this.setState({cliente: e.target.value})
    }
    handleChangeFechaFactura = (e) =>{
        this.setState({fecha_factura: e.target.value})
    }
    handleChangeBase = (e) =>{
        this.setState({base: e.target.value})
    }
    handleChangeIvaIpsi = (e) =>{
        this.setState({iva_ipsi: e.target.value})
    }
    handleChangeTipoCobro = (e) =>{
        this.setState({tipo_cobro: e.target.value})
    }
    handleChangeImporteImpuesto = (e) =>{
        this.setState({importe_impuesto: e.target.value})
    }
    handleChangeRetencion = (e) =>{
        this.setState({retencion: e.target.value})
    }
    handleChangePorcentajeImpuesto = (e) =>{
        this.setState({porcentaje_impuesto: e.target.value})
    }
    handleChangePorcentajeRetencion = (e) =>{
        this.setState({porcentaje_retencion: e.target.value})
    }
    handleChangeConcepto = (e) =>{
        this.setState({concepto: e.target.value})
    }
    handleChangeNoProyecto = (e) =>{
        this.setState({no_proyecto: e.target.value})
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
        fetch(`${API_URL}/cobros`,{
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
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Estado Pago" variant="outlined" onChange={this.handleChangeEstadoPago}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Cantidad" type='number' variant="outlined"  onChange={this.handleChangeCantidad}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Vencimiento" type="date" InputLabelProps={{shrink: true}} variant="outlined" onChange={this.handleChangeVencimiento}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Cliente" variant="outlined" onChange={this.handleChangeCliente}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Fecha Factura" type="date" InputLabelProps={{shrink: true}} variant="outlined" onChange={this.handleChangeFechaFactura}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Base" type="number" variant="outlined" onChange={this.handleChangeBase}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="IVA IPSI" type="number" variant="outlined" onChange={this.handleChangeIvaIpsi}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Tipo cobro" variant="outlined" onChange={this.handleChangeTipoCobro}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Importe impuesto" type="number" variant="outlined" onChange={this.handleChangeImporteImpuesto}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Retención" type="number" variant="outlined" onChange={this.handleChangeRetencion}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Porcentaje Impuesto" type="number" variant="outlined" onChange={this.handleChangePorcentajeImpuesto}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Porcentaje Retención" type="number" variant="outlined" onChange={this.handleChangePorcentajeRetencion}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="Concepto" variant="outlined" onChange={this.handleChangeConcepto}/>
                <TextField style={{margin:'10px'}} id="outlined-basic" label="No. Proyecto" variant="outlined" onChange={this.handleChangeNoProyecto}/>
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