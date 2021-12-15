import React from 'react';
import styles from './pilot.module.css';
import Radar from './radar/radar.js';
import Timer from './timer/timer.js';
import NavigationPanel from './navigation/navigation.js';
import Messages from './messages/messages.js';
import DistantSpaceObjects from './distantSpaceObjects/dso.js';
import {ProgramButtonBar, EngineButton,StartButton,StopButton} from './programButton/programButton.js';

function GamePilot() {
  return (
    <div className={styles.App}>

      <div className={styles.programButtons}>
        <ProgramButtonBar/>
      </div>
      <div className={styles.messages}>
        <Messages/>
      </div>
      <div className={styles.radar}>
        <Radar/>
        <EngineButton/>
        <StartButton/>
        <StopButton/>
      </div>
      <div className={styles.timer}>
        <Timer/>
      </div>
      <div className={styles.navigationButtons1}>
        <NavigationPanel side="left"/>
      </div>
      <div className={styles.navigationButtons2}>
        <NavigationPanel side="right"/>
      </div>
      <div className={styles.selectionButtons}>
        <DistantSpaceObjects/>  
      </div>
      <div className={styles.gameName}>
        <div className="gameTitleDiv"><p className="gameTitleText">Полёт</p></div>
      </div>
    </div>
  );
}

export default GamePilot;
