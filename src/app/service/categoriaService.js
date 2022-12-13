import ApiService from "../apiservice";

class CategoriaService extends ApiService {
    constructor() {
        super('/api/categorias')
    }

    obterCategorias() {
        return this.get('/')
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    salvar(categoria) {
        return this.post('/', categoria)
    }

    atualizar(categoria) {
        return this.put(`/${categoria.id}`, categoria)
    }

}

export default CategoriaService;