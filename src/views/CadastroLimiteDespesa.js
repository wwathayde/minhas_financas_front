import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/card";
import Checkbox from "../components/checkbox";
import FormGroup from "../components/formGroup";
import SelectMenu from "../components/selectMenu";

class CadastroLimiteDespesa extends React.Component {

    state = {
        nome: "",
        descricao: "",
        limite: "0,00"
    }

    cadastrar = () => {
        console.log(this.state);
    }

    render() {
        const listaCategorias = [
            { label: 'Carro', value: 'carro' },
            { label: 'Casa', value: 'casa' },
            { label: 'Educação', value: 'educacao' },
            { label: 'Lazer', value: 'lazer' }
        ]

        const listaPeriodo = [
            { label: 'Diário', value: 'diario' },
            { label: 'Semanal', value: 'semestral' },
            { label: 'Quinzenal', value: 'quinzenal' },
            { label: 'Mensal', value: 'mensal', selected: 'selected' },
            { label: 'Bimestral', value: 'bimestarl' },
            { label: 'Trimestral', value: 'trimestral' },
            { label: 'Semestral', value: 'semestral' },
            { label: 'Anual', value: 'anual' }
        ];

        return (
            <Card title="Cadastro de Limite de Despesa">
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
                                <FormGroup htmlFor="inputCategoriaPai" label="Categorias a serem contabilizadas:">
                                    <Checkbox lista={listaCategorias} />
                                </FormGroup>
                                <FormGroup htmlFor="inputLimite" label="Limite da despesa:">
                                    <input type="text"
                                        pattern="[0-9]*"
                                        value={this.state.limite}
                                        onChange={e => this.setState({ limite: e.target.value })}
                                        className="form-control"
                                        id="inputLimite" />
                                </FormGroup>
                                <FormGroup htmlFor="inputPeriodo" label="Período: *">
                                    <SelectMenu lista={listaPeriodo} clazz="form-control" />
                                </FormGroup>
                            </div>
                            <div className="d-flex justify-content-center mt-3" >
                                <Link to="/consulta-lancamentos" ><button onClick={this.cadastrar} type="button" className="btn btn-success" style={{ marginRight: "30px" }} >Salvar</button></Link>
                                <Link to="/consulta-lancamentos" ><button type="button" className="btn btn-danger">Cancelar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card >
        );
    }
}

export default CadastroLimiteDespesa;
