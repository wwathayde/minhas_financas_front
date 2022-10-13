import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import FormGroup from "../components/formGroup";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localStorageService";
import { mensagemErro, mensagemSucesso } from "../components/toastr"

class CadastroUsuario extends React.Component {

    state = {
        nome: "",
        email: "",
        senha: "",
        senhaRepeticao: ""
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService()
    }

    validar() {
        const mensagens = []

        if (!this.state.nome) {
            mensagens.push('O campo NOME é obrigatório!')
        }

        if (!this.state.email) {
            mensagens.push('O campo E-MAIL é obrigatório!')
        } else if (!this.state.email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]/)) {
            mensagens.push('Informe um E-MAIL válido!')
        }

        if (!this.state.senha) {
            mensagens.push('O campo SENHA é obrigatório!')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            mensagens.push('Os campos SENHA e REPITA A SENHA devem ser iguais!')
        }

        return mensagens
    }

    cadastrar = () => {
        const mensagensValidacao = this.validar();

        if (mensagensValidacao && mensagensValidacao.length > 0) {
            mensagensValidacao.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        this.usuarioService.salvar(usuario)
            .then(response => {
                LocalStorageService.adicionarItem('_usuario_logado', response.data)
                mensagemSucesso('Usuário criado com sucesso!')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    render() {
        return (
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label="Nome: *">
                                <input type="text"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    id="inputNome"
                                    name="nome"
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                            <FormGroup htmlFor="inputEmail" label="Email: *">
                                <input type="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Digite o Email" />
                            </FormGroup>
                            <FormGroup htmlFor="inputSenha" label="Senha: *">
                                <input type="password"
                                    value={this.state.senha}
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    className="form-control"
                                    id="inputSenha"
                                    placeholder="Password" />
                            </FormGroup>
                            <FormGroup htmlFor="inputSenhaRepeticao" label="Repita a senha: *">
                                <input type="password"
                                    value={this.state.senhaRepeticao}
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                    className="form-control"
                                    id="inputSenhaRepeticao"
                                    placeholder="Password" />
                            </FormGroup>
                            <div className="d-flex justify-content-center mt-3" >
                                <button onClick={this.cadastrar} type="button" className="btn btn-success" style={{ marginRight: "30px" }} >Salvar</button>
                                <Link to="/consulta-lancamentos" ><button onClick={this.cadastrar} type="button" className="btn btn-success" style={{ marginRight: "30px" }} >Salvar</button></Link>
                                <Link to="/consulta-lancamentos" ><button type="button" className="btn btn-danger">Cancelar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default CadastroUsuario;
