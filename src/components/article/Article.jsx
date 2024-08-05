// import React from 'react'
"use client";
import styles from "./article.module.css";
import Link from "next/link";
// import  './article.css'
// import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const Article = ({
	articleTitle,
	articleBody,
	articlePdfId,
	articleVideoId,
	id,
	articleType,
	cardVideo,
}) => {
	console.log(articleType);
	return (
		<div className={`${styles.articleContainer} py-10`}>
			<h1 className={`${styles.title} mb-3`}>{articleTitle}</h1>
			{articleType == "Video" ? (
				<div className={styles.videoContainer}>
					<iframe
						src={`https://www.youtube.com/embed/${articleVideoId}`}
						width="100%"
						className={styles.iframeClass}
						frameBorder="0"></iframe>
				</div>
			) : null}
			{articleType == "Post - Pdf" ? (
				<div className={styles.pdfContainer}>
					<iframe
						src={`https://drive.google.com/file/d/${articlePdfId}/preview`}
						width="100%"
						height="100%"
						frameBorder="0"></iframe>
				</div>
			) : null}
			{articleType == "Post - Image" ? (
				<div className={styles.imgContainer}>
					<div
						className="code w-100 flex justify-center"
						dangerouslySetInnerHTML={{ __html: articleBody }}
					/>
				</div>
			) : null}
			{articleType == "Article" || articleType == "Blog" ? (
				<div
					className="code w-100 flex justify-center"
					dangerouslySetInnerHTML={{ __html: articleBody }}
				/>
			) : null}
		</div>
	);
};

export default Article;
