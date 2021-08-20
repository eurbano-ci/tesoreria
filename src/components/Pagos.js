import React,{useEffect,useState} from 'react';
import { XGrid } from '@material-ui/x-grid';

const API_URL = 'http://localhost:3001/api/tciPagos';

const currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
});

const eurPrice = {
    type: 'number',
    width: 150,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    cellClassName: 'font-tabular-nums',
};

const columns = [
    { field: 'id', headerName: 'ID', type:'number', width: 70 },
    { field: 'tipo', headerName: 'Tipo', type:'string', width: 150, editable:true},
    { field: 'concepto', headerName: 'Concepto', type:'string', width: 300, editable:true},
    { field: 'estado_pagos', headerName: 'Estado Pago', type:'string', width: 150, editable:true},
    { field: 'cantidad', headerName: 'Cantidad', ...eurPrice, editable:true},
    { field: 'fecha', headerName: 'Fecha', type:'date', width: 150, editable:true},
    { field: 'localizacion', headerName: 'Localización', type:'string', width: 200, editable:true},
];

function EditarPago(props){
    const data ={'id':props.id ,'field':props.field,'value':props.value};
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`${API_URL}/pago`,{
        signal: signal,
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

        return(<p>Hola edicion</p>)
}

export default function ListaPago(){ 
    const [error,setError] = useState(null);
    const [isLoaded,setIsLoaded] = useState(false);
    const [items,setItems] = useState([]);   

    useEffect(() => {
        fetch(`${API_URL}/pago`)
        .then(res => res.json())
        .then ((result) => {
            setIsLoaded(true);
            setItems(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(true);
        }
        )
    },[])

    if(error){
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded){
        return <div>Cargando...</div>;
    } else {
        return(
            <div style={{ height: 400, width: '100%' }}>
                <XGrid rows={items} columns={columns} pageSize={5} checkboxSelection onCellEditCommit={EditarPago}/>
            </div>
            
        );
    }
}