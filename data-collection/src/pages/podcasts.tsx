import { GetStaticProps } from "next";
import Image from "next/image";
import React from "react";
import client from "../graphql/apollo-client";
import { Operations } from "../graphql/operations";

type Props = {
  podcastsData: Podcast[];
};

interface Podcast {
  title: string;
  imageUrl: string;
}

const Podcasts = ({ podcastsData }: Props) => {

  return (
    <div className="grid grid-cols-8 mt-10 space-y-4 px-6">
      {podcastsData.map((pod) => (
        <div key={pod.title}>
          <Image
            src={pod?.imageUrl}
            alt={pod?.title}
            width={100}
            height={100}
            className={"rounded-3xl"}
          />
          <h1 className="text-white text-xs font-semibold">{pod.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default Podcasts;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: Operations.Queries.GetPodcasts,
  });

  const podcastsData = data?.getPodcasts;
  return {
    props: { podcastsData },
  };
};
