/**
 * 
 * @author Rodrigo Santos de Souza
 */

import React from "react";

import { BrowserRouter , Route } from "react-router-dom";

import Login from "./pages/login";
import Main from "./pages/main";

export default function Routes() {
    return (
        <BrowserRouter >
            <Route exact path="/" component={Login} />
            <Route path="/dev/:id" component={Main} />
        </BrowserRouter>
    );
}