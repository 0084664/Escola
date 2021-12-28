import React, { Component } from 'react';
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../template/Main';
const title = "Carômetro";

const urlAPI = "http://localhost:5000/api/aluno";
const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0,},
    lista: [],
    selectedValue: ""
}

/*const Alunos = [
    { 'id' : 1, 'ra': 11111, 'nome': 'André', 'codCurso': 19},
    { 'id' : 2, 'ra': 22222, 'nome': 'Amanda', 'codCurso': 28},
    { 'id' : 3, 'ra': 33333, 'nome': 'Pedro', 'codCurso': 39},
    { 'id' : 4, 'ra': 44444, 'nome': 'Alice', 'codCurso': 59},
];
*/

export default class CrudCarometro extends Component {

    state = { ...initialState }

    componentDidMount(){
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    limpar() {
        this.setState({ aluno: initialState.aluno});
    }

    getListaAtualizada(aluno, add = true){
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        if (add) lista.unshift(aluno);
        return lista;
    }

    carregar(){
        axios(urlAPI + "/" + this.state.selectedValue).then(resp => {
            this.setState({ lista: resp.data }) 
        })
        console.log(this.state.selectedValue)
    }

    handleDropdownChange(e) {
        this.setState({ selectedValue: e.target.value });
        console.log(this.state.selectedValue)
    }

    renderForm(){
        return(
            <div className = "exibe-container">
                <label> Curso: </label>
                <select 
                    type="text"
                    id="nomeCurso"
                    placeholder = "Selecione um curso"
                    className="form-input"
                    name="nomeCurso"
                    onChange={this.handleDropdownChange}
                >
                    <option> </option>
                    <option value="39">Desenvolvimento para internet</option>
                    <option value="19">Informática</option>
                    <option value="59">Desenvolvimento para internet</option>
                </select>
                <div>Valor : {this.state.selectedValue}</div>
                <button className="btnCarregar" onClick={e => this.carregar()}>
                    Carregar
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
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                            <th className="tabTituloFoto">Foto</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.lista.map( 
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                    <td><a href="/" className="logo">
                                        <img src={"https://i.pinimg.com/736x/59/74/d0/5974d04323d9efbaf170c72cfdb07b44.jpg"} alt="Logo"/></a>
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