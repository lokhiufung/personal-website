# Solution to the problems in building ASR model for HongKongers

##### May, 22, 2021 by [Hiu Fung Lok](/)

<img src="https://images.unsplash.com/photo-1557758477-df0e9cc0f61b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" width="80%">

### 1. Use subword tokens for english
There are only 26 (lower-cased) characters in english, while there are ~6k characters in our cantonese dataset. To balance the classes in cantonese and english, it is suggested to use subword tokens for english. We can choose the number of tokens for english in order to get comparable number of tokens with chinese characters.


### 1. Collect more data
The 2nd problem is more on money and data preparation. Instead of sitting in front of your computer and contributing your voice to Common voice, we can take an active role in building your own dataset. We can build an small application for audio recording and then hire speakers to contribute their voice for model development. With a larger set of training data, we should be more confident on successfully building deployment-grade models.

### 2. Add language identification as an auxiliary task to the loss function

### References
- [Towards code switched ASR for end to end CTC models](https://www.microsoft.com/en-us/research/uploads/prod/2019/09/Towards_code_switched_ASR_for_End_to_End_CTC_models.pdf)
- [On end to end solution to mandarin-english code switching speech recognition](https://arxiv.org/pdf/1811.00241.pdf
)
- [Towards end to end code switching speech recognition](https://arxiv.org/pdf/1810.13091.pdf)