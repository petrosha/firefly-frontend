import React from 'react';
import styles from './systems.module.css';
import GameSystemsButton from '../systemButton/systemButton';
import PowerConsumptionChart from './systemsPowerConsumtionChart';
import PowerProductionChart from './systemsPowerProductionChart';
import FuelChart from './systemsFuelChart';

import { useStore } from "../../../store/root_store";
import { observer } from "mobx-react-lite";
import net from "../../../net/network";

const GameSystems=observer( ()=>{
    let systems=useStore().systems;
    let userId=useStore().user.id;

    console.log("Powers: ",systems.listPowerProduction);

    let changedSwitchedOnSend=(system)=>{
        console.log("Clicked: ",system.name);
        let action="switchOn";
        if(system.switchedOn) action="switchOff";
    
        let tmpData={
            "menu":"systems",
            "action":action,
            "data": system.name
        }
        net.netPostAction(userId,tmpData);
    }

    return (
    <div className={styles.systemsDiv}>

        <div className={styles.sysShip}>
            {systems.list.map((el)=>(
                <div key={el.name} className={styles[el.name]}>
                    <GameSystemsButton system={el} callBack={()=>changedSwitchedOnSend(el)}/>
                </div>
            ))} 
        </div>

        <div className={styles.sysName}>
            <div className="gameTitleDiv"><p className="gameTitleText">Системы корабля</p></div>
        </div>
        <div className={styles.sysGraph1}>
            <FuelChart dataSet = {[systems.fuel]} dataNames={["Tons"]} maxFuelLevel={systems.maxFuelLevel}/>
        </div>
        <div className={styles.sysGraph2}>
            <PowerProductionChart 
                dataSet = {[...systems.listPowerProduction,systems.powerLevel]} 
                dataNames={[...systems.listPowerProductionScreenNames,"Всего"]}/>
        </div>
        <div className={styles.sysGraph3}>
            <PowerConsumptionChart dataSet = {systems.listPowers} dataNames={systems.listScreenNames}/>
        </div>


    </div>
  )
});

export default GameSystems;