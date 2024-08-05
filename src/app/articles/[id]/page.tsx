// import { redirect } from "next/dist/server/api-utils";
import Article from "@/components/article/Article";
import ShareArticle from "@/components/shareArticle/ShareArticle";
import AuthorDetails from "@/components/authorDetails/AuthorDetails";
import ArticleTogglerArrow from "@/components/articleTogglerArrow/ArticleTogglerArrow";
import type { Metadata, ResolvingMetadata } from "next";
import {
	getAdjacentValues,
	getFirstAndLastStaticArticleByCategory,
} from "@/utils/HelperFuncitons";
import { cookies } from "next/headers";

import Script from "next/script";

//meta tags
export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const id = params.id;
	let articleMetaData = null;
	try {
		const response = await fetch(
			`${process.env.STRAPI_URI}/api/articles?populate=*&filters[articleId][$eq]=${id}`
		);
		const data = await response.json();
		const articleData = data.data.pop();
		articleMetaData = articleData.attributes.metaTags;
	} catch (error) {
		console.log(error);
	}

	return {
		metadataBase: new URL(`${process.env.STRAPI_URI}`),
		title: `Dhruv Research - ${articleMetaData?.metaTitle}`,
		description: articleMetaData?.metaDescription,
		keywords: articleMetaData?.metaKeywords,
		openGraph: {
			images: [articleMetaData?.metaImage],
		},
		twitter: {
			card: "summary_large_image",
			title: `Dhruv Research - ${articleMetaData?.metaTitle}`,
			description: articleMetaData?.metaDescription,
			images: [articleMetaData?.metaImage],
		},
	};
}

const getArticleData = async (id: string) => {
	try {
		const response = await fetch(
			`${process.env.STRAPI_URI}/api/articles?filters[articleId][$eq]=${id}&populate[articleContent][populate]=*&populate[metaTags][populate]=*&populate[articleAuthor][populate]=*&populate[articleCard][populate]=*`
		);
		const data = await response.json();
		const articleData = data.data.pop();
		const category = articleData.attributes.articleCategory;
		const articleType = articleData.attributes.articleCard.cardType;
		const cardVideo = articleData.attributes.articleCard.cardVideo;
		const articleTitle = articleData.attributes.articleContent.articleTitle;
		const articleBody = articleData.attributes.articleContent.articleBody;
		const articleVideoId = articleData.attributes.articleContent.articleVideoId;
		const articlePdfId = articleData.attributes.articleContent.articlePdfId;
		const articleAuthor = articleData.attributes.articleAuthor;
		//meta
		const articleMetaData = articleData.attributes.metaTags;
		return [
			category,
			articleType,
			cardVideo,
			articleTitle,
			articleBody,
			articleVideoId,
			articlePdfId,
			articleAuthor,
			articleMetaData
		];
	} catch (error) {
		console.log(error);
		return [];
	}
};

const getAdjacentArticles = async (category: string, id: string) => {
	try {
		const response = await fetch(
			`${process.env.STRAPI_URI}/api/articles?populate[0]=articleCard.cardImage&filters[articleCategory][$eq]=${category}&sort=createdAt:desc`
		);
		const data = await response.json();
		let articles = data.data;
		articles = articles.map((article: any) => article.attributes.articleId);
		let [isFirst, isLast, adjecantArticles] = getAdjacentValues(articles, id);
		if (isFirst || isLast) {
			const [firstStaticArticle, lastStaticArticle] =
				getFirstAndLastStaticArticleByCategory(category);
			if (isFirst) adjecantArticles = [lastStaticArticle, adjecantArticles[1]];
			else if (isLast)
				adjecantArticles = [adjecantArticles[0], firstStaticArticle];
		}
		return [...adjecantArticles];
	} catch (error) {
		console.log(error);
		return [];
	}
};

const ArticlePage = async ({ params }: { params: { id: string } }) => {
	const cookieStore = cookies();
	const id = params.id;
	const data = await getArticleData(id);
	if (data.length === 0) throw Error("No Data!");
	const [
		category,
		articleType,
		cardVideo,
		articleTitle,
		articleBody,
		articleVideoId,
		articlePdfId,
		articleAuthor,
		articleMetaData
	] = data;

	const adjecantArticles = await getAdjacentArticles(category, id);
	if (adjecantArticles.length == 0) throw Error("No articles!");
	const [left, right] = adjecantArticles;

	// console.log(articleMetaData,articleMetaData?.metaImage?.data?.attributes?.url)
	//structure data of article that show in browser search
	const structuredData = { __html:JSON.stringify(
		{
			"@context": "https://schema.org",
		"@type": "Article",
		"mainEntityOfPage": {
		  "@type": "WebPage",
		  "@id": "https://dhruvresearch.com/articles/"+id
		},
		"headline": articleTitle,
		"description": articleMetaData?.metaDescription || articleTitle,
		"image": articleMetaData?.metaImage?.data?.attributes?.url || "https://dhruvresearch.com/dhruv_logo.jpg",  
		// "author": {
		//   "@type": "Organization",
		//   "name": "Dhruv Research",
		//   "url": "https://dhruvresearch.com/"
		// },
		"author": {
			"@type": "Person",
			"name": articleAuthor.authorName,
			"url": articleAuthor.authorLinkedInUrl
		  },  
		"publisher": {
		  "@type": "Organization",
		  "name": "Dhruv Research",
		  "logo": {
			"@type": "ImageObject",
			"url": "https://dhruvresearch.com/images/Dhruv_Favicon_Opt1.png"
		  }
		},
		"datePublished": ""
		  }
	) }
	  
	   
 
	return (
		<>
		{/* strategy beforeInteractive help use to add.run script before page load or add script in head */}
		 
		<Script id="structured-data-id" strategy="beforeInteractive"
		type="application/ld+json"
          dangerouslySetInnerHTML={structuredData}//`console.log('hi there')`
        />
	   	  
			<ShareArticle id={id} />
			<ArticleTogglerArrow type="left" id={left} />
			<ArticleTogglerArrow type="right" id={right} />
			<Article
				id={id}
				articleTitle={articleTitle}
				articleType={articleType}
				cardVideo={cardVideo ? cardVideo : null}
				articleBody={articleBody}
				articleVideoId={articleVideoId}
				articlePdfId={articlePdfId}
			/>
			<AuthorDetails articleAuthor={articleAuthor} />
		</>
	);
};

export default ArticlePage;


 