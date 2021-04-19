import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import net from "./net/network";

import './fonts-stylesheet.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import store, {StoreProvider} from "./store/root_store";
import network from './net/network';
import { exit } from 'process';

store.user.setId();
console.log("USER_ID: " + store.user.id);


async function updateStatusCycle() {
    try{
        let answer = await net.netGetStatus(store.user.id);
        // console.log("Net: ",answer);
        
        store.user.setData(answer.user);
        store.menus.setData(answer.menus);

 
        if(answer.data.systems) store.systems.setData(answer.data.systems);
    }
    catch(error){
        console.log("Error: ", error);
        if(error.response) store.error.setError(error.response.status,error.response.data);
//        throw(error);
    }
 
}

ReactDOM.render(
    <StoreProvider store={store}>
        <App/>   
    </StoreProvider>, document.getElementById('root')
)  

setInterval(updateStatusCycle,1000);

