import React from "react";

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario"

import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../views/home";
import CadastroConta from "../views/cadastroConta";
import CadastroCartao from "../views/cadastroCartao";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamento from "../views/lancamentos/cadastroLancamento";
import CadastroCategoria from "../views/cadastroCategoria";
import CadastroLimiteDespesa from "../views/CadastroLimiteDespesa";
import { RotaAutenticada } from "../components/rotaAutenticada";

function Rotas() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-usuario" element={<CadastroUsuario />} />

            <Route
                path="/"
                element={
                    <RotaAutenticada><Home /></RotaAutenticada>
                }
            />
            <Route
                path="/cadastro-conta"
                element={
                    <RotaAutenticada><CadastroConta /></RotaAutenticada>
                }
            />
            <Route
                path="/cadastro-cartao"
                element={
                    <RotaAutenticada><CadastroCartao /></RotaAutenticada>
                }
            />
            <Route
                path="/consulta-lancamentos"
                element={
                    <RotaAutenticada><ConsultaLancamentos /></RotaAutenticada>
                }
            />
            <Route
                path="/cadastro-lancamentos"
                element={
                    <RotaAutenticada><CadastroLancamento /></RotaAutenticada>
                }
            />
            <Route
                path="/cadastro-lancamentos/:id"
                element={
                    <RotaAutenticada><CadastroLancamento /></RotaAutenticada>
                }
            />
            <Route
                path="/cadastro-categoria"
                element={
                    <RotaAutenticada><CadastroCategoria /></RotaAutenticada>
                }
            />
            <Route
                path="/cadastro-limite-despesa"
                element={
                    <RotaAutenticada><CadastroLimiteDespesa /></RotaAutenticada>
                }
            />
        </Routes>
    );
}

export default Rotas;