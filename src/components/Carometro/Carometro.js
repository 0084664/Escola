import React, { useEffect, useState } from "react";
import { getRole } from "../../services/auth";
import api from "../../services/api";
import Main from "../template/Main";
import CrudCurso from "../CrudCurso/CrudCurso";

export default function Carometro() {

    const [mens, setMens ] = useState("Acesso restrito para professores.");
    console.log("getRole:", getRole());

    useEffect(() => {
        async function obtemDados() {
            let response = await api.get("/home/professor");
            response = await response.data;
            setMens(response)
        }
        obtemDados();
    },[]);

    return(
        <Main title="Carômetro">
        </Main>
    )
}