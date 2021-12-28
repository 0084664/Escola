import React, { Component } from 'react';
import axios from 'axios';
import './CrudCurso.css';
import Main from '../template/Main';

const title = "Cadastro de Cursos";
const urlAPI = "http://localhost:5000/api/curso";
const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: ''},
    lista: []
}
/*
const Cursos = [
    { 'id': 1, 'codCurso': 19, 'NomeCurso': 'Infomática', 'Periodo': 'M' },
    { 'id': 2, 'codCurso': 39, 'NomeCurso': 'Desenvolvimento para Internet', 'Periodo': 'V' },
    { 'id': 3, 'codCurso': 59, 'NomeCurso': 'Desenvolvimento para Internet', 'Periodo': 'N' },
   ];
*/

export default class CrudCurso extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar(){
        this.setState( {curso: initialState.curso})
    }

    salvar(){
        const curso = this.state.curso;
        curso.codCurso = Number(curso.codCurso);
        const metodo = curso.id ? 'put' : 'post';
        const url = curso.id ? `${urlAPI}/${curso.id}` : urlAPI;
    
        axios[metodo](urlAPI, curso)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ curso: initialState.curso, lista})
            })
    }

    getListaAtualizada(curso, add = true) {
        const lista = this.state.lista.filter(a => a.id !== curso.id);
        if(add) lista.unshift(curso);
        return lista;
    }

    atualizaCampo(event){
        const curso = { ...this.state.curso };
        curso[event.target.name] = event.target.value;
        
        this.setState({curso});
    }
    
    carregar(curso){
        this.setState({curso});
    }

    remover(curso) {
        const url = urlAPI + "/" + curso.id;
        if(window.confirm("Confirmar remoção do curso: " + curso.codCurso)) {
            console.log("Entrou no confirm");

            axios['delete'](url, curso)
                .then(resp => {
                    const lista = this.getListaAtualizada(curso, false)
                    this.setState({curso: initialState.curso, lista})
                })
        }
    }

    renderForm(){
        return(
            <div className="inclui-container">
                <label> Código: </label>
                <input 
                    type="number"
                    id="codCurso"
                    placeholder="codigo do curso"
                    className="form-input"
                    name="codCurso"
                    value={this.state.curso.codCurso}
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Nome: </label>
                <input 
                    type="text"
                    id="NomeCurso"
                    placeholder="Nome do curso"
                    className="form-input"
                    name="NomeCurso"
                    value={this.state.curso.nomeCurso}
                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Período: </label>
                <input 
                    type="text"
                    id="Periodo"
                    placeholder="Período do curso"
                    className="form-input"
                    name="Periodo"
                    value={this.state.curso.periodo}
                    onChange={e => this.atualizaCampo(e)}
                />

                <button className="btnSalvar" onClick={e => this.salvar(e)}>
                    Salvar
                </button>

                <button className="btnCancelar" onClick={e => this.limpar(e)}>
                    Cancelar
                </button>
            </div>
        )
    }

        renderTable() {
            return (
                <div className="listagem">
                    <table className="listaCurso" id="tblListaCurso">
                        <thead>
                            <tr className="cabecTabela">
                                <th className="tabTituloCodigo">Codigo</th>
                                <th className="tabTituloNome">Nome</th>
                                <th className="tabTituloPeriodo">Período</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
   
                        <tbody>
                        {this.state.lista.map( 
                                (curso) => 
                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => this.carregar(curso)}>
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(curso)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    </table>
                </div>
            )
        }
    render() {
        return (
            <Main title={title}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}