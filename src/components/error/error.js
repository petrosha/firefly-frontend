import React, { useState } from 'react';
import styles from './error.module.css';
import { observer } from "mobx-react-lite"
import { useStore } from "../../store/root_store";

let Error = observer(() => {
    let error=useStore().error;
    return (
        <div className={styles.mainDiv}>
            <h2 className={styles.title}>Что-то пошло не так. Позовите мастера.</h2>
            <hr/>
            <p className={styles.buttonText}>Код: {error.error}</p>
            <p className={styles.buttonText}>Ошибка: {error.errorText}</p>
        </div>
    )
  })

export default Error;
