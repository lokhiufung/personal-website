# Essential components of a voice chatbot
##### May, 18, 2021 by [Hiu Fung Lok](/)

<img src="https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" width="100%"/>

## Overview
<img src="https://docs.google.com/drawings/d/e/2PACX-1vTAMcqZr2HqTYZA-LHdAWCHqucfCcmSWK8njdc6NQVs-0C5lsbwxbskzIpVD--nXsMm76K99GDUUSTE/pub?w=960&amp;h=720">

### Speech recognition
This part transcribes user audio signal. The transcription should be as accurate as possible, since only with accurate transcription can the natural language influence engine understand what exactly the user needs. The speech recognition system should be robust against any environment noises (i.e traffic, weather, sounds from streets), and various voices from any speakers.

End-to-end models for speech recognition are more common today. (e.g recurrent neural network based model, Deep Speech 1/2/3; convolution neural network based model, Wav2Letter/Jasper) All of these model achieve supreme perfermance in benchmarking dataset, like librispeech (3.86% [word error rate](https://en.wikipedia.org/wiki/Word_error_rate) using greedy decoder!). 

Recently, inspired by the success of BERT in NLP tasks, researchers starts to pretrain a speech encoder with massive amount of unlabelled audio. The pretrained model shows  significant power on speech recognition task when it is fine-tuned with small amoount of labelled audio data, thanks to the representations learned in the model during the pretraining stage. Thanks to Facebook's FAIR research team, we now can fine-tune a speech recognition model on smaller amount of data and achieve remarkable performance. Using only 10 minutes of labeled data, the team still achieves 4.8/8.2 world error rate on clean/other test sets of librispeech. This BERT-like fine-tuning training significantly helps companies to develop speech recognition models on low resources languages (e.g, cantonese)

### Text to speech
This is the output part of the entire voice chatbot system. This part converts text answers from the natural language influence engine to audio answers. We hope that the synthesized audio should be natural and human-like. The naturalness (in terms of [Mean Opinion Score](https://en.wikipedia.org/wiki/Mean_opinion_score)) of synthesized speech has been significantly improved over the pass few years by using deep neural networks.

<img src="https://images.unsplash.com/photo-1603184017968-953f59cd2e37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80" width="80%">

WaveNet should be one the earliest attemps to replace tranditional [concatenative TTS](https://scholar.google.com/citations?view_op=view_citation&hl=en&user=Es-YRKMAAAAJ&citation_for_view=Es-YRKMAAAAJ:u5HHmVD_uO8C) and HMM based speech synthesis model with a deep neural network. It directly models the raw waveform of the audio signal. This model produces more natural-sounding speech.

Later work by Google research team on text to speech is Tacotron/Tacotron2. This model separates in 2 sub-models: a mel-spectrogram generator and a neural vocoder. The mel-spectrogram generator models the mel-spectrogram with text input. Then, the generated mel-spectrogram will be fed into a neural encoder (e.g WaveNet) to generate audio signals from mel-spectrogram.

More improvements on this kind of two- stages models has been made. WaveRNN uses recurrent neural network to improve the latency problem of WaveNet during the deployment phrase. WaveGlow uses a flow-based generative model to generate audio samples in faster-than-real-time.   

### Natural langauge understanding
This is the core part of the entire chatbot system. User’s intent (or query) will be extracted 
Thanks to the recent success of BERT in many NLP tasks, we now can have a more context aware language model. Below are some of the popular choices for the natural language understanding engines:

### 1. FAQ style engine
FAQ (Frequently Ask Questions~FYI) is a set of question-answer pairs. The purpose of this kind of engine is to find the most relevant question from the FAQ set with the user's input question. One possible scenario of application is a chatbot for customer service. People may want to know more about the services provided by a company. Then, a FAQ-style chatbot will be perfect for this company to communicate with their customers. For example, …

Models like Sentence-BERT (https://arxiv.org/pdf/1908.10084.pdf) help easily compute dense vector representations for sentences, paragraphs. We can encode all FAQ questions as dense vectors and use these vectors as searching indexes. Since the dense vectors are context aware, the searching should robustly handle the various user input questions, even with different syntax. (e.g “What is Town gas?” vs “Tell me more about Town Gas”).

Despite the simplicity of this approach, the ability of this chatbot is limited by the pre-defined FAQ set. The chatbot can only give answers within the FAQ set. Therefore, this kind of engine may only serve as an information center.

### 2. Intent determination and slot filling  
Instead of FAQ question answering, we may want to have a more versatile chatbot. These bot can do more than just chatting. We hope that they can help us work on any task that we want - a virtual assistant.

Generally, we need to extract the intent and slots from user input. An intent is what action the user wants to do. This may be expressed as a function with some arguments. Slots are those arguments to be filled into the function. The bot then should be able to take the action for the user by calling this function with arguments filled.

This model (https://zxdcs.github.io/pdf/spoken_language_understanding.pdf) can jointly determine the intent and slot from user input. A set of intents and named entities should be defined for training and deployment. The immediate limitation of this model is the level of natural language understanding is constrained by the size of pre-defined intents and named entities, but it is still much more flexible than the FAQ style engine.


### Reference
- [Jasper: An End-to-End Convolution Neural Acoustic Model](https://arxiv.org/pdf/1904.03288.pdf)
- [Wav2Letter: an End-to-End ConvNet-based Speech Recognition System](https://arxiv.org/pdf/1609.03193.pdf)
- [wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations](https://arxiv.org/pdf/2006.11477.pdf)
- [WaveNet: A generative mdoel for raw audio](https://deepmind.com/blog/article/wavenet-generative-model-raw-audio)
- [Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions](https://arxiv.org/abs/1712.05884)
- [Efficient Neural Audio Signal](https://arxiv.org/pdf/1802.08435v2.pdf)
- [WaveGlow: A Flow-based Generative Network For Speech Synthesis](https://arxiv.org/pdf/1811.00002.pdf)
