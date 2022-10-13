import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/card"
import FormGroup from "../components/formGroup";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localStorageService";
import { mensagemErro } from "../components/toastr"
import { navigate } from "../main/navigate";


class Login extends React.Component {

    state = {
        email: "",
        senha: "",
        msgError: null
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    entrar = () => {
        this.service.autenticar({
                email: this.state.email,
                senha: this.state.senha
            }).then(response => {
                LocalStorageService.adicionarItem('_usuario_logado',response.data)
                this.props.navigate('/')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login" >
                            <div className="row">
                                <span>{this.state.msgError}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup htmlFor="exampleInputEmail1" label="Email: *">
                                                <input type="email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup htmlFor="exampleInputPassword1" label="Senha: *">
                                                <input type="password"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <div className="d-flex justify-content-center mt-3" >
                                                <button onClick={this.entrar} className="btn btn-success" style={{ marginRight: "30px" }}  >Entrar</button>
                                                <Link to="/cadastro-usuario" className="btn btn-danger">Cadastrar</Link>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default navigate(Login)