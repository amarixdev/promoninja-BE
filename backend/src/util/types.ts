import { PrismaClient } from "@prisma/client";
import { Sponsor } from "../../../data-collection/src/utils/types";

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
}

export interface SponsorInput {
  input: SponsorData;
}

export interface SponsorData {
  name: string;
  url: string;
  description: string;
  image?: string;
}

export interface DeleteInput {
  input: DeleteData;
}

interface DeleteData {
  sponsor: string;
  podcast: string;
}

export interface SpotifyAPI {
  input: SpotifyAPIData;
}

interface SpotifyAPIData {
  podcast: string;
  id: number;
}
