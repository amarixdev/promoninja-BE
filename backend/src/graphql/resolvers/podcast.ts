import fetch from "node-fetch";
import {
  GraphQLContext,
  PodcastInput,
  SponsorInput,
  SpotifyAPI,
  TopPicksInput,
} from "../../util/types";

export const podcastResolvers = {
  Mutation: {
    createPodcast: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;

      let {
        podcast,
        category,
        image,
        publisher,
        description,
        backgroundColor,
        externalUrl,
      } = input;
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
          publisher,
          backgroundColor,
          description,
          externalUrl,
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

      return true;
    },
    updateColor: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;
      const { backgroundColor, podcast, externalUrl } = input;
      console.log("updating...");
      await prisma.podcast.update({
        where: {
          title: podcast,
        },
        data: {
          backgroundColor,
        },
      });
      return true;
    },

    updateOffers: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;
      const { podcast, offer } = input;

      await prisma.podcast.update({
        where: {
          title: podcast,
        },
        data: {
          offer: {
            set: offer,
          },
        },
      });

      return true;
    },

    deletePodcast: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      try {
        const { prisma } = context;
        const { podcast } = input;

        const getPodcast = await prisma.podcast.findFirst({
          where: {
            title: podcast,
          },
        });

        const getCategory = await prisma.category.findFirst({
          where: {
            podcastId: {
              has: getPodcast?.id,
            },
          },
        });

        /* Disconnect sponsor from it's category  */
        await prisma.category.update({
          where: {
            id: getCategory?.id,
          },
          data: {
            podcast: {
              disconnect: {
                id: getPodcast?.id,
              },
            },
          },
        });

        /* Disconnect podcast from all sponsors  */
        await prisma.podcast.update({
          where: {
            title: podcast,
          },
          data: {
            sponsors: {
              set: [],
            },
          },
        });

        await prisma.podcast.delete({
          where: {
            title: podcast,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    getPodcasts: async (parent: any, args: any, context: GraphQLContext) => {
      const { prisma } = context;
      try {
        const all_podcasts = await prisma.podcast.findMany({
          include: {
            category: true,
          },
        });

        return all_podcasts;
      } catch (error) {
        console.log(error);
      }
    },
    getPodcast: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;
      const { podcast: podcastTitle } = input;

      try {
        const podcast = await prisma.podcast.findFirst({
          where: {
            title: {
              equals: podcastTitle,
              mode: "insensitive",
            },
          },
          include: {
            category: true,
            sponsors: true,
          },
        });

        if (!podcast) {
          return false;
        }
        return podcast;
      } catch (error) {
        console.log(error);
      }
    },

    fetchSpotifyPodcast: async (
      parent: any,
      { input }: SpotifyAPI,
      context: GraphQLContext
    ) => {
      const { accessToken } = context;
      const { podcast, offset } = input;
      try {
        const result = await fetch(
          `https://api.spotify.com/v1/search?q=${podcast}&type=show&market=US&offset=${offset}&limit=1`,
          {
            method: "GET",
            headers: { Authorization: "Bearer " + accessToken },
          }
        );

        const data = await result.json();
        return data?.shows?.items;
      } catch (error) {
        console.log(error);
      }
    },
    fetchCategoryPodcasts: async (
      parent: any,
      { input }: PodcastInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;
      const { category } = input;

      try {
        const getCategory = await prisma.category.findFirst({
          where: {
            name: category,
          },
        });

        const category_podcasts = await prisma.podcast.findMany({
          where: {
            categoryId: {
              equals: getCategory?.id,
            },
          },
        });

        return category_podcasts;
      } catch (error) {
        console.log(error);
      }
    },
    getSponsorPodcasts: async (
      parent: any,
      { input }: SponsorInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;
      const { name, isCategoryPage } = input;

      const getSponsor = await prisma.sponsor.findFirst({
        where: {
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
      });

      const podcasts = await prisma.podcast.findMany({
        where: {
          sponsorId: {
            has: getSponsor?.id,
          },
        },
        include: {
          category: true,
        },
      });

      return podcasts.sort(() => Math.random() - 0.5).slice(0, 3);
    },
    getTopPicks: async (
      parent: any,
      { input }: TopPicksInput,
      context: GraphQLContext
    ) => {
      const { prisma } = context;
      const { podcastTitles } = input;

      const topPicks = await prisma.podcast.findMany({
        where: {
          title: {
            in: podcastTitles,
          },
        },
        include: {
          category: true,
          sponsors: {
            select: {
              name: true,
              imageUrl: true,
            },
            take: 3,
          },
        },
      });

      return topPicks.sort(() => Math.random() - 0.5);
    },
  },
};
