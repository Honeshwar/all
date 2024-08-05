import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import SocialMediaLinks from "@/components/socialMediaLinks/SocialMediaLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dhruv Research",
  description:
    "We are a Multimodal Market Research firm and Psephology experts, using multiple methodologies and an exceptional grassroot level reach to arrive at data driven actionable insights. We conduct research on diverse fields such as economy, sports, politics, entertainment, governance and provide solutions for our clients - ranging from Consumer Preference Index and Predictions to Competitor Assessment and Cohort Analysis. With a positive and flexible work environment that promotes transparency and autonomy, we at Dhruv Research always aspire for the top. #dhruvresearch https://dhruvresearch.com/ ",
};

const GTM = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function (w, d, s, l, i) { console.log("hello GTM");
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-NDP2564");
       `,
    }}
  />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/Dhruv_Favicon_Opt1.png"
          type="image/png"
        />

        <GTM />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDP2564"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Navbar />
        {children}
        <SocialMediaLinks />
        <Footer />
      </body>
    </html>
  );
}
