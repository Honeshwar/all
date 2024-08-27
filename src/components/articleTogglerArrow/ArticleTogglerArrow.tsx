import Link from "next/link";

const ArticleTogglerArrow = async ({ type, id }: any) => {
	// transform rotate-180
	//fetch articles for given category
	console.log(id);

	return type === "left" ? (
		<div className="fixed fixed-center left-0 mb-8 md:ml-16 transform rotate-90 ">
			<Link href={id}>
				<span className=" text-white font-bold py-2 md:px-4">
					<img alt="image" src="../../../images/arrow-img.png" width={55} />
				</span>
			</Link>
		</div>
	) : (
		<div className="fixed fixed-center right-0 mb-8 md:mr-16 transform rotate-90">
			<Link href={id}>
				<span className=" text-white font-bold py-2 md:px-4">
					<img alt="image"
						className="transform rotate-180"
						width={55}
						src="../../../images/arrow-img.png"
						
					/>
				</span>
			</Link>
		</div>
	);
};

export default ArticleTogglerArrow;
