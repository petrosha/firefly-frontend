import React, { useState } from 'react';
import styles from './menuSelect.module.css';

import { observer } from "mobx-react-lite"
import { useStore } from "../../store/root_store";

import {ButtonGroup, Button, ToggleButton } from "react-bootstrap"
import net from "../../net/network"

let ToggleButtons = ({menus,callback}) => {
    return (
        <ButtonGroup toggle vertical className={styles.buttonGroup}>
        {
            menus.map((el)=>{
                return(
                    <ToggleButton 
                        className={styles.button}
                        key={el.name}
                        type="checkbox"
                        variant={el.state ? "primary" : "secondary"}
                        checked={el.state}
                        onChange={callback(el.name)}>
                        <p className={styles.buttonText}>{el.name}</p>
                    </ToggleButton>
            )})   
        }
        </ButtonGroup>
    );
}

let SelectMenus = observer(() => {
    let store=useStore();
    const menusList = store.menus.listToSelect;
    let [menus, menusSet] = useState(menusList.map(el=>{ return { name: el.name, state: false}}));

    let callback=(name,event)=>{return (event)=>{
        let tmpArr=[...menus];
        let tmpObj=tmpArr.findIndex(el=> el.name === name);
        tmpArr[tmpObj]={
            name:name,
            state:event.currentTarget.checked
        }
        menusSet(tmpArr)
    }}
    
    let callbackSend=()=>{
        let tmpData={
            "menu":"menu",
            "action":"set_menus",
            "data": menus.filter(el=>el.state).map(el=>el.name)
        }
        net.netPostAction(store.user.id,tmpData);
    }

    return (
      <div className={styles.mainDiv}>
         <h2 className={styles.title}>Выберите компоненты</h2>
         <ToggleButtons menus={menus} callback={callback}/>
         <hr/>
         <Button variant="warning" onClick={callbackSend}>
             <p className={styles.buttonText}>Жми если готов!</p>
         </Button>
      </div>
    )
  })

export default SelectMenus;
