import React from 'react';

import styles from './mainScreen.module.css';

import { observer } from "mobx-react-lite"
import { useStore } from "../../store/root_store";

import MenuMain from "../menu/menu"
import GameSystems from "../games/systems/systems"
import GamePilot from "../games/pilot/pilot"
import GameSpace from "../games/space/space"
import Sounds from "../sounds/sounds.js"

const MainScreen = observer(() => {
    let store=useStore();
  
    let gameToShow; 
    switch(store.menus.current) {
        case "systems":
            gameToShow = <GameSystems/>
            break;
        case "news":
            gameToShow = <div class="gameTitleDiv"><p class="gameTitleText">News</p></div>
            break;        
        case "pilot":
            gameToShow = <GamePilot/>
            break;
        case "space":
            gameToShow = <GameSpace/>
            break;
        default:
            gameToShow = "";
            break;
    }
    
  return (
    <div className={styles.mainDiv}>
      <div className={styles.menuDiv}>
        <MenuMain 
            menuList={store.menus.list} 
            menuCurrentItem={store.menus.current}
            menuSetCurrentItem={store.menus.setCurrent.bind(store.menus)}
        />
      </div>    
      <div className={styles.gamesDiv}> 
        {gameToShow}
      </div>
      <Sounds/>
    </div>
  )
})

export default MainScreen;