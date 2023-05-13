import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";
import styles from "../../../styles/style.module.css";
import Footer from "../../components/Footer";
import client from "../../graphql/apollo-client";
import { Operations } from "../../graphql/operations";
import Comedy from "../../public/assets/comedy2.avif";
import Crime from "../../public/assets/crime.avif";
import Education from "../../public/assets/education.avif";
import LogoText from "../../public/assets/logo-text.png";
import News from "../../public/assets/news.avif";
import Society from "../../public/assets/society.avif";
import Sports from "../../public/assets/sports.avif";
import Technology from "../../public/assets/technology.avif";

import Link from "next/link";
import PreviousPage from "../../components/PreviousPage";
import Sidebar from "../../components/Sidebar";
import { NavContext } from "../../context/navContext";
import {
  capitalizeString,
  convertToSlug,
  truncateString,
} from "../../utils/functions";
import { useMediaQuery, useSetCurrentPage } from "../../utils/hooks";
import { PodcastData } from "../../utils/types";

interface Props {
  categoryPodcasts: PodcastData[];
  category: string;
}

const category = ({ categoryPodcasts, category: categoryName }: Props) => {
  const isBreakPoint = useMediaQuery(1023);

  if (categoryName) {
    console.log(categoryName.split("").length);
  }

  const { setPreviousPage, setCategoryType, categoryType } = NavContext();
  useSetCurrentPage({ home: false, podcasts: true, search: false });
  let backdrop: StaticImageData = LogoText;

  useEffect(() => {
    if (categoryName) {
      setCategoryType(categoryName);
    }
    setPreviousPage("podcasts");
  }, [categoryName]);

  if (categoryName) {
    switch (categoryName) {
      case "news & politics":
        backdrop = News;
        break;
      case "comedy":
        backdrop = Comedy;
        break;
      case "society & culture":
        backdrop = Society;
        break;
      case "sports":
        backdrop = Sports;
        break;
      case "educational":
        backdrop = Education;
        break;
      case "technology":
        backdrop = Technology;
        break;
      case "true crime":
        backdrop = Crime;
        break;
      default:
        LogoText;
    }
  }

  return (
    <div className="flex base:mb-[60px] xs:mb-[70px] lg:mb-0 bg-black h-full">
      <Sidebar />
      {categoryPodcasts && (
        <div className="h-screen w-full">
          <Image
            src={backdrop}
            alt="comedy"
            className="fixed z-0 w-full lg:top-[-100px] xl:top-[-150px] shadow-2xl shadow-black"
            priority
          />
          <div className="w-full h-screen bg-gradient-to-tr bg-black/10 from-black/40 fixed"></div>
          <div className="h-full flex flex-col mt-[150px] lg:mt-[230px] gap-14">
            <h1 className="relative z-50 base:text-3xl xs:text-5xl sm:text-6xl md:text-8xl font-extrabold pl-4">
              {capitalizeString(categoryName)}
            </h1>

            <div
              className={`bg-gradient-to-b from-[#1a1a1a] via-[#282828] to-[#101010] relative grid-cols-3 md:grid-cols-4 lg:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 grid gap-[6px] lg:gap-x-8 lg:gap-y-10 p-6 lg:p-10 pb-24`}
            >
              {/* <div className="absolute top-0 from-[#5757574e] bg-gradient-to-b to-[#151515] w-full h-[100%] z-0"></div> */}

              {categoryPodcasts?.map((podcast) => (
                <div
                  key={`${podcast.title}`}
                  className={
                    !isBreakPoint
                      ? ` group bg-gradient-to-b w-full from-[#2a2a2a] to-[#181818] hover:from-[#202020] hover:to-[#343434] hover:cursor-pointer flex flex-col items-center max-h-auto px-4 pb-10 rounded-lg min-w-[135px] max-w-[220px]`
                      : " hover:cursor-pointer flex flex-col items-center h-fit rounded-lg overflow-y-visible p-2 sm:mx-5 "
                  }
                >
                  <Link
                    href={`/podcasts/${convertToSlug(
                      categoryName
                    )}/${convertToSlug(podcast.title)}`}
                  >
                    <Image
                      src={podcast.imageUrl}
                      alt={podcast.imageUrl}
                      width={160}
                      height={160}
                      className="rounded-xl mt-4 shadow-lg shadow-black base:w-[90px] xs:w-[110px] sm:w-[160px] "
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-col px-5  ">
                    <h1 className=" whitespace-nowrap text-[10px] sm:text-sm lg:text-sm xl:text-lg text-start mt-3 font-normal lg:font-semibold text-[#dadada] group-hover:text-white whitespace-wrap">
                      {!isBreakPoint
                        ? truncateString(podcast.title, 14)
                        : truncateString(podcast.title, 14)}
                    </h1>
                    <p className="whitespace-nowrap base:text-[8px] xs:text-xs sm:text-sm lg:text-md text-start font-medium text-[#909090]">
                      {!isBreakPoint
                        ? truncateString(podcast.publisher, 14)
                        : truncateString(podcast.publisher, 14)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default category;

export const getStaticPaths = async () => {
  const paths = [{ params: { category: "" } }];
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { category } = params;
  const slugToCategory = category.split("-").join(" ").toLowerCase();

  const { data } = await client.query({
    query: Operations.Queries.FetchCategoryPodcasts,
    variables: {
      input: {
        category: slugToCategory,
      },
    },
  });

  const categoryPodcasts = data.fetchCategoryPodcasts;
  return {
    props: {
      categoryPodcasts,
      category: slugToCategory,
    },
  };
};
