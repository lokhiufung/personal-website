// import aboutMe from './posts/about-me.md';
import post1 from './posts/post1.md';
import difficulties from './posts/project-cantonese.md';
import csASRTrainingEnhancement from './posts/cs-asr-training-enhancement.md';
import VAComponents from './posts/essential-components-of-a-voice-assistant.md';


export const POSTSDATA = [
    {
        title: "End-to-end cantonese-english code switching speech recognition",
        slug: "end-to-end-cantonese-english-code-switching-speech-recognition",
        descriptions: "An journal of develping ASR model for cantonese",
        path: post1,
        imageUrl: "https://images.unsplash.com/photo-1518599807935-37015b9cefcb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isReady: false,
        tags: [
            'SpeechRecognition', 'Cantonese'
        ]
    },
    {
        title: "Difficulties in building cantonese voice chatbot",
        slug: "difficulties-building-voice-chatbot",
        descriptions: "List the difficulties in building voice chatbot in cantonese (Hong Kong)",
        path: difficulties,
        imageUrl: "https://images.unsplash.com/photo-1613491291331-677905ce6754?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        isReady: true,
        tags: [
            'VoiceAssistant', 'Cantonese', 'VoiceChatbot'
        ]
    },
    {
        title: "Enhancement for code-switching ASR",
        slug: "enhancement-for-code-switching-asr",
        descriptions: "An journal of develping ASR model for cantonese",
        path: csASRTrainingEnhancement,
        imageUrl: "https://images.unsplash.com/photo-1465343161283-c1959138ddaa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        isReady: true,
        tags: [
            'SpeechRecognition', 'Cantonese', 'CodeSwitching'
        ]
    },
    {
        title: "Essential components of a voice assistant",
        slug: "essential-components-of-a-voice-assistant",
        descriptions: "Briefly introduce each component of a voice assistant",
        path: VAComponents,
        imageUrl: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
        isReady: true,
        tags: [
            'Cantonese', 'CodeSwitching', 'ContrastiveLearning'
        ]
    },
];


export const BLOG_TITLE_MAX_LENGTH = 30;