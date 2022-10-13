import ApiService from "../apiservice";

export default class lancamentoService extends ApiService {
    constructor() {
        super('/api/lancamentos')
    }

    obterMeses() {
        return [
            { label: 'Selecione', value: '' },
            { label: 'Janeiro', value: '1' },
            { label: 'Fevereiro', value: '2' },
            { label: 'Março', value: '3' },
            { label: 'Abril', value: '4' },
            { label: 'Maio', value: '5' },
            { label: 'Junho', value: '6' },
            { label: 'Julho', value: '7' },
            { label: 'Agosto', value: '8' },
            { label: 'Setembro', value: '9' },
            { label: 'Outubro', value: '10' },
            { label: 'Novembro', value: '11' },
            { label: 'Dezembro', value: '12' }
        ]
    }

    obterContas() {
        return []
    }

    obterTipos() {
        return [
            { label: 'Selecione', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ]
    }

    consultar(lancamentoFiltro) {

        let params = `?ano=${lancamentoFiltro.ano}&usuario=${lancamentoFiltro.usuario}`

        if (lancamentoFiltro.mes) {
            params += `&mes=${lancamentoFiltro.mes}`
        }

        if (lancamentoFiltro.tipo) {
            params += `&tipo=${lancamentoFiltro.tipo}`
        }

        if (lancamentoFiltro.status) {
            params += `&status=${lancamentoFiltro.status}`
        }

        if (lancamentoFiltro.descricao) {
            params += `&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(params)
    }

    consultarPorId(id) {
        return this.get(`/${id}`)
    }

    obterFrequencia() {
        return [
            { label: 'Diário', value: 'diario' },
            { label: 'Semanal', value: 'semestral' },
            { label: 'Quinzenal', value: 'quinzenal' },
            { label: 'Mensal', value: 'mensal', selected: 'selected' },
            { label: 'Bimestral', value: 'bimestarl' },
            { label: 'Trimestral', value: 'trimestral' },
            { label: 'Semestral', value: 'semestral' },
            { label: 'Anual', value: 'anual' }
        ]
    }

    obterStatus() {
        return [
            { label: 'Selecione', value: '' },
            { label: 'Pago', value: 'PAGO' },
            { label: 'Pendente', value: 'PENDENTE' },
            { label: 'Recebido', value: 'RECEBIDO' }
        ]
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    salvar(lancamento) {
        lancamento.valor = lancamento.valor.toString().replace(',', '.')
        return this.post('/', lancamento)
    }

    atualizar(lancamento) {
        lancamento.valor = lancamento.valor.toString().replace(',', '.')
        return this.put(`/${lancamento.id}`, lancamento)
    }
}