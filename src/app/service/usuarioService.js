import ApiService from "../apiservice";

class UsuarioService extends ApiService {
    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    saldoPorUsuario(id) {
        const now = new Date()
        const mes = now.getMonth() + 1
        const ano = now.getFullYear()
        return this.get(`/${id}/saldo/${ano}/${mes}`)
    }

    salvar(usuario) {
        return this.post('/', usuario)
    }

    obterCartoes() {
        return []
    }

}

export default UsuarioService;