import styles from "./articlecard.module.css";
import Link from "next/link";
const ArticleCard = (props: any) => {
  return props.articleType === "Dynamic" ? (
    <div className={styles.card}>
      <Link href={`/articles/${props.data.attributes.articleId}`}>
        <div className={styles.cardImage}>
          {props.data.attributes.articleCard.cardType === "Video" ? (
            <iframe
              src={`https://www.youtube.com/embed/${props.data.attributes.articleCard.cardVideo}`}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          ) : (
            <img
              src={`${props.data.attributes.articleCard.cardImage.data.attributes.url}`}
              alt="CardImage"
            />
          )}
        </div>
        <div className={styles.cardContent}>
          <p>{props.data.attributes.articleCard.cardTitle}</p>
          <span className={styles.cardType}>
            {props.data.attributes.articleCard.cardType.split(" ")[0]}
          </span>
        </div>
      </Link>
    </div>
  ) : (
    <div className={styles.card}>
      <a href={props.data.url}>
        <div className={styles.cardImage}>
          {props.data.articleType === "Video" ? (
            <iframe
              src={`https://www.youtube.com/embed/${props.data.cardVideo}`}
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          ) : (
            <img
              src={`https://dhruvresearch.com${props.data.cardImage}`}
              alt="CardImage"
            />
          )}
        </div>
        <div className={styles.cardContent}>
          <p>{props.data.cardTitle}</p>
          <span className={styles.cardType}>{props.data.articleType}</span>
        </div>
      </a>
    </div>
  );
};

export default ArticleCard;
