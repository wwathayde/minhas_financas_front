import React from "react";
import { Link } from "react-router-dom";
import NavbarItem from "./navbarItem";
import LocalStorageService from "../app/service/localStorageService"
import { navigate } from "../main/navigate";

const deslogar = () => {
    LocalStorageService.removerItem('_usuario_logado')
    navigate('/login')
}

const usuarioAutenticado = () => {
    const usuario = LocalStorageService.obterItem('_usuario_logado')
    if (usuario && usuario.id) {
        return true
    }
    return false
}

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <Link to="/" className="navbar-brand">Minhas Finanças</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={usuarioAutenticado()} href="/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem render={usuarioAutenticado()} onClick={deslogar} href="/login" label="Sair" />
                        {/* <NavbarItem href="/cadastro-categoria" label="Categoria" />
                        <NavbarItem href="/cadastro-limite-despesa" label="Limite despesa" />
                        <NavbarItem href="/cadastro-conta" label="Conta" />
                        <NavbarItem href="/cadastro-cartao" label="Cartão" /> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default navigate(Navbar);
