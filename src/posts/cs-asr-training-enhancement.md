# Enhancement for code-switching ASR
##### April, 8, 2021 by [Hiu Fung Lok](/)

At this moment, I have around 600hrs of pure cantonese audio dataset, 1000 hrs of pure english audio dataset from LibriSpeech. My target is to build an ASR model with strong performance in cantonese, and being able to recognize some english words (1 or 2 words maybe) in an audio. For example, **點樣book羽毛球場**. The ASR model should correctly transcribe all the chinese words **點樣**, **羽毛球場**, and the english word **book**.

## Code-switching dataset is needed
It may not be possible to train a code-switching asr model by combining cantonese dataset and english dataset. Several experiments have been run to test this training setup. The resulting models are heavily biased to the language that they had pre-trained on (i.e, fine-tune a model that is pre-trained on LibriSpeech dataset produces a model good at english, but not so good in cantonese, and bad in code-switched data; fine-tune a model that is pre-trained on 600hrs of cantonese produces similar result, but good at cantonese.)

## Technical enhancement
### 1. Use subword tokens for english
There are only 26 (lower-cased) characters in english, while there are ~6k characters in our cantonese dataset. To balance the classes in cantonese and english, it is suggested to use subword tokens for english. We can choose the number of tokens for english in order to get comparable number of tokens with chinese characters.

### 2. Add a language identification task in training
We can explicitly force the ASR model to be aware of langauge switching. Recently some searches on code-switching ASR on mandarin + english suggested that adding a frame level langauge identification task could help improve the accuracy.


### References
- [Towards code switched ASR for end to end CTC models](https://www.microsoft.com/en-us/research/uploads/prod/2019/09/Towards_code_switched_ASR_for_End_to_End_CTC_models.pdf)
- [On end to end solution to mandarin-english code switching speech recognition](https://arxiv.org/pdf/1811.00241.pdf
)
- [Towards end to end code switching speech recognition](https://arxiv.org/pdf/1810.13091.pdf)