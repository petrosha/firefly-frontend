import React from 'react';
import styles from './systemButton.module.css';

const buttonImgList={
    power: "./images/systems/Reactor.png",
    fuel: "./images/systems/Fuel_1.png",
    mainJet: "./images/systems/Marsh_engine.png",
    maneuverJet: "./images/systems/Manevring_engine.png",
    door: "./images/systems/Exit.png",
    navComp: "./images/systems/Comp.png",
    lifeSys: "./images/systems/SJO.png",
    medLab: "./images/systems/Med.png",
    light: "./images/systems/Light.png",
    radar: "./images/systems/Scaner.png",
    scaner: "./images/systems/Radar.png",
    radio: "./images/systems/Radio.png",
    beacon: "./images/systems/Transponder.png",
    gun: "./images/systems/Weapon.png",
    supergun: "./images/systems/SuperWeapon.png",
    shield: "./images/systems/Shield.png",
}

let SystemButton = ({system={},callBack})=>{

    let buttonColorStyle;
    if(system.broken) buttonColorStyle="red";
    else if(system.switchedOn) buttonColorStyle="green";
    else buttonColorStyle="gray";

    return (
        <div className={styles.button+" "+styles[buttonColorStyle]} onClick={callBack}>
            <img className={styles.buttonImg} 
                 src={buttonImgList[system.type]}                
            />
        </div>
    );
}

export default SystemButton;