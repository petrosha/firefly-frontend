import React from 'react';
import styles from './spinner.module.css';
import { Spinner } from "react-bootstrap"

let modalSpinner = () => {
    return (
        <div className={styles.mainDiv}>
            <p className={styles.title}>Loading...</p>
            <Spinner 
                animation="border" 
                role="status" 
                variant="primary"/>
        </div>
    )
}

export default modalSpinner;
