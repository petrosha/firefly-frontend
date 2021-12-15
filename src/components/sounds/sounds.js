import React from 'react';
import styles from './sounds.module.css';
import { observer } from "mobx-react-lite"
import { useStore } from "store/root_store";
import net from "net/network";

let Sounds = observer(() => {
    let sounds=useStore().sounds;
    let userId = useStore().user.id;
  
    let soundDel=(name)=>{
        let tmpData={
            "menu":"sounds",
            "action":"soundsPlayListDel",
            "data": name
        }
        net.netPostAction(userId,tmpData);
        console.log("SEND SOUND: ",tmpData);
    }

    let delayedEvent=(name,time)=>{
        setTimeout(()=>{soundDel(name);},time*1000)
    }

    return (
        <div className={styles.mainDiv}>
            {
                sounds.playList.map((el,idx)=>{
                    if(!el.loop) delayedEvent(el.name,sounds.soundsList[el.name].time)
                    return(
                    <div key={idx}>
                        {el.name}
                        <audio  
                            controls
                            autoPlay
                            loop={el.loop}
                            src={sounds.soundsList[el.name].name}/>
                    </div>
                )})
            }        
        </div>
    )
  })

export default Sounds;
