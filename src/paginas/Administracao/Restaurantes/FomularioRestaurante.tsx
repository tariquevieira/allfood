import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const FormularioRestaurante = () => {
  const [nomeRestaurante, setRestaurante] = useState('');
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios
      .post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante,
      })
      .then((response) => {
        alert('Restaurante cadastrado com sucesso');
      });
  };
  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={(evento) => setRestaurante(evento.target.value)}
        id="nome"
        label="nome"
        variant="standard"
      ></TextField>
      <Button type="submit" variant="outlined">
        Enviar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
