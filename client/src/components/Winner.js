import React from 'react'
import styles from './Winner.module.css'
const Winner = (props) => {
  return <p className={styles.c}>{props.children}</p>
}

export default Winner
