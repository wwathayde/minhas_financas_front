import React from "react";
import { Link } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";

import * as messages from "../../components/toastr";
import CategoriaService from "../../app/service/categoriaService";
import CategoriasTable from "./categoriasTable";

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

class CadastroCategoria extends React.Component {

    constructor() {
        super()
        this.categoriaService = new CategoriaService();
    }

    componentDidMount() {
        this.buscarCategorias();
    }

    state = {
        nome: "",
        descricao: "",
        pai: "",
        categoriaId: "",
        categorias: [],
        showConfirmDialog: false,
        categoriaDelecao: {},
    }

    buscarCategorias() {
        this.categoriaService
            .obterCategorias()
            .then(response => {
                this.setState({
                    categorias: response.data.map(e => {return {'id':e.id, 'label':e.nome, 'value': e.nome, 'descricao': e.descricao, 'pai':e.pai}}),
                })
            }).catch(error => {
                messages.mensagemErro('Erro ao importar categorias!')
                this.props.navigate('/consulta-categorias')
            })
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    salvar = () => {
        const categoria = {
            id: this.state.categoriaId,
            nome: this.state.nome,
            descricao: this.state.descricao,
            pai: (this.state.pai == "Nenhuma") ? null : this.state.pai
        }

        if (categoria.id) {
            this.categoriaService
                .atualizar(categoria)
                .then(response => {
                    messages.mensagemSucesso('Categoria atualizada com sucesso!')
                    this.apagarCampos()
                    this.buscarCategorias()
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        } else {
            this.categoriaService
                .salvar(categoria)
                .then(response => {
                    messages.mensagemSucesso('Categoria salva com sucesso!')
                    this.apagarCampos()
                    this.buscarCategorias()
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }

    }

    editar = (categoria) => {
        this.setState({
            nome: categoria.label,
            descricao: categoria.descricao ?? "",
            pai: categoria.pai ?? "Nenhuma",
            categoriaId: categoria.id
        })
    }

    confirmaDelecao = (categoria) => {
        this.setState({ showConfirmDialog: true, categoriaDelecao: categoria })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, categoriaDelecao: {} })
    }

    apagarCampos = () => {
        this.setState({
            nome: "",
            descricao: "",
            pai: "",
            categoriaId: ""
        })
    }

    deletar = () => {
        this.categoriaService
            .deletar(this.state.categoriaDelecao.id)
            .then(response => {
                const categorias = this.state.categorias
                const index = categorias.indexOf(this.state.categoriaDelecao)
                categorias.splice(index, 1)
                this.setState(categorias)
                messages.mensagemSucesso('Categoria deletada com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        this.setState({ showConfirmDialog: false, categoriaDelecao: {} })
    }

    render() {
        const dialogFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />
                <Button label="Deletar" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );
        //console.log(this.state.categorias)
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
                            <FormGroup htmlFor="inputDescricao" label="Descrição:">
                                <input type="text"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    className="form-control"
                                    id="inputDescricao"
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputCategoriaPai" label="Categoria pai:">
                                <SelectMenu lista={this.state.categorias}
                                        value={this.state.pai}
                                        name='pai'
                                        onChange={this.handleChange}
                                        clazz="form-control" />
                            </FormGroup>
                            <div className="d-flex justify-content-center mt-3" >
                                <Link to="/cadastro-categoria" ><button onClick={this.salvar} type="button" className="btn btn-success" style={{ marginRight: "30px" }} >Salvar</button></Link>
                                <Link to="/cadastro-categoria" ><button onClick={this.apagarCampos} type="button" className="btn btn-danger">Cancelar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <CategoriasTable categorias={this.state.categorias}
                                deletarAction={this.confirmaDelecao}
                                editarAction={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Header"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={dialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })} >
                        <p>Tem certeza que excluir essa categoria?</p>
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default CadastroCategoria;
