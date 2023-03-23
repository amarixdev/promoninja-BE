import gql from "graphql-tag";

export const Operations = {
  Queries: {
    GetPodcasts: gql`
      query {
        getPodcasts {
          title
          imageUrl
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
          offer {
            sponsor
            description
            url
          }
        }
      }
    `,
    FetchSponsors: gql`
      query ($input: PodcastInput!) {
        fetchSponsors(input: $input) {
          name
          imageUrl
          url
        }
      }
    `,
    GetSponsors: gql`
      query {
        getSponsors {
          name
          url
        }
      }
    `,
    FetchSpotifyPodcast: gql`
      query ($input: SpotifyAPI!) {
        fetchSpotifyPodcast(input: $input) {
          id
          name
          publisher
          description
          images {
            url
          }
        }
      }
    `,
    FetchCategory: gql`
      query ($input: PodcastInput!) {
        fetchCategory(input: $input)
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
    DeleteSponsor: gql`
      mutation ($input: DeleteInput) {
        deleteSponsor(input: $input)
      }
    `,
    UpdatePodcast: gql`
      mutation ($input: PodcastInput!) {
        updatePodcast(input: $input)
      }
    `,
    DeletePodcast: gql`
      mutation ($input: PodcastInput!) {
        deletePodcast(input: $input)
      }
    `,
  },
};
