import React from 'react';
import styles from './messages.module.css';

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";
import net from "net/network";

const actions = {
    "attack":" : Атака! ",
    "evade":": Маневр уклонения. ",
    "orbit":" : Выход на орбиту. ",
    "dock":" : Стыковка. ",
    "course":" : Выход на курс. ",
    "astro":" : Разгон. "} 

const actionStep = [
    "Финальная коррекция",
    "Вираж",
    "Согласование орбиты",
    "Вираж",
    "Первичная коррекция",
    "Подготовка к маневру",
] 

let Messages = observer(()=>{
    let pilotData = useStore().pilotData;
    let {ship,radar,astro} = pilotData.data;
    let program = pilotData.program;
    let userId=useStore().user.id;

    if(!radar) return ("");

    const eraseMessageSend=()=>{
        let tmpData={
            "menu":"pilot",
            "action":"eraseMessage",
            "data": ""
        }
        net.netPostAction(userId,tmpData);  
    }

    let tmpAim=undefined;
    // console.log("Target: ",program.target);
    if(program.target==="radar") {
        tmpAim = radar.find(el=>el.id===program.selected);
        
    }
        if(program.target==="astro") tmpAim = astro.objects.find(el=>el.name===program.selected);
    
    let aim = tmpAim ? `${tmpAim.type} ${tmpAim.name} ` : ""
    let actionType = program.type ? actions[program.type] : "";
    let stepName = program.goes ? actionStep[program.steps-1] : "";
    
    let message = `${aim} ${actionType} ${stepName}`
    // console.log("Message: ", message, " ", JSON.stringify(tmpAim));

    return (
        <div className={styles.mainDiv}>
            <div className={styles.text} onDoubleClick={eraseMessageSend}>
                {program.selected ? 
                    message
                    : ship.message }
            </div>
        </div>
    );
})

export default Messages;