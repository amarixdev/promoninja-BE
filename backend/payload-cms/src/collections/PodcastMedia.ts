import { CollectionConfig } from "payload/types";

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const podcastMedia: CollectionConfig = {
  slug: "podcast-media",
  admin: {
    useAsTitle: "alt",
  },
  upload: {
    staticURL: "/media/podcast",
    staticDir: "media/podcast",
    imageSizes: [
      {
        name: "card",
        width: 640,
        height: 480,
      },

    ],
  },
  fields: [
    {
      name: "alt",
      type: "relationship",
      relationTo: "podcasts",
      required: false,
    },
  ],
};

export default podcastMedia;
