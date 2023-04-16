import gql from "graphql-tag";

export const Operations = {
  Queries: {
    GetPodcasts: gql`
      query {
        getPodcasts {
          title
        }
      }
    `,
    GetPodcast: gql`
      query ($input: PodcastInput!) {
        getPodcast(input: $input) {
          title
          imageUrl
          publisher
          description
          backgroundColor
          externalUrl
          offer {
            sponsor
            promoCode
            url
          }
        }
      }
    `,
    GetPodcastCategory: gql`
      query ($input: PodcastInput!) {
        getPodcastCategory(input: $input) {
          name
        }
      }
    `,
    FetchSponsors: gql`
      query ($input: PodcastInput!) {
        fetchSponsors(input: $input) {
          name
          imageUrl
          offer
          url
        }
      }
    `,
    GetSponsors: gql`
      query {
        getSponsors {
          name
          imageUrl
          url
        }
      }
    `,
    GetSponsorCategories: gql`
      query {
        getSponsorCategories {
          imageUrl
          name
        }
      }
    `,
    GetSponsorCategory: gql`
      query ($input: String!) {
        getSponsorCategory(input: $input) {
          name
          imageUrl
        }
      }
    `,
    GetSponsorPodcasts: gql`
      query ($input: SponsorInput!) {
        getSponsorPodcasts(input: $input) {
          title
          imageUrl
          publisher
          description
          backgroundColor
          offer {
            sponsor
            promoCode
            url
          }
        }
      }
    `,

    GetCategorySponsors: gql`
      query ($input: String!) {
        getCategorySponsors(input: $input) {
          name
          imageUrl
          url
          summary
          offer
        }
      }
    `,
    FetchSpotifyPodcast: gql`
      query ($input: SpotifyAPI!) {
        fetchSpotifyPodcast(input: $input) {
          id
          name
          publisher
          images {
            url
          }
        }
      }
    `,
    FetchCategoryPodcasts: gql`
      query ($input: PodcastInput!) {
        fetchCategoryPodcasts(input: $input) {
          title
          imageUrl
          publisher
        }
      }
    `,
  },
  Mutations: {
    CreatePodcast: gql`
      mutation ($input: PodcastInput!) {
        createPodcast(input: $input)
      }
    `,
    CreateSponsor: gql`
      mutation ($input: PodcastInput!) {
        createSponsor(input: $input)
      }
    `,
    DeletePodcastSponsor: gql`
      mutation ($input: DeleteInput) {
        deletePodcastSponsor(input: $input)
      }
    `,
  },
};
