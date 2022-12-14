import React from "react"
import currencyFormatter from "currency-formatter"

export default props => {
    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td className="text-center">{lancamento.categoria == 'Nenhuma' ? '' : lancamento.categoria}</td>
                <td className="text-center">{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td className="text-center">{lancamento.tipo}</td>
{/*                 <td className="text-center">{lancamento.data}</td>
                <td className="text-center">{lancamento.conta}</td>
                <td className="text-center">{lancamento.cartao}</td> */}
                <td className="text-center">{lancamento.mes}</td>
                <td className="text-center">{lancamento.status}</td>
                <td className="text-center">
                    <button type="button"
                        className="btn btn-success"
                        onClick={e => props.editarAction(lancamento)}
                        style={{ marginRight: "5px" }} >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={e => props.deletarAction(lancamento)}>
                        Deletar
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col" className="text-center">Descrição</th>
                    <th scope="col" className="text-center">Categoria</th>
                    <th scope="col" className="text-center">Valor</th>
                    <th scope="col" className="text-center">Tipo</th>
                    {/* <th scope="col" className="text-center">Data</th>
                    <th scope="col" className="text-center">Conta</th>
                    <th scope="col" className="text-center">Cartão</th> */}
                    <th scope="col" className="text-center">Mês</th>
                    <th scope="col" className="text-center">Status</th>
                    <th scope="col" className="text-center">Ações</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}