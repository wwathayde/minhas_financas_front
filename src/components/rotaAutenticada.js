import { Navigate } from "react-router-dom";
import LocalStorageService from "../app/service/localStorageService";

export const RotaAutenticada = ({ children }) => {
  const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

  if (usuarioLogado && usuarioLogado.id) {
    return children;
  }
  return <Navigate to="/login" />;
};