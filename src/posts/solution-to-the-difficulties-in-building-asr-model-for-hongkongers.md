# Solution to the difficulties in building ASR model for HongKongers

##### May, 22, 2021 by [Hiu Fung Lok](/)

<!-- <img src="https://images.unsplash.com/photo-1557758477-df0e9cc0f61b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" width="90%"> -->
<img src="https://docs.google.com/drawings/d/e/2PACX-1vSH_we7ddR8OWBMglEBuOtwNAknk1xsFXLaQGMrLRKxEugONkSwQTz6U97ZbPgn36MrGk4_GzhKrPYG/pub?w=960&h=720" width="90%"/>

## Overview
As described in [last post](/post/difficulties-in-building-asr-model-for-hongkongers), there are difficulties in building an ASR model for HongKongers. In this post, I will talk about 3 ways to tackle these difficulties.

### 1. Use subword tokens for english
There are only 26 (lower-cased) characters in english, while there are ~6k characters in our cantonese dataset. This class imbalance in the softmax layer makes training difficult (a [common problem](http://www.chioka.in/class-imbalance-problem/) in classification task). To balance the classes in cantonese and english, it is suggested to use subword tokens for english. We can choose the number of tokens for english in order to get comparable number of tokens with chinese characters. We can train our customized tokenizer with [sentencepiece](https://github.com/google/sentencepiece) using corpus from [librispeech](https://www.openslr.org/12).

### 2. Collect more data
Getting more good quality data for training can alway boost up the performace of a model. We need 2 kind of audio-text data: 1) cantonese only; 2) cantonese + english. *1)* is standard for training an ASR model. One just need to prepare a set of corpus and invite many speakers to record their speech. [Wiki dump](https://dumps.wikimedia.org/) is a good data source for getting cantonese corpus.

Getting *2)* is a little bit tricky. There are no publicly available corpus for code-switching cantonese. A recent research suggest 2 ways to produce code-switching corpus: **word translation** and **word insertion**. We can first conduct word segmentaion and POS tagging on cantonese corpus. Then we randomly select a noun/verb and conduct word-to-word translation. For word insertion, we also first conduct word segmentation on the corpus. Then we randomly select an english word from an english [lexicon](https://en.wikipedia.org/wiki/Lexicon), and insert the word into the utterance at a random position.

### 3. Add language identification as an auxiliary task to the loss function
Getting the correct token while there are 2 possible languages in the audio signal definitly gives challenges to asr model training. And there are far more cantonese tokens than english tokens in a single transcription. (e.g *最近嘅apple store 喺邊*). Adding an task to force the model to identify the lanaguge of the predicted token should help predict the correct tokens. The model should be noted that there may be 2 lanaguages in a single sample by the gradient feedback from the language identification loss.     

### References
- [Towards code switched ASR for end to end CTC models](https://www.microsoft.com/en-us/research/uploads/prod/2019/09/Towards_code_switched_ASR_for_End_to_End_CTC_models.pdf)
- [On end to end solution to mandarin-english code switching speech recognition](https://arxiv.org/pdf/1811.00241.pdf
)
- [Towards end to end code switching speech recognition](https://arxiv.org/pdf/1810.13091.pdf)
- [Data augmentation for end to end code switching speech recognition](https://arxiv.org/pdf/2011.02160.pdf)
