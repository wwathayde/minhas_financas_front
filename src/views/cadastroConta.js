import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/card";
import FormGroup from "../components/formGroup";

class CadastroConta extends React.Component {

    state = {
        nome:"",
        descricao:"",
        saldoinicial:"0,00"
    }

    cadastrar = () => {
        console.log(this.state);
    }

    render(){
        return (
            <Card title="Cadastro de Conta">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputNome" label="Nome: *">
                                <input type="text"
                                    value={this.state.nome}
                                    onChange={e => this.setState({nome: e.target.value})}
                                    className="form-control"
                                    id="inputNome"
                                    name="nome"
                                    placeholder="Digite o Nome" />
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                    className="form-control"
                                    id="inputDescricao"
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputSaldo" label="Saldo inicial: *">
                                <input type="text"
                                    pattern="[0-9]*"
                                    value={this.state.saldoinicial}
                                    onChange={e => this.setState({saldoinicial: e.target.value})}
                                    className="form-control"
                                    id="inputSaldo"
                                    placeholder="Saldo inicial" />
                            </FormGroup>
                            <div className="d-flex justify-content-center mt-3" >
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

export default CadastroConta;
