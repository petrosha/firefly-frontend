import React from 'react';
import styles from './radar.module.css';
import {Curtain4Quarters, CurtainBackground} from './curtain.js';
import {GridAll} from './grid.js';
import {ObjectsInSpace,TheShip} from './objectsInSpace.js';
import Trajectory from './trajectory.js';

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";

let Radar = observer(() => {

  let pilotData = useStore().pilotData;
  let {ship,radar,systems} = pilotData.data;
  let program = pilotData.program;

  if(!ship) return "";

  let oisData= radar.map(el=>{
                          return {
                            data:el,
                            vector: (pilotData.program.selected === el.id), 
                            color: "red", 
                            outline:true
                        }});
  let switchedOn = systems.find(el=>el.name==="radar1").switchedOn;

    const halfScreen=550, halfRadar=500; 
    return (
      <div className={styles.Radar}>
        <svg 
          width="100%" height="100%"
          viewBox={`0,0,${2*halfScreen},${2*halfScreen}`}>
        
          <CurtainBackground halfScreen={halfScreen} halfRadar={halfRadar}/>
          {/* начало координат */}
          <g transform={`translate(${halfScreen},${halfScreen})`}>
            <g transform={`rotate(${-ship.sysAngle})`} className={styles.rotate} >
              {
                 switchedOn ? <g transform={`translate(${-ship.shiftX},${ship.shiftY})`}>  
                                {
                                  pilotData.program.type ? <Trajectory 
                                                                curveParams={program.curveParams}  
                                                                steps={program.steps}/>
                                                              : ""
                                }
                                <ObjectsInSpace data={oisData} ship={ship} timer={pilotData.timer} selectCallBack={pilotData.programSetRadarSelected.bind(pilotData)}/>
                              </g> : "" 
              } 

            </g>  
            <Curtain4Quarters halfScreen={halfScreen} halfRadar={halfRadar}/> 
            <g transform={`rotate(${-ship.sysAngle})`} className={styles.rotate}>
              <GridAll halfScreen={halfScreen} halfRadar={halfRadar} div={12} divCirc={3}/>
            </g>
            {
              switchedOn ? <TheShip/> : ""
            }
            
          </g>
        </svg>
      </div>
    ); 
})

export default Radar;
