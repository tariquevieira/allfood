import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  useEffect(() => {
    http
      .get('restaurantes/')
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteParaExcluir: IRestaurante) => {
    http
      .delete<IRestaurante>(`restaurantes/${restauranteParaExcluir.id}/`)
      .then((response) => {
        const listaRestaurante = restaurantes.filter(
          (restaurante) => restaurante.id !== restauranteParaExcluir.id
        );
        setRestaurantes([...listaRestaurante]);
      });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [{' '}
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>{' '}
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  {' Excluir '}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
