export type Tag =
  | "My daughter"
  | "My friend"
  | "My partner"
  | "My mother"
  | "My girlfriend";

export interface Slide {
  lyrics: {
    text: string;
    bg: string;
  };
  requirements: {
    text: string;
    bg: string;
  };
  review: string;
  video: {
    src: string;
    img: string;
  };
  audio: string;
}

export const SLIDES: Record<Tag, Slide> = {
  "My daughter": {
    requirements: {
      text: "An original song <strong>a father</strong> had created for his <strong>16 year old daughter</strong>",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/yotfelcoqhbzwzccc6rq/1703070776.jpg?format=auto",
    },
    lyrics: {
      text: "Watching you grow\nTeaching you how to drive\nI'll let you go\nAs you learn how to fly\nYou can do anything",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/ikpp3ry1ggoadczcvzre/1703070836.jpg?format=auto",
    },
    video: {
      src: "https://content.songfinch.com/res/songfinch/video/upload/content-files/p9k0f9w8wrukch79ci5k/1702986807.mp4?format=auto",
      img: "https://content.songfinch.com/res/songfinch/image/upload/content-files/dk6eelvsth0q5pypyrqu/1703070791.jpg?format=auto&width=615",
    },
    review: "The perfect birthday gift. She cried happy tears!",
    audio: "daughter.mp3",
  },
  "My friend": {
    requirements: {
      text: "An original song a <strong>friend</strong> gave to her <strong>bestie</strong> for <strong>graduating with her Master's</strong>",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/b38edrgeok98eil354kz/1703070869.jpg?format=auto",
    },
    lyrics: {
      text: "Sheila Chester, and Lil' Chester, they'd be proud\nAccomplish-ment, you made your masters, say it loud\nNubian Queen, overcome so much, wow\nWe think of you and all we can do is just smile",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/ptqsllessx9sap468bif/1703070904.jpg?format=auto",
    },
    video: {
      src: "https://content.songfinch.com/res/songfinch/video/upload/content-files/xdnbxepsfsorcl2icyok/1702379729.mp4?format=auto",
      img: "https://content.songfinch.com/res/songfinch/image/upload/content-files/ndqqxpaadswfscyxd0kc/1703070888.jpg?format=auto&width=615",
    },
    review: "Captured our friendship perfectly!",
    audio: "friend.mp3",
  },
  "My partner": {
    requirements: {
      text: "An original song to celebrate <strong>10 years</strong> of <strong>marriage and love</strong>",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/ezxlb19g8sa0po4pn6mv/1703070920.jpg?format=auto",
    },
    lyrics: {
      text: "A decade of love, laughter and dreams\nTen years of memories, building our team\nThrough all of life's chapters, you're still my dream\nHere's to forever, just you and me",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/c546u335ssqilo7vxw7i/1703070946.jpg?format=auto",
    },
    video: {
      src: "https://content.songfinch.com/res/songfinch/video/upload/content-files/e6ku2qom1x9rt3q3wmdu/1702380090.mp4?format=auto",
      img: "https://content.songfinch.com/res/songfinch/image/upload/content-files/r7mki1bijxvtso2nsmmg/1703070932.jpg?format=auto&width=615",
    },
    review: "The most meaningful anniversary gift ever",
    audio: "partner.mp3",
  },
  "My mother": {
    requirements: {
      text: "An original song for <strong>Mother's Day</strong> to show <strong>gratitude and love</strong>",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/m7nayh2blbvgkdwk4z4z/1703070963.jpg?format=auto",
    },
    lyrics: {
      text: "For all the love you've given me\nEvery sacrifice you made\nYou're the reason I can be\nThe person I am today",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/gh1kamopjja0eugryg4h/1703070985.jpg?format=auto",
    },
    video: {
      src: "https://content.songfinch.com/res/songfinch/video/upload/content-files/bhnnms3lexroyk2beqr1/1702380291.mp4?format=auto",
      img: "https://content.songfinch.com/res/songfinch/image/upload/content-files/apwq1m7zuz11matgasa4/1703070972.jpg?format=auto&width=615",
    },
    review: "Mom couldn't stop crying. Thank you!",
    audio: "mother.mp3",
  },
  "My girlfriend": {
    requirements: {
      text: "An original song for a <strong>Valentine's Day</strong> surprise for my <strong>girlfriend</strong>",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/l8lshf28sq3wg5irzlgq/1703071008.jpg?format=auto",
    },
    lyrics: {
      text: "Every day with you feels like a dream\nYour smile lights up my world, or so it seems\nMy heart skips a beat when you're near\nYou're the love of my life, that much is clear",
      bg: "https://content.songfinch.com/res/songfinch/image/upload/content-files/vfjzrs8vrdi7yn5fefci/1703071035.jpg?format=auto",
    },
    video: {
      src: "https://content.songfinch.com/res/songfinch/video/upload/content-files/ve4nx6lf10gfnxtocjyu/1702380448.mp4?format=auto",
      img: "https://content.songfinch.com/res/songfinch/image/upload/content-files/qqzqbglulc6qv1xyddju/1703071021.jpg?format=auto&width=615",
    },
    review: "She said yes when I proposed with this song!",
    audio: "girlfriend.mp3",
  },
};

export const TAGS = [
  "My daughter",
  "My friend",
  "My partner",
  "My mother",
  "My girlfriend",
];
