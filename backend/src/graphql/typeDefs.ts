import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    getPodcasts: [Podcast]
    getPodcast(input: PodcastInput!): Podcast
    getPodcastCategory(input: PodcastInput!): Category
    getPodcastSponsors(input: PodcastInput!): [Sponsor]
    getSponsors(input: Pagination): [Sponsor]
    getSponsor(input: SponsorInput!): Sponsor
    getSponsorCategories: [SponsorCategory]
    getSponsorCategory(input: SponsorCategoryInput!): SponsorCategory
    getSponsorPodcasts(input: SponsorInput!): [Podcast]
    getCategorySponsors(input: SponsorCategoryInput!): [Sponsor]
    getCategoryPodcasts(input: String!): [Podcast]
    getTopPicks(input: TopPicksInput!): [Podcast]
    getTrendingOffers(input: TrendingOffersInput!): [Sponsor]
    fetchCategory(input: PodcastInput!): String
    getPodcastCategories: [Category]
    fetchSponsors(input: PodcastInput!): [Sponsor]
    fetchSpotifyPodcast(input: SpotifyAPI!): [Items]
    fetchCategoryPodcasts(input: PodcastInput!): [Podcast]
    getSponsorsCount(input: CountInput!): Int
  }

  type Mutation {
    createPodcast(input: PodcastInput!): Boolean
    updateCategory(input: UpdateCategoryInput!): Boolean
    updateColor(input: PodcastInput!): Boolean
    updateOffers(input: PodcastInput!): Boolean
    createSponsor(input: PodcastInput!): Boolean
    updateSponsor: Boolean
    deletePodcastSponsor(input: DeleteInput): Boolean
    deleteSponsor(input: DeleteInput): Boolean
    deletePodcast(input: PodcastInput!): Boolean
  }

  input SpotifyAPI {
    podcast: String
    offset: Int
  }

  type Items {
    id: ID
    images: [Image]
    name: String
    publisher: String
    description: String
    external_urls: External_urls
  }

  type Image {
    height: Int
    url: String
    width: Int
  }

  type External_urls {
    spotify: String
  }

  input DeleteInput {
    sponsor: String
    podcast: String
    category: String
  }

  input PodcastInput {
    sponsor: SponsorInput
    podcast: String
    category: String
    image: String
    publisher: String
    description: String
    backgroundColor: String
    externalUrl: String
    offer: [OfferInput]
  }

  input OfferInput {
    sponsor: String!
    promoCode: String!
    url: String!
  }

  input SponsorInput {
    name: String!
    url: String
    description: String
    image: String
    baseUrl: String
    category: String
    summary: String
    promoCode: String
    offer: String
    isCategoryPage: Boolean
  }

  input TopPicksInput {
    podcastTitles: [String]
  }

  input TrendingOffersInput {
    sponsors: [String]
  }

  type Podcast {
    id: ID!
    title: String!
    imageUrl: String
    categoryId: [Int]
    category: [Category]
    sponsors: [Sponsor]
    offer: [Offer]
    publisher: String
    description: String
    backgroundColor: String
    externalUrl: String
  }

  type Category {
    id: ID
    name: String
    podcastId: [ID]
  }
  type Offer {
    sponsor: String!
    promoCode: String!
    url: String!
  }
  type Sponsor {
    name: String
    imageUrl: String
    url: String
    summary: String
    offer: String
    podcast: [Podcast]
    podcastId: [ID]
    sponsorCategory: [Category]
  }

  input SponsorCategoryInput {
    sponsor: String
    category: String
    offset: Int
    pageSize: Int
  }

  input UpdateCategoryInput {
    oldCategory: String!
    newCategory: String!
    podcastTitle: String
    sponsorName: String
  }

  input Pagination {
    offset: Int
    pageSize: Int
    offerPage: Boolean
    path: Boolean
  }
  input CountInput {
    category: String
    isCategory: Boolean
  }

  type SponsorCategory {
    name: String!
    sponsor: [Sponsor]
  }
`;

export default typeDefs;
