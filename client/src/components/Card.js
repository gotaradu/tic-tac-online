import styles from './Card.module.css'

const Card = (props) => {
  return <div className={styles.box}>{props.children}</div>
}

export default Card
