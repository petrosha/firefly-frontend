import React from 'react';
import styles from './menu.module.css';

const MenuMain = ({menuList,menuCurrentItem,menuSetCurrentItem}) => {

    const clbSwitcher=(itemName)=>{ 
      return ()=>{
        console.log(itemName," clicked!");
        menuSetCurrentItem(itemName);
      }
    }
    console.log("AAAAA! ",menuCurrentItem);
    return(
      <>
        {menuList.map((el,idx)=>(
          <MenuElement 
            status={el===menuCurrentItem} 
            text={el} 
            clbSwitcher={clbSwitcher}
            key={el+10} />
        ))}
      </>
)}
  
const MenuElement = ({status,text,clbSwitcher}) => { 
    let statusButton=status ? "./images/green-button.png" : "./images/red-button.png";
    return (
      <div className={styles.menuElement}>
        <img 
          src={statusButton} 
          className={styles.menuElementImage}
          onClick={clbSwitcher(text)} 
          alt="" />
    <p className={styles.menuElementText}>{text}</p>
      </div>
    );
}

export default MenuMain;