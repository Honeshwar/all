export const titleAbbrevationToTitle: {
  [key: string]: string;
} = {
  politics: "Politics",
  sports: "Sports",
  didyouknow: "Did you know !",
  entertainment: "Lifestyle & Entertainment",
  governance: "Governance",
  economy: "Economy",
};

export const categoryToFirstAndLastArticle: { [key: string]: any } = {
  politics: {
    // first: "/our_work/our_categories/politics/indianAllianceProspectsInUP.html",
    first:
      "/our_work/our_categories/politics/MauritiusPresidentialElections2024.html",
    last: "/our_work/our_categories/assembly_election/pollster_ranking.html",
  },
  sports: {
    first: "/our_work/our_categories/sports/ipl2023.html",
    last: "/our_work/our_categories/sports/fifa2022Post.html",
  },
  didyouknow: {
    first: "/our_work/our_categories/didyouknow/InternationalDayForests.html",
    last: "/our_work/our_categories/didyouknow/didyouknowPost.html",
  },
  entertainment: {
    first: "/our_work/our_categories/entertainment/dreamRatingOTT2023.html",
    last: "/our_work/our_categories/entertainment/brandReportCard.html",
  },
  governance: {
    first: "/our_work/our_categories/governance/investmentsInIndia.html",
    last: "/our_work/our_categories/governance/G20FinancialInclusion.html",
  },
  economy: {
    first: "/our_work/our_categories/economy/economicResilienceIndia.html",
    last: "/our_work/our_categories/economy/surveyPost.html",
  },
};
