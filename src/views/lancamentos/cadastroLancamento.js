import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import Checkbox from "../../components/checkbox";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";
import LancamentoService from "../../app/service/lancamentoService";
import UsuarioService from "../../app/service/usuarioService";
import LocalStorageServive from "../../app/service/localStorageService"
import * as messages from "../../components/toastr"
import { navigate } from "../../main/navigate";

class CadastroLancamento extends React.Component {

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
        this.usuarioService = new UsuarioService()
    }

    componentDidMount() {
        const params = this.props.params
        this.preencherCampos(params.id)
    }

    state = {
        descricao: "",
        dataVencimento: null,
        dataFechamento: null,
        limite: "0,00",
        usuarioId: '',
        mes: '',
        ano: '',
        tipo: '',
        conta: '',
        descricao: '',
        status: '',
        valor: '',
        lancamentoId: null,
        showConfirmDialog: false,
        lancamentoDelecao: {},
        lancamentos: []
    }

    salvar = () => {
        const lancamento = {
            id: this.state.lancamentoId,
            mes: this.state.mes,
            ano: this.state.ano,
            tipo: this.state.tipo,
            conta: this.state.conta,
            descricao: this.state.descricao,
            status: this.state.status,
            valor: this.state.valor,
            usuarioId: this.state.usuarioId
        }

        if (lancamento.id) {
            this.lancamentoService
                .atualizar(lancamento)
                .then(response => {
                    messages.mensagemSucesso('Lançamento atualizado com sucesso!')
                    this.props.navigate('/consulta-lancamentos')
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        } else {
            this.lancamentoService
                .salvar(lancamento)
                .then(response => {
                    messages.mensagemSucesso('Lançamento salvo com sucesso!')
                    this.props.navigate('/consulta-lancamentos')
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }

    }

    preencherCampos = (id) => {
        if (id) {
            this.lancamentoService
                .consultarPorId(id)
                .then(response => {
                    this.setState({
                        descricao: response.data.descricao,
                        mes: response.data.mes,
                        ano: response.data.ano,
                        valor: response.data.valor,
                        tipo: response.data.tipo,
                        usuarioId: response.data.usuarioId,
                        status: response.data.status,
                        lancamentoId: id
                    })
                }).catch(error => {
                    messages.mensagemErro('Erro ao importar lançamento!')
                    this.props.navigate('/consulta-lancamentos')
                })
        } else {
            const now = new Date()
            const primeiroDiaMes = new Date(now.getFullYear(), now.getMonth(), 1)
            const ultimoDiaMes = new Date(now.getFullYear(), now.getMonth() + 1, 0)

            const usuarioLogado = LocalStorageServive.obterItem('_usuario_logado')
            this.setState({
                mes: now.getMonth() + 1,
                ano: now.getFullYear(),
                usuarioId: usuarioLogado.id,
                status: 'PENDENTE',
                tipo: 'DESPESA'
            })
        }

    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    render() {
        const listaMeses = this.lancamentoService.obterMeses()
        const listaTipos = this.lancamentoService.obterTipos()
        const listaContas = this.lancamentoService.obterContas()
        const listaCartao = this.usuarioService.obterCartoes()
        const listaFrequencia = this.lancamentoService.obterFrequencia()
        const listaStatus = this.lancamentoService.obterStatus()
        const recorrente = false


        return (
            <Card title="Cadastro de lançamento">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            {/* <FormGroup htmlFor="inputNome" label="Nome: *">
                                <input type="text"
                                    value={this.state.nome}
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    className="form-control"
                                    id="inputNome"
                                    name="nome"
                                    placeholder="Digite o Nome" />
                            </FormGroup> */}
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text"
                                    value={this.state.descricao}
                                    name='descricao'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="inputDescricao"
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                            <div className="d-flex justify-content-around mt-3" >
                                <FormGroup htmlFor="inputTipoLancamento" label="Tipo lançamento: *">
                                    <SelectMenu lista={listaTipos}
                                        value={this.state.tipo}
                                        name='tipo'
                                        onChange={this.handleChange}
                                        clazz="form-control" />
                                </FormGroup>
                                {/* <FormGroup htmlFor="inputConta" label="Conta: *">
                                    <SelectMenu lista={listaConta} clazz="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputCartao" label="Cartão:">
                                    <SelectMenu lista={listaCartao} clazz="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputDataVencimento" label="Data de vencimento: *">
                                    <input type="date"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        className="form-control"
                                        id="inputDataVencimento" />
                                </FormGroup> */}
                                <FormGroup htmlFor="inputAno" label="Ano: *">
                                    <input type="text"
                                        value={this.state.ano}
                                        name='ano'
                                        onChange={this.handleChange}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputMes" label="Mês:*">
                                    <SelectMenu lista={listaMeses}
                                        value={this.state.mes}
                                        name='mes'
                                        onChange={this.handleChange}
                                        clazz="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputValor" label="Valor:*">
                                    <input type="text"
                                        pattern="[0-9]*"
                                        value={this.state.valor}
                                        name='valor'
                                        onChange={this.handleChange}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputStatus" label="Status: *">
                                    <SelectMenu lista={listaStatus}
                                        value={this.state.status}
                                        name='status'
                                        onChange={this.handleChange}
                                        clazz="form-control" />
                                </FormGroup>
                            </div>
                            {/* <div className="d-flex justify-content-around mt-3" >
                                <Checkbox lista={listaRecorrencia} />
                                <FormGroup htmlFor="inputRecorrencia" label="Recorrência:">
                                    <SelectMenu lista={listaFrequencia} clazz="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputDataFinal" label="Data de término:">
                                    <input type="date"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        className="form-control"
                                        id="inputDataFinal" />
                                </FormGroup>
                            </div> */}
                            <div className="d-flex justify-content-center mt-3" >
                                <button onClick={this.salvar} type="button" className="btn btn-success" style={{ marginRight: "30px" }} >Salvar</button>
                                <Link to="/consulta-lancamentos" className="btn btn-danger" >Cancelar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default navigate(CadastroLancamento)
