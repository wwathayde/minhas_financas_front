import React from "react";
import { Link } from "react-router-dom";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localStorageService";
import currencyFormatter from "currency-formatter"


class Home extends React.Component {
	state = {
		saldo: 0
	}

	constructor() {
		super()
		this.usuarioService = new UsuarioService()
	}

	componentDidMount() {
		const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

		this.usuarioService.saldoPorUsuario(usuarioLogado.id)
			.then(response => {
				this.setState({ saldo: response.data })
			}).catch(error => {
				console.log(error.response)
			})
	}

	render() {
		return (
			<div className="jumbotron">
				<h1 className="display-3">Bem vindo!</h1>
				<p className="lead">Esse é seu sistema de finanças.</p>
				<p className="lead">Seu saldo para o mês atual é de {currencyFormatter.format(this.state.saldo, {locale: 'pt-BR'})}</p>
				<hr className="my-4" />
				<p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
				<div className="lead d-flex justify-content-center">
					<Link to="/cadastro-usuario" className="btn btn-primary btn-lg" style={{ marginRight: "5px" }}>Cadastrar Usuário</Link>
					<Link to="/cadastro-lancamentos" className="btn btn-danger btn-lg">Cadastrar Lançamento</Link>
				</div>
			</div>
		);
	}
}

export default Home;