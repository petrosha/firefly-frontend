import React from 'react';
import styles from './navigation.module.css';

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";

const switchedOnStyle=[styles.borderGray,styles.borderGreen,styles.borderOrange]

let NavigationPanel = observer(({side="right"})=>{
    let pilotData = useStore().pilotData;
    let navi = pilotData.navigation[side];

    let buttonBorderStyle = switchedOnStyle[navi.boost];  

    let topUp = 50-navi.task/2
    let heightUp = navi.taskWidth/2;


    
    return (
        <div className={styles.mainDiv}>
            <div className={`${styles.buttonDiv} ${buttonBorderStyle}`} 
                onClick={()=>{pilotData.navigationChangeSpeed(true,side)}}>
                +
            </div>
            <div className={styles.progressOuterDiv}>
                <div className={styles.progressUpDiv}>
                    <div style={{height: `${navi.levelUp}%`}}    
                        className={styles.progressInnerDiv}>           
                    </div>
                    <div className={styles.speedLevelUp}> 
                        {navi.speedLevelUp}          
                    </div>
                </div>    
                <div className={styles.progressLowDiv}>
                    <div style={{height: `${Math.abs(navi.levelLow)}%`}}    
                        className={styles.progressInnerDiv}>           
                    </div> 
                    <div className={styles.speedLevelLow}> 
                        {navi.speedLevelLow}          
                    </div>
                </div>
                <div style={{height: `${navi.taskWidth/2}%`, top:`${50-navi.task/2}%` }}
                    className={`${styles.task} ${styles.borderUp}`}/>
                <div style={{height: `${navi.taskWidth/2}%`, bottom:`${50+navi.task/2}%` }}
                    className={`${styles.task} ${styles.borderLow}`}/>

            </div>
            <div className={`${styles.buttonDiv} ${buttonBorderStyle}`} 
                onClick={()=>{pilotData.navigationChangeSpeed(false,side)}}>
                -
            </div>
        </div>
    );
})

export default NavigationPanel;