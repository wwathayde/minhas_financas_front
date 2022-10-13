import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/card";
import FormGroup from "../components/formGroup";
import SelectMenu from "../components/selectMenu";

class CadastroCategoria extends React.Component {

    state = {
        nome: "",
        descricao: ""
    }

    cadastrar = () => {
        console.log(this.state);
    }

    render() {
        const listaCategoriaPai = [
            { label: '-', value: 'nenhum', selected: 'selected'},
            { label: 'Carro', value: 'carro' },
            { label: 'Casa', value: 'casa' },
            { label: 'Educação', value: 'educacao' },
            { label: 'Lazer', value: 'lazer' }
        ]

        return (
            <Card title="Cadastro de Categoria">
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
                            <FormGroup htmlFor="inputCategoriaPai" label="Categoria pai:">
                                <SelectMenu lista={listaCategoriaPai} clazz="form-control" />
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

export default CadastroCategoria;
