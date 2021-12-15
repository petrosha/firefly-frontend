import React from 'react';
import styles from './programButton.module.css';

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";
import net from "net/network";

const titles = [
    {name:"Атака",type:"attack"},
    {name:"Уклон",type:"evade"},
    {name:"Орбита",type:"orbit"},
    {name:"Стык",type:"dock"},
    {name:"Курс",type:"course"},
    {name:"Разгон",type:"astro"}] 

const buttonImgList={
    on: "./images/buttonOn.png",
    off: "./images/buttonOff.png"
}

const engineButtonImgList={
    on: "./images/Engine_ON.png",
    off: "./images/Engine_Ready.png",
    powerOff: "./images/Engine_Broken.png",
}

const startButtonImgList={
    on: "./images/Start_ON.png",
    off: "./images/Start_Ready.png",
    notReady: "./images/Start_OFF.png",
}

const stopButtonImgList={
    on: "./images/Stop_ON.png",
    off: "./images/Stop_OFF.png"
}

let EngineButton = observer(()=>{
    let pilotData = useStore().pilotData;
    let userId=useStore().user.id;
    let {astro,systems} = pilotData.data;
    
    if(!astro) return ("");
    
    const astroEngineStart=()=>{    
        let tmpData={
            "menu":"pilot",
            "action":"engineStart",
            "data": ""
        }
        net.netPostAction(userId,tmpData);
    } 

    let engine=systems.find(el=>el.name === "mainJet1");

    let img="";
    if(engine.switchedOn){
        if(astro.engine) img=engineButtonImgList.on;
        else img=engineButtonImgList.off;
    } else img=engineButtonImgList.powerOff;

    return (
        <div className={styles.engineButtonDiv} onClick={astroEngineStart}>
            <img className={styles.engineButtonImg} src={img}/>
        </div>
    );
})

let StartButton = observer(()=>{
    let pilotData = useStore().pilotData;
    let userId=useStore().user.id;
    let {program,navigation} = pilotData;
    
    let enginesStatus = navigation.right.boost*navigation.left.boost ? true : false;
    let typeStatus=program.type ? true : false;
    let goesStatus=program.goes; 

    const programStartSend=()=>{
        if(enginesStatus && typeStatus){
            let tmpData={
                "menu":"pilot",
                "action":"programStart",
                "data": pilotData.program
            }
            tmpData.data.goes=true;   
            // console.log("ToSend ",JSON.stringify(tmpData));
        pilotData.navigationCreateTask();
        net.netPostAction(userId,tmpData);}      
    } 

    let img="";
    if(enginesStatus && typeStatus){
        if(goesStatus) img=startButtonImgList.on;
        else img=startButtonImgList.off;
    } else img=startButtonImgList.notReady;

    return (
        <div className={styles.startButtonDiv} onClick={programStartSend}>
            <img className={styles.engineButtonImg} src={img}/>
        </div>
    );
})

let StopButton = observer(()=>{
    let goesStatus = useStore().pilotData.program.goes;
    let userId=useStore().user.id;

    const programStopSend=()=>{
        let tmpData={
            "menu":"pilot",
            "action":"programStop",
            "data": ""
        }
        net.netPostAction(userId,tmpData);
    }

    console.log("GoES: ",goesStatus);
    let img = goesStatus ? stopButtonImgList.on : stopButtonImgList.off;
    return (
        <div className={styles.stopButtonDiv} onClick={programStopSend}>
            <img className={styles.engineButtonImg} src={img}/>
        </div>
    );
})


let ProgramButton = ({state = false, title="program", callBack})=>{
    let img = state ? buttonImgList.on : buttonImgList.off;
    return (
        <div className={styles.button} onClick={callBack}>
            <span className={styles.buttonText}>{title}</span>
            <img className={styles.buttonImg} src={img}/>
        </div>
    );
}

let ProgramButtonBar = observer(()=>{
    let pilotData = useStore().pilotData;
    let userId=useStore().user.id;
    
    const programStopSend=()=>{
        let tmpData={
            "menu":"pilot",
            "action":"programStop",
            "data": ""
        }
        net.netPostAction(userId,tmpData);
    }

    return (
        <div className={styles.buttonBar}>
            {/* <button onClick={programStartSend}>Запуск</button> */}
            {titles.map((el,idx)=>{
                return(
                    <ProgramButton 
                        state={pilotData.program.type===el.type} 
                        title={el.name} 
                        key={idx}
                        callBack={()=>pilotData.programSetType(el.type)}
                    />
                )} 
            )}
        </div>
    );
})


export {
    ProgramButtonBar,
    EngineButton,
    StartButton,
    StopButton    
};