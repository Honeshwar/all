import MarkdownView from "react-showdown";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import ArticleCard from "@/components/articleCard/ArticleCard";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import { getCategoryTitle } from "@/utils/HelperFuncitons";
import { articles as staticArticles } from "@/utils/StaticArticles";
import { cookies } from "next/headers";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Article(props: Props) {
  const cookieStore = cookies();
  //get category
  const searchParams = props.searchParams;
  let category: string = (searchParams?.category as string) || "politics";

  let articles = null;
  try {
    //fetch articles for given category
    const response = await fetch(
      `${process.env.STRAPI_URI}/api/articles?populate[0]=articleCard.cardImage&filters[articleCategory][$eq]=${category}&sort=createdAt:desc`
    );
    const data = await response.json();
    articles = data.data;
    // console.log(articles)
  } catch (error) {
    console.log(error);
  }

  return (
    // articles && (
    <>
      <SectionTitle title="Insights" />
      <div className="container">
        <p className="category ms-5">{getCategoryTitle(category)}</p>
      </div>
      <div className="articles">
        {articles?.map((article: any) => {
          //strapi prod only articles
          return (
            article.attributes.articleStatus == "production" && (
              <ArticleCard
                key={article.attributes.articleId}
                data={article}
                articleType="Dynamic"
              />
            )
          );
        })}

        {staticArticles[category]?.map((article: any) => {
          //static articles
          return (
            <ArticleCard
              key={article.url}
              data={article}
              articleType="Static"
            />
          );
        })}
      </div>
    </>
  );
  // );
}
