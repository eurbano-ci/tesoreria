import React,{useEffect,useState} from 'react';
import { XGrid } from '@material-ui/x-grid';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import Insertar from './NuevoProyecto';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const API_URL = 'http://192.168.4.246:3001/api/tciProyectos';

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

function IsDone (param){
    if (param.value===true)
        return (<DoneIcon style={{ color: green[500] }}/>);
    else
        return (<CloseIcon style={{ color: red[500] }}/>);
}

const columns = [
    { field: 'id', headerName: 'ID', type:'number', width: 70 },
    { field: 'no_proyecto', headerName: 'No. Proyecto', type:'string', width: 150, editable:true },
    { field: 'descripcion', headerName: 'Descripcion', type:'string', width: 300, editable:true },
    { field: 'cliente', headerName: 'Cliente', type:'string', width: 300, editable:true },
    { field: 'importe_total', headerName: 'Importe total', ...eurPrice, editable:true },
    { field: 'ampliacion', headerName: 'Ampliacion', ...eurPrice, editable:true },
    { field: 'fecha_final', headerName: 'Fecha final', type:'date', width: 150, editable:true },
    { field: 'comentarios', headerName: 'Comentarios', type:'string', width: 300, editable:true },
    { field: 'finalizado', headerName: 'Finalizado', type:'string', width: 150, editable:true },
    { field: 'localizacion', headerName: 'Localización', type:'string', width: 150, editable:true },
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

function EditToolbar(props){
    const [open,setOpen] = useState(false);
    const deleteClick = () => {                                                        
        for (var property in props.deleteItems) {
            var encodedValue = encodeURIComponent(props.deleteItems[property]);

        //const abortController = new AbortController();
        //const signal = abortController.signal;
        fetch(`${API_URL}/proyectos/${encodedValue}`,{
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
                <Button variant="contained" color="primary" onClick={handleClickOpen}>Insertar Proyecto</Button>
            </Grid>
            <Grid item xs>
            </Grid>
            <Grid item xs>
                <Button variant="contained" color="secondary" onClick={deleteClick}>Borrar</Button>
            </Grid>
        </Grid>
            
            <ModalInsert onClick={handleClickOpen} open={open} onClose={handleClose}>Insertar Proyecto</ModalInsert>
            
        </div>
    )
}

//Permite pasar una prop del XGrid a la barra EditToolbar
EditToolbar.propTypes = {
    deleteItems: PropTypes.any,
}
//Función para enviar los datos editados al al función de actualización de la API 
function EditarProyecto(props){
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

export default function ListaBancos(){ 
    const [error,setError] = useState(null);                //Guarda estado de errores
    const [isLoaded,setIsLoaded] = useState(false);         //Guarda estado de Cargando (true,false)
    const [items,setItems] = useState([]);                  //Guarda la lista de pagos
    const [deleteItems,setDeleteItems] = useState ([]);     //Guarda la lista de elementos a borrar
    columns[8].renderCell = (params) => <IsDone value={!!params.value}/>

    const options = {
        onCellEditCommit: (params) => {EditarProyecto(params)},
        onSelectionModelChange: (params)=>{
            setDeleteItems(params);
          }
    };

    useEffect(() => {
        fetch(`${API_URL}/proyectos`)
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
            <div style={{ height: 700, width: '100%' }}>
            <XGrid 
                rows={items} 
                columns={columns} 
                pageSize={30} 
                pagination={items}
                rowHeight={25}
                checkboxSelection 
                components={{Toolbar: EditToolbar,}} 
                componentsProps={{toolbar:{deleteItems}}} 
                {...options}
                />
        </div>
        );
    }
}