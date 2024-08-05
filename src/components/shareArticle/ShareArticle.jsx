
import styles from './sharearticle.module.css'
const ShareArticle = ({id}) => {
  return (
    <div className={styles.shareSection}>
			<div className={styles.shareContainer}>
				<div className={styles.shareBtns}>
					<a><img alt="social media icon"
							width="80%"
							src="../../../images/2958783.png"
					/></a>
					<a href={`https://www.facebook.com/sharer/sharer.php?u=https://dhruvresearch.com/articles/${id}`}
						target="_blank"><img alt="social media icon"
							width="100%"
							src="../../../images/facebook-logo.png"
					/></a>
					<a href={`https://twitter.com/intent/tweet?url=https://dhruvresearch.com/articles/${id}`}
						target="_blank"
						><img alt="social media icon"
							width="100%"
							src="../../../images/twitter-logo.svg"
							
					/></a>
					<a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://dhruvresearch.com/articles/${id}`}
						target="_blank"
						><img alt="social media icon"
							width="100%"
							src="../../../images/linkedin-logo.png"
							
					/></a>
					<a
						href={`whatsapp://send?text=https://dhruvresearch.com/articles/${id}`}
						target="_blank"
						><img alt="social media icon"
							width="100%"
							src="../../../images/WhatsappIcon.png"
							
					/></a>
				</div>
			</div>
		</div>
  )
}

export default ShareArticle