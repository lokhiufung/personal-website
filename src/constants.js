// import aboutMe from './posts/about-me.md';
import post1 from './posts/post1.md';
import difficulties from './posts/project-cantonese.md';
import csASRTrainingEnhancement from './posts/cs-asr-training-enhancement.md'

export const POSTSDATA = [
    {
        title: "End-to-end cantonese-english code switching speech recognition",
        slug: "end-to-end-cantonese-english-code-switching-speech-recognition",
        descriptions: "An journal of develping ASR model for cantonese",
        path: post1,
        imageUrl: "https://images.unsplash.com/photo-1518599807935-37015b9cefcb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isReady: false,
    },
    {
        title: "Difficulties in building cantonese voice assistant",
        slug: "difficulties-building-voice-assistant",
        descriptions: "List the difficulties in building voice assistant in cantonese (Hong Kong)",
        path: difficulties,
        imageUrl: "https://images.unsplash.com/photo-1613491291331-677905ce6754?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        isReady: true,
    },
    {
        title: "Enhancement for code-switching ASR",
        slug: "enhancement-for-code-switching-asr",
        descriptions: "An journal of develping ASR model for cantonese",
        path: csASRTrainingEnhancement,
        imageUrl: "https://images.unsplash.com/photo-1465343161283-c1959138ddaa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isReady: true,
    },
];


export const BLOG_TITLE_MAX_LENGTH = 30;