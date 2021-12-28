import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { login } from "../../services/auth";
import api from "../../services/api";

const url = "http://localhost:5000/api/home/login/";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [erro, setErro] = useState("");

    async function handleSubmit(evento) {
        evento.preventDefault();
        const userForm = { email, senha };

        console.log(userForm);
        if(!email || !senha){
          setErro("Preencha username e senha para continuar!");
        } else{
          
          try{
            console.log('username: ', email, "senha: ", senha)
            const response = await api.post("/home/login", { email, senha });
            login(response.data.token, response.data.user.email, response.data.user.role);
            window.location.href = "/alunos";
          } catch(err){
            setErro("Houve um problema com o login, verifique suas credenciais.");
          }
        }
      };

    return (
      <div className="divAuth">
        <h1 className="tituloAuth">Projeto Escola</h1>
          <form onSubmit={handleSubmit}>
            <div>
            <label className="lblLogin" htmlFor="email">Email:</label>
            <input
              type="text"
              value={email}
              placeholder="Digite o email"
              onChange={({ target }) => setEmail(target.value)}/>
            
      </div>

      <div>
        <label className="lblLogin" htmlFor="senha">Senha:</label>
        <input
          type="password"
          value={senha}
          placeholder="Digite a senha"
          className="inputAuth2"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">Login</button>
      <h4 className="msgErro">{erro}</h4>
    </form>
  </div>
  );
}
