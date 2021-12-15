import React from 'react';
import styles from './timer.module.css';

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";

let Timer = observer(()=>{
    let pilotData = useStore().pilotData;
    let systems=pilotData.data.systems;
    if(!systems) return ("");
    let switchedOn = systems.find(el=>el.name==="radar1").switchedOn;
    return (
        <div className={styles.mainDiv}>
            <div className={styles.progressOuterDiv}>
                {
                    switchedOn ? <div style={{height: `${pilotData.timer*10}%`}}    
                                    className={styles.progressInnerDiv}>           
                                </div> : ""
                }
            </div>
            <div className={styles.textCounterDiv}>
                {  switchedOn ? pilotData.timer : ""}
            </div>
        </div>
    );
})

export default Timer;