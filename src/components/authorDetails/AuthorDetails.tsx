import styles from "./authordetails.module.css";
const AuthorDetails = ({ articleAuthor }: any) => {
	// console.log(articleAuthor.authorImage.data.attributes.url,'author')
	return (
		<div className={styles.container}>
			<h5 className="text-lg font-semibold px-10 md:px-28 md:ml-2">Author</h5>
			<div className="flex items-center px-3 md:px-24">
				<div
					className={`${styles.authorImg} text-center flex flex-col align-center`}>
					<img alt="Author Image"
						className="block m-auto"
						src={`${articleAuthor.authorImage.data.attributes.url}`}
						
					/>
				</div>
				<div className="author-description p-md-3 p-3  flex flex-col justify-center">
					<a
						target="_blank"
						className=""
						href={articleAuthor.authorLinkedInUrl}>
						<b>{articleAuthor.authorName}</b>
					</a>
					<p className="flex flex-col">
						<span>
							{articleAuthor.authorPosition} <br />{" "}
							{articleAuthor.authorDepartment}
						</span>
						<a
							target="_blank"
							href={articleAuthor.authorLinkedInUrl}
							className="mt-1">
							<img alt="Linkdin Icon"
								width="20px"
								src="./../../../images/linkedin-auth.png"
								
							/>
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthorDetails;
