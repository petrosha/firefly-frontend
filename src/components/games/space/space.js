import React from "react";
import styles from "./space.module.css";

import { useStore } from "store/root_store";
import { observer } from "mobx-react-lite";

const GameSpace = observer(() => {
  let space = useStore().space;
  if(!space.pics) return ""; 
    
  let divClass = space.status ? styles.spaceDivBig : styles.spaceDivSmall; 
  divClass = divClass + " " + styles.spaceDivCommon;

  console.log("System: " + space.pics.currentFile);
  return (
    <div style={{ backgroundImage: "url(" + space.pics.currentFile.file + ")" }} className = { divClass } >
      <div className = { styles.spaceButton } onClick={ space.setStatus.bind(space) }></div>  
      {
        space.pics.message ? 
          <div className={ styles.spaceMessageDiv }>
            <p className={ styles.spaceMessageText }>{space.pics.message}</p>
          </div> : "" 
      }      
      <div className = { styles.ortDiv }>
        <p className = { styles.ortText }>Кислород: {space.ort.oxy}%</p>
        <p className = { styles.ortText }>Температура: {space.ort.temp}С°</p>
        <p className = { styles.ortText }>Радиация: {space.ort.rad} рад/ч</p>
      </div> 
      {/* <div className={styles.sysGraph2}>
            <PowerProductionChart 
                dataSet = {[...systems.listPowerProduction,systems.powerLevel]} 
                dataNames={[...systems.listPowerProductionScreenNames,"Всего"]}/>
            </div> */}
    </div>
  );
});

export default GameSpace;