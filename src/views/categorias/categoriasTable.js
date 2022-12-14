import React from "react"

export default props => {
    const rows = props.categorias.filter(e => e.value != "Nenhuma").map(categoria => {
        return (
            <tr key={categoria.value}>
                <td className="text-center">{categoria.label}</td>
                <td className="text-center">{categoria.descricao}</td>
                <td className="text-center">{categoria.pai}</td>
                <td className="text-center">
                    <button type="button"
                        className="btn btn-success"
                        onClick={e => props.editarAction(categoria)}
                        style={{ marginRight: "5px" }} >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={e => props.deletarAction(categoria)}>
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
                    <th scope="col" className="text-center">Nome</th>
                    <th scope="col" className="text-center">Descrição</th>
                    <th scope="col" className="text-center">Categoria pai</th>
                    <th scope="col" className="text-center">Ações</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}