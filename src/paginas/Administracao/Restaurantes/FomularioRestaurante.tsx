import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {
  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      console.log(parametros.id);
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`
        )
        .then((response) => setRestaurante(response.data.nome));
    }
  }, [parametros]);
  const [nomeRestaurante, setRestaurante] = useState('');
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then((response) => {
          alert('Restaurante atualizado com sucesso');
        });
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then((response) => {
          alert('Restaurante cadastrado com sucesso');
        });
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(evento) => setRestaurante(evento.target.value)}
          id="nome"
          label="nome"
          variant="standard"
          fullWidth
          required
          sx={{ marginTop: 2 }}
        ></TextField>
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
