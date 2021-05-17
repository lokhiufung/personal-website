# Difficulties in building building ASR model for HongKongers
##### May, 11, 2021 by [Hiu Fung Lok](/)

<img src="https://images.unsplash.com/photo-1612698903786-00d4b6f52246?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80" width="90%"/>

## Background
Cantonese is a language within the Chinese branch of the Sino-Tibetan languages originating from the city og Guangzhou (also known as Canton) and its surrounding area in Southeastern China... if you want to know more about the background or history of cantonese, please go with the [wiki page](https://en.wikipedia.org/wiki/Cantonese). I just copy from that~


## Difficulties
### 1. Code-switching habbit in Hong Kong speakers
With the unique history of Hong Kong, Hong Kong people speak both cantonese and english. Most of the time, Hong Kong people speak mixed of both languages. For example, we are comfortable to say **"Apple"** instead of **"蘋果"** when we talk about the **Apple Inc**. This is the so called "code-switching" behavior described by the linguists. The ASR model must be aware of switching of languages in the speech signal. This definitely adds difficulty in training an end-to-end ASR model, since the model must discover there are 2 languages in a speech signal during training.

### 2. The amount of training data
Cantonese is a kind of low resource language. There are limited amount of resources for training ASR model. One popular cantonese training dataset for ASR model is common voice's [zh-hk](https://commonvoice.mozilla.org/zh-HK/datasets). It contains around 14 hrs of validated audio-text data with 2,536 speakers. On the other hand, there are 2,181 hrs of audio data with 66,173 speakers for english in common voice. We can see that the amount of data for training speech recognition models for cantonese is not comparable with english. Most of existing SOTA end-to-end deep learning models for speech recognition is built and evaluated using english training dataset (e.g LibriSpeech, WSJ, etc). Direct application of these models on the current cantonese dataset may not result in acceptable performance.






