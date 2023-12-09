---
title: 'Trading from first principle 1: Simple maths to help determine the stop loss and take profit'
slug: 'trading-from-first-principle'
description: ''
date: 'Dec 8, 2023'
thumbnail: '/thumbnails/cash-macanaya-X9Cemmq4YjM-unsplash.jpg'
---

# Trading from First Principle 1: Simple Maths to Help Determine the Stop Loss and Take Profit

This is the beginning of a series of articles about my thoughts on trading and how I use them in day trading. I created a platform called [Reinforce Traders](www.reinforcetraders.com), aimed at helping traders reinforce their trading strategies with their own trading journal. As the creator and a trading learner, I am going to use this platform while learning swing trading!

Let's try to play the trading game more systematically and rationally!

## The Triple Barrier

In the book "The Advance in Financial Machine Learning", the author mentioned a method called the "Triple Barrier Method" to generate labels for supervised learning. I am going to apply this idea in my trading. In any trade you make, there are 3 "barriers" that determine your return:

1. The take profit price
2. The stop loss price
3. The end of your trading horizon

With an additional line representing the start of your trade, you can define all your trade events well. If the stock price touches the take profit price before the stop loss price within the trading horizon, you win. If it touches the stop loss price before the take profit price, you lose. In the last case, if the stock price touches neither within the trading horizon, you may get a random return, ranging from the absolute difference between the stop loss price and entry price to the absolute difference between the take profit price and entry price.

## How to Set These Barriers?

The next question comes up in your mind should be how to set these barries. To do so we have to dive in more. First, you should notice that the return of a trade is random. That means you should use consider probabilities while making decisions.Let's begin defining some probabilities first.
$$
p_{+} := { The probability that the stock price hits take profit price before stop loss price in trading horizon }
p_{-} := { The probability that the stock price hits stop loss price before take profit price in trading horizon }
p_{0} := { The probability that the stock price hits neither stop loss price nor take profit price in trading horizon }

where p_{+} + p_{-} + p_{0} = 1
$$

Our goal is to make a positive return over the long run. Therefore, the expected return of a trade must be positive:
$$
E[return of a trade] > 0
$$

Let's examine what $$E[return of a trade]$$ is. For this, we introduce another random variable:
$$
r_T := { The return if the stock price hits either stop loss price nor take profit price in trading horizon }
$$

where for any return $$r$$:
$$
r := (exit_price - entry_price) / entry_price
$$

Analyzing the expected return:
$$
E[return of a trade] = E[return of a trade | r_T] = size * entry_price * (p_{+} * r_{take} - p_{-} * r_{stop} + E[r_T] * p_{0}) > 0
where the size is how many shares you buy
$$

Re-arranging the items in the inequality, we get:
$$
r_{take} > (p_{-} / p_{+}) * r_{stop} - (p_{0} / p_{+}) * E[r_T]
$$

### What Does This Inequality Tell You?
This inequailty sets the lower bound of the $$r_{take}$$ for giving $$p_{-}$$, $$p_{+}$$, $$r_{stop}$$ and $$E[r_T]$$. Your $$r_{take}$$ should be larger than this lower bound to ensure a positive expected return.

### Using the Inequality to Make Decisions
We can rephrase the inequality to aim for an average return of $$r_{excess}$$ in the long run.
$$
E[return of a trade] >= size * entry_price * r_{excess}
$$

Combining the results above, we get:
$$
r_{take} >= (1 / p_{+}) * r_{excess} + (p_{-} / p_{+}) * r_{stop} - (p_{0} / p_{+}) * E[r_T]
$$

Introducing a new variable called $$\gamma$$, which is the probability ratio of the take profit event and the stop loss event:
$$
\gamma := p_{+} / p_{-}
$$

Then, we can get the final result:
$$
r_{take} >= (1 / p_{+}) * r_{excess} + (1 / \gamma) * r_{stop} - (p_{0} / p_{+}) * E[r_{T}]
$$

This formula may seem complex, but it simplifies decision-making to five key variables:

$$r_{stop}$$: Represents your risk tolerance. Typically I will use around 2%.

$$p_{-}$$: Represents how likely the stop loss event will happen. You can make an educated guess by using chart patterns, technical indicators, news, financial reports,... etc. Whatever that can tell you the move of the stock price. Then you summarize your belief into a single number. I use %%p_{-}$$ from 0.3 to 0.4.

$$\gamma$$: Represents the probability ratio of take profit event and stop loss event. Similar to $$p_{-}$$, you need to make an educated guess. For example, if you think that there are 50-50 chance to hit the stop loss and take profit, you should set it to 1. If you think that there is more likely for the stop loss event to happen than the take profit event, you may set this number to 0.8 or 0.6.

$$E[r_{T}]: Represents the expected return when the stock price hits neither take profit nor stop loss. A good guess will be 0 for symmetry. In a trending market, you may set it to slightly postive (e.g 0.001) or slightly negative (e.g -0.001).

$$r_{excess}$$: Your desired average return over the long run.

By focusing on these five factors, you can systematically refine your trading decisions.

## Final Thought

By formulating trading decisions using the Triple Barrier method, I can set specific targets for each trade, integrating my understanding of chart patterns and financial markets. This approach not only guides my immediate trading choices but also raises several important questions for future exploration:

1. **Trade Sizing**: Given a certain amount of initial capital, what is the optimal trade size? This is crucial in managing risk while maximizing potential returns.

2. **Diversification**: When trading multiple assets simultaneously, what factors might affect the expected return? Understanding this can help in balancing a diverse portfolio.

3. **Strategy Optimization**: How can the five key factors mentioned in the article be adjusted to achieve a better expected return over risk? Fine-tuning these factors could significantly enhance trading performance.