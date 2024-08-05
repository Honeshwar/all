import styles from "./socialmedialinks.module.css";

const SocialMediaLinks = () => {
  return (
    <p className={styles.socialMediaContainer}>
      <span className="px-2">
        <a
          href="https://www.facebook.com/DhruvResearch"
          target="_blank"
          className={styles.social}
        >
          <img
            alt="social media icon"
            loading="lazy"
            src="/images/facebook-logo.png"
          />
        </a>
      </span>
      <span className="px-2">
        <a
          href="https://twitter.com/dhruvresearch"
          target="_blank"
          className={styles.social}
        >
          <img
            alt="social media icon"
            loading="lazy"
            src="/images/twitter-logo.svg"
          />
        </a>
      </span>
      <span className="px-2">
        <a
          href="https://www.linkedin.com/company/dhruvaresearch/?viewAsMember=true"
          target="_blank"
          className={styles.social}
        >
          <img
            alt="social media icon"
            loading="lazy"
            src="/images/linkedin-icon-social.png"
          />
        </a>
      </span>
      <span className="px-2">
        <a
          href="https://www.youtube.com/@dhruvresearch"
          target="_blank"
          className={styles.social}
        >
          <img
            alt="social media icon"
            loading="lazy"
            src="/images/youtube-logo.png"
          />
        </a>
      </span>
      <span className="px-2">
        <a
          href="https://instagram.com/dhruvresearch"
          target="_blank"
          className={styles.social}
        >
          <img
            alt="social media icon"
            loading="lazy"
            src="/images/Insta Logo.png"
          />
        </a>
      </span>
    </p>
  );
};

export default SocialMediaLinks;
