import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/card";
import FormGroup from "../components/formGroup";

class CadastroCartao extends React.Component {

    state = {
        nome: "",
        descricao: "",
        dataVencimento: null,
        dataFechamento: null,
        limite: "0,00"
    }

    cadastrar = () => {
        console.log(this.state);
    }

    render() {
        return (
            <Card title="Cadastro de Cartão">
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
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    className="form-control"
                                    id="inputDescricao"
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                            <div className="d-flex justify-content-around mt-3" >
                                <FormGroup htmlFor="inputDataVencimento" label="Data de vencimento: *">
                                    <input type="date"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        className="form-control"
                                        id="inputDataVencimento" />
                                </FormGroup>
                                <FormGroup htmlFor="inputDataFechamento" label="Data de fechamento: *">
                                    <input type="date"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        className="form-control"
                                        id="inputDataFechamento" />
                                </FormGroup>
                                <FormGroup htmlFor="inputLimite" label="Limite do cartão:">
                                    <input type="text"
                                        pattern="[0-9]*"
                                        value={this.state.limite}
                                        onChange={e => this.setState({ limite: e.target.value })}
                                        className="form-control"
                                        id="inputLimite"
                                        placeholder="Digite o limite do cartão" />
                                </FormGroup>
                            </div>
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

export default CadastroCartao;
