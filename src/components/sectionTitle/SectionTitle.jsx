
import Image from 'next/image'
import styles from './sectiontitle.module.css'
const SectionTitle = (props) => {
  return (
    <div className={styles.titleContainer}>
        <h2 className={styles.sectionTitle}>{props.title}
        <img  src="/images/vector-star.png"
            width={200}
            height={200}
            alt="Picture of the author"
        />
        </h2>
    </div>
  )
}

export default SectionTitle