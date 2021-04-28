# Difficulties in building voice assistant for HongKongers

## Background
This is the biggest work I have been doing in IMIMR. Our company has been working on building a virtual assistant which is capable of undestanding cantonese. (Almost everyone speaks canotonese in Hong Kong)

Cantonese is a language within the Chinese branch of the Sino-Tibetan languages originating from the city og Guangzhou (also known as Canton) and its surrounding area in Southeastern China... if you want to know more about the background or history of cantonese, please go with the [wiki page](https://en.wikipedia.org/wiki/Cantonese). I just copy from that~

## Difficulties in building a voice assistant for HongKongers

### 1. Code-switching habbit in Hong Kong speaker
As citizens of a international city, HongKongers speak relatively frequently in English. Yes, we speak both cantonese and english, and we also speak a mix of these 2 languages. This "code-switching" habbit is very common in speakers in Hong Kong, and this phenomena adds a layer of complexity in building a voice assistant for HongKongers.

### 2. Limited amount of resources for cantonese
Another big difficulty is that there are limited resources for building cantonese. As I know the largest and the most convinent dataset for training speech recognition models is from [common voice](https://commonvoice.mozilla.org/zh-HK/datasets). It contains around 100 hrs of audio data (with transcriptions) with 2,536 speakers. On the other hand, there are 2,181 hrs of audio data with 66,173 speakers for english in common voice. We can see that the amount of data for training speech recognition models for cantonese is not comparable with english. Most of existing SOTA end-to-end deep learning models for speech recognition is built and evaluated using english training dataset (e.g LibriSpeech, WSJ, etc). Direct application of these models on the current cantonese dataset may not result in acceptable accurarcy.

## What can we do?
The 2nd problem is more on money and data preparation. Instead of sitting in front of your computer and contributing your voice to Common voice, we can take an active role in building your own dataset. We can build an small application for audio recording and then hire speakers to contribute their voice for model development. With a larger set of training data, we should be more confident on successfully building deployment-grade models.




