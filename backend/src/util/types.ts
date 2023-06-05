import { PrismaClient } from "@prisma/client";

export interface Sponsor {
  name: string;
  url: string;
  promoCode: string;
  image: string;
  baseUrl: string;
  category: string;
  offer: string;
  summary: string;
}

export interface GraphQLContext {
  prisma: PrismaClient;
  accessToken: string;
}

export interface PodcastInput {
  input: PodcastData;
}

export interface PodcastData {
  sponsor: Sponsor;
  podcast: string;
  category: string;
  image: string;
  publisher: string;
  description: string;
  backgroundColor: string;
  externalUrl: string;
  offer: OfferData[];
}

interface OfferData {
  url: string;
  promoCode: string;
  sponsor: string;
}

export interface SponsorInput {
  input: SponsorData;
}

export interface SponsorData {
  name: string;
  url?: string;
  description?: string;
  image?: string;
  isCategoryPage?: boolean;
}

export interface DeleteInput {
  input: DeleteData;
}

interface DeleteData {
  sponsor: string;
  podcast: string;
  category: string;
}

export interface SpotifyAPI {
  input: SpotifyAPIData;
}

interface SpotifyAPIData {
  podcast: string;
  id: number;
  offset: number;
}

export interface SponsorCategory {
  name: string;
}

export interface SponsorCategory {
  input: SponsorCategoryInput;
}

export interface SponsorCategoryInput {
  category: string;
  sponsor: string;
  pageSize: number;
  offset: number;
}

export interface UpdateCategoryInput {
  input: {
    oldCategory: string;
    newCategory: string;
    podcastTitle: string;
    sponsorName: string;
  };
}

export interface TopPicksInput {
  input: {
    podcastTitles: string[];
  };
}

export interface TrendingOffersInput {
  input: {
    sponsors: string[];
  };
}

export interface Pagination {
  input: {
    offset: number;
    pageSize: number;
    offerPage: boolean;
    path: boolean;
  };
}

export interface CountInput {
  input: {
    isCategory: boolean;
    category: string;
  };
}
