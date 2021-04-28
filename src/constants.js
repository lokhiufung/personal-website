import aboutMe from './posts/about-me.md';
import post1 from './posts/post1.md';
import projectCantonese from './posts/project-cantonese.md';
import csASRTrainingEnhancement from './posts/cs-asr-training-enhancement.md'

export const POSTSDATA = [
    {
        title: "End-to-end cantonese-english code switching speech recognition",
        slug: "end-to-end-cantonese-english-code-switching-speech-recognition",
        descriptions: "An journal of develping ASR model for cantonese",
        path: post1,
        imageUrl: "",
        isReady: false,
    },
    {
        title: "Project Cantonese",
        slug: "project-cantonese",
        descriptions: "An journal of develping ASR model for cantonese",
        path: projectCantonese,
        imageUrl: "",
        isReady: true,
    },
    {
        title: "Enhancement for code-switching ASR",
        slug: "enhancement-for-code-switching-asr",
        descriptions: "An journal of develping ASR model for cantonese",
        path: csASRTrainingEnhancement,
        imageUrl: "",
        isReady: true,
    },
];


export const BLOG_TITLE_MAX_LENGTH = 30;