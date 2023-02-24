import { prisma } from "@prisma/client";
import { GraphQLContext, PodcastInput, SpotifyAPI } from "../../util/types";
import fetch from "node-fetch";

export const podcastResolvers = {
  Mutation: {
    createPodcast: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;

      let { podcast, category, image } = input;

      category = category?.toLowerCase();

      const getCategory = await prisma.category.findFirst({
        where: {
          name: category,
        },
      });

      await prisma.podcast.create({
        data: {
          title: podcast,
          imageUrl: image,
          category: {
            connect: {
              id: getCategory?.id,
            },
          },
        },
      });

      const getPodcast = await prisma.podcast.findFirst({
        where: {
          title: podcast,
        },
      });

      console.log(podcast);

      await prisma.category.update({
        where: {
          id: getCategory?.id,
        },
        data: {
          podcast: {
            connect: {
              id: getPodcast?.id,
            },
          },
        },
      });

      console.log("GETPODCAST", getPodcast?.id);

      return true;
    },
  },
  Query: {
    getPodcasts: async (parent: any, args: any, context: GraphQLContext) => {
      const { prisma } = context;
      try {
        const podcasts = await prisma.podcast.findMany({
          take: 6,
        });
        return podcasts;
      } catch (error) {
        console.log(error);
      }
    },
    fetchSpotifyPodcast: async (
      parent: any,
      { input }: SpotifyAPI,
      context: GraphQLContext
    ) => {
      const { accessToken, prisma } = context;
      const { podcast } = input;

      try {
        const result = await fetch(
          `https://api.spotify.com/v1/search?q=${podcast}&type=show&market=US&limit=1`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + accessToken },
          }
        );

        const data = await result.json();
        return data?.shows?.items;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
