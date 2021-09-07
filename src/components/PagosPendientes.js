import React,{useEffect,useState} from 'react';
import { XGrid } from '@material-ui/x-grid';
import {GridLinkOperator} from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Insertar from './NuevoPago';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const API_URL = 'http://192.168.4.246:3001/api/tciPagos';



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

function ModalInsert(props){
    const { onClose, open } = props;

    const handleClose = () => {
      onClose(false);
    };
    return(
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle> Nuevo registro </DialogTitle>
            <Insertar/>
        </Dialog>
    )
}
//
function EditToolbar(props){
    const [open,setOpen] = useState(false);
    const deleteClick = () => {                                                        
        for (var property in props.deleteItems) {
            var encodedValue = encodeURIComponent(props.deleteItems[property]);

        //const abortController = new AbortController();
        //const signal = abortController.signal;
        fetch(`${API_URL}/pago/${encodedValue}`,{
            //signal: signal,
            method: 'DELETE',
           /* mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            redirect: 'follow',*/
            //referrerPolicy: 'no-referrer',
            //body: formBody
            },[])

            console.log(props)
            }
        }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
      };
    return(
        <div>
        <Grid container spacing={3}>
            <Grid item xs>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Insertar Pago Pendiente</Button>
            </Grid>
            <Grid item xs>
            </Grid>
            <Grid item xs>
                <Button variant="contained" color="secondary" onClick={deleteClick}>Borrar</Button>
            </Grid>
        </Grid>
            
            <ModalInsert onClick={handleClickOpen} open={open} onClose={handleClose}>Insertar Pago Pendiente</ModalInsert>
            
        </div>
    )
}
//Permite pasar una prop del XGrid a la barra EditToolbar
EditToolbar.propTypes = {
    deleteItems: PropTypes.any,
}
//Función para enviar los datos editados al al función de actualización de la API 
function EditarPago(props){
    const data ={'id':props.id ,'field':props.field,'value':props.value};       //Guardo los datos en un array para pasarlos
    var formBody = [];                                                          //Se necesita formatear la lista para pasarla por el fetch
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
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

export default function ListaPago(){ 
    const [error,setError] = useState(null);                //Guarda estado de errores
    const [isLoaded,setIsLoaded] = useState(false);         //Guarda estado de Cargando (true,false)
    const [items,setItems] = useState([]);                  //Guarda la lista de pagos
    const [deleteItems,setDeleteItems] = useState ([]);     //Guarda la lista de elementos a borrar
    const called = React.useRef(0);
    const currentDate = new Date();
    const defaultDate = currentDate.toISOString().substr(0,10);
    const [filterModelState, setFilterModelState] = React.useState({
        items: [
            {id:1, columnField:'fecha', operatorValue:'is', value:defaultDate},
        ],
        linkOperator: GridLinkOperator.And,
      });

      const handleFilterChange = React.useCallback((model) => {
        called.current += 1;
        setFilterModelState(model);
      }, []);
    const options = {
        onCellEditCommit: (params) => {EditarPago(params)},
        onSelectionModelChange: (params)=>{
            setDeleteItems(params);
          }
    };

    useEffect(() => {
        fetch(`${API_URL}/pagopendiente`)
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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography >Lista de pagos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ height: 350, width: '100%' }}>
                        <XGrid 
                            rows={items} 
                            columns={columns} 
                            pageSize={15} 
                            pagination={items}
                            rowHeight={25}
                            checkboxSelection 
                            components={{Toolbar: EditToolbar,}} 
                            componentsProps={{toolbar:{deleteItems}}} 
                            {...options}
                            filterModel={filterModelState}
                            onFilterModelChange={handleFilterChange}
                            />
                    </div>
                </AccordionDetails>
            </Accordion>
        );
    }
}