import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete"
import { Link, useNavigate } from "react-router-dom";


function listEvents() {
    const [events, setEvents] = useState([]);
    const [alert, setAlert] = useState({
      //visibilidade
      open: false,
      //nível do alerta (sucess, error, warning, etc)
      severity: "",
      message:""
    });
  
    //função para exibir o alerta 
    const showAlert = (severity, message) => {
      setAlert({open: true, severity, message})
    };
  
    //Fechar o alerta
    const handleCloseAlert = () => {
      setAlert({...alert, open: false})
    };
    const navigate = useNavigate();
    async function getUsers() {
      // Chamada da Api
      await api.getEvents().then(
        (response) => {
          console.log(response.data.events);
          setEvents(response.data.events);
        },
        (error) => {
          console.log("Erro ", error);
        }
      );
    }
  
    async function deleteEvent(id){
      try{
        await api.deleteEvent(id);
        await getEvents();
        showAlert("succes", "Evento apagado com sucesso");
      }catch(error){
        console.log("erro ao deletar evento", error);
        showAlert("error", "Erro ao encontrar evento");
      }
    }
  
    const listEvents = events.map((event) => {
      return (
        <TableRow key={event.id_evento}>
          <TableCell align="center">{user.nome}</TableCell>
          <TableCell align="center">{user.descricao}</TableCell>
          <TableCell align="center">{user.data_hora}</TableCell>
          <TableCell align="center">{user.local}</TableCell>
          <TableCell align="center">{user.data_hora}</TableCell>
  
          <TableCell align="center">
            <IconButton onClick={() => deleteEvent(event.id)}>
              <DeleteIcon color="error"/>
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });
  
    function logout(){
      localStorage.removeItem('authenticated')
      navigate("/")
    }
  
    useEffect(() => {
      // if(!localStorage.getItem('authenticated')){
      //   navigate("/")
      // }
      getUsers();
    }, []);
  
  
  
    return (
      <div>
        <Snackbar open={alert.open} autoHideDurantion={3000} onClose={handleCloseAlert} anchorOrigin={{vertical:"top", horizontal:"center"}}>
          <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{width: "100%"}}>
            {alert.message}
          </Alert>
        </Snackbar>
        {events.length === 0 ? (
          <p>Carregando Eventos</p>
        ) : (
          <div>
            <h5>Lista de eventos</h5>
            <TableContainer component={Paper} style={{ margin: "2px" }}>
              <Table size="small">
                <TableHead
                  style={{ backgroundColor: "red", borderStyle: "solid white" }}
                >
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Descricao</TableCell>
                    <TableCell align="center">Data_hora</TableCell>
                    <TableCell align="center">Local</TableCell>
                    <TableCell align="center">AÇÕES</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{listEvents}</TableBody>
              </Table>
            </TableContainer>
            <Button fullWidth variant="contained" onClick={logout}>
              SAIR
            </Button>
          </div>
        )}
      </div>
    );
  }
  export default listEvents;
  