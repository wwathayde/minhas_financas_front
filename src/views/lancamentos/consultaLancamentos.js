import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageServive from "../../app/service/localStorageService"
import * as messages from "../../components/toastr"
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { navigate } from "../../main/navigate";

class ConsultaLancamentos extends React.Component {

    constructor() {
        super()
        this.lancamentoService = new LancamentoService()
    }

    componentDidMount() {
        const now = new Date()
        const primeiroDiaMes = new Date(now.getFullYear(), now.getMonth(), 1)
        const ultimoDiaMes = new Date(now.getFullYear(), now.getMonth() + 1, 0)

        const usuarioLogado = LocalStorageServive.obterItem('_usuario_logado')

        this.setState({
            dataInicial: primeiroDiaMes.toISOString().split('T')[0],
            dataFinal: ultimoDiaMes.toISOString().split('T')[0],
            mes: now.getMonth() + 1,
            ano: now.getFullYear(),
            usuario: usuarioLogado.id
        },
            this.buscar
        )
    }

    state = {
        dataInicial: '',
        dataFinal: '',
        usuario: '',
        mes: '',
        ano: '',
        tipo: '',
        conta: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDelecao: {},
        lancamentos: []
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O campo ano é obrigatótio!')
            return false
        }

        const lancamentoFiltro = {
            mes: this.state.mes,
            ano: this.state.ano,
            tipo: this.state.tipo,
            conta: this.state.conta,
            descricao: this.state.descricao,
            usuario: this.state.usuario
        }

        this.lancamentoService
            .consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    editar = (lancamento) => {
        this.props.navigate(`/cadastro-lancamentos/${lancamento.id}`)
    }

    confirmaDelecao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDelecao: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, lancamentoDelecao: {} })
    }

    deletar = () => {
        this.lancamentoService
            .deletar(this.state.lancamentoDelecao.id)
            .then(response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(this.state.lancamentoDelecao)
                lancamentos.splice(index, 1)
                this.setState(lancamentos)
                this.setState({ showConfirmDialog: false, lancamentoDelecao: {} })
                messages.mensagemSucesso('Lançamento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    render() {
        const listaMeses = this.lancamentoService.obterMeses()
        const listaTipos = this.lancamentoService.obterTipos()
        const listaContas = this.lancamentoService.obterContas()

        const dialogFooter = (
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />
                <Button label="Deletar" icon="pi pi-check" onClick={this.deletar} />
            </div>
        );

        const myIcon = (
            <button className="p-dialog-titlebar-icon p-link">
                <span className="pi pi-search"></span>
            </button>
        )

        return (
            <Card title="Consulta lançamentos">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <div className="d-flex justify-content-around mt-3" >
                                {/*                                 <FormGroup htmlFor="inputDataInicial" label="Data inicial: *">
                                    <input type="date"
                                        value={this.state.dataInicial}
                                        onChange={e => this.setState({ dataInicial: e.target.value })}
                                        className="form-control"
                                        id="inputDataInicial" />
                                </FormGroup>
                                <FormGroup htmlFor="inputDataFinal" label="Data final: *">
                                    <input type="date"
                                        value={this.state.dataFinal}
                                        onChange={e => this.setState({ dataFinal: e.target.value })}
                                        className="form-control"
                                        id="inputDataFinal" />
                                </FormGroup> */}
                                <FormGroup htmlFor="inputAno" label="Ano: *">
                                    <input type="text"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ ano: e.target.value })}
                                        className="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputMes" label="Mês:">
                                    <SelectMenu lista={listaMeses}
                                        value={this.state.mes}
                                        onChange={e => this.setState({ mes: e.target.value })}
                                        clazz="form-control" />
                                </FormGroup>
                                <FormGroup htmlFor="inputDescricao" label="Descricao:">
                                    <input type="text"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({ descricao: e.target.value })}
                                        className="form-control" />
                                </FormGroup>
                                {/* <FormGroup htmlFor="inputConta" label="Conta: *">
                                    <SelectMenu lista={listaContas}
                                        value={this.state.conta}
                                        onChange={e => this.setState({ conta: e.target.value })}
                                        clazz="form-control" />
                                </FormGroup> */}
                                {/* <FormGroup htmlFor="inputTipoLancamento" label="Tipo lançamento:">
                                    <SelectMenu lista={listaTipos}
                                        value={this.state.tipo}
                                        onChange={e => this.setState({ tipo: e.target.value })}
                                        clazz="form-control" />
                                </FormGroup> */}
                            </div>
                            <div className="d-flex justify-content-center mt-3" >
                                <button onClick={this.buscar} type="button" className="btn btn-success" style={{ marginRight: "30px" }} >Buscar</button>
                                <Link to="/cadastro-lancamentos" className="btn btn-danger">Cadastrar</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
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
                        <p>Tem certeza que excluir esse lançamento?</p>
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default navigate(ConsultaLancamentos)