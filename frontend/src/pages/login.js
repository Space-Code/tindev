/**
 * 
 * @author Rodrigo Santos de Souza
 */

import React, { useState } from "react";

import api from "../services/api";

import logo from "../assets/logo.svg";
import "./login.css";

export default function Login({ history }) {

    const [username, setUserName] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        
        const response = await api.post("/devs", {
            username
        });

        const { _id: userId } = response.data.data; 

        history.push(`/dev/${userId}`);
    }

    return (
        <div className="login-container">
            <form action="" onSubmit={handleSubmit}>
                <img src={logo} alt="Tinder" />
                <input 
                    type="text" 
                    placeholder="Digite seu usuario Github"
                    value={username}
                    onChange={e => setUserName(e.target.value)}/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

