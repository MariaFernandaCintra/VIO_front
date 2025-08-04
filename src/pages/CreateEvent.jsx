import { useState } from "react";
import sheets from "../axios/axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function CreateEvent() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    data_hora: "",
    local: "",
    fk_id_organizador: 1,
  });
  const [imagem, setImagem] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sheets.createEvento(form, imagem);
      alert("Evento criado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar evento");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffe5e5", // fundo rosado
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "#a00000", mb: 3, fontWeight: "bold" }}
      >
        Criar Evento
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}
      >
        <TextField
          fullWidth
          name="nome"
          label="Nome"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="descricao"
          label="Descrição"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="data_hora"
          label="Data e hora"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          name="local"
          label="Local"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mb: 2,
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Criar Evento
        </Button>
      </form>

      <Box textAlign="center" mt={2}>
        <Link
          to="/events"
          style={{
            color: "#a00000",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Listar Eventos
        </Link>
      </Box>
    </Box>
  );
}

export default CreateEvent;
