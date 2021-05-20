import dotenv from "dotenv";

import difficulties from './posts/difficulties-in-building-asr-model-for-hongkongers.md';
import csASRTrainingEnhancement from './posts/solution-to-the-difficulties-in-building-asr-model-for-hongkongers.md';
import VAComponents from './posts/essential-components-of-a-voice-assistant.md';


export const POSTSDATA = [
    {
        title: "Solutions to the difficulties in building ASR model for HongKongers",
        slug: "solution-to-the-difficulties-in-building-asr-model-for-hongkongers",
        descriptions: "Describe solutions to the difficulties of training ASR model in cantonese (Hong Kong)",
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
    {
        title: "Difficulties in building ASR model for HongKongers",
        slug: "difficulties-in-building-asr-model-for-hongkongers",
        descriptions: "List the difficulties in building an ASR model in cantonese (Hong Kong)",
        path: difficulties,
        imageUrl: "https://images.unsplash.com/photo-1613491291331-677905ce6754?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        isReady: true,
        tags: [
            'VoiceAssistant', 'Cantonese', 'VoiceChatbot'
        ]
    },
];


// export const BLOG_TITLE_MAX_LENGTH = 30;
export const BASE_NAME = process.env.BASE_NAME;