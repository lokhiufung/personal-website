---
title: 'Lessons from my first trading journey in 2018 — Can arbitrage make me rich?'
slug: 'lessons-from-my-first-trading-journey'
description: 'In 2018, I started a journey into the world of cryptocurrency trading and software development with minimal experience. Alongside a knowledgeable friend, I learned new concepts in trading, cryptocurrency, and software development. Our adventure led us through highs and lows, culminating in valuable lessons that reshaped our approach to technology and finance.'
date: 'Dec 16, 2023'
thumbnail: '/thumbnails/lessons-from-my-first-trading-journey.png'
---

# Lessons from my first trading journey in 2018 — Can arbitrage make me rich?

In 2018, I started a journey into the world of cryptocurrency trading and software development with minimal experience. Alongside a knowledgeable friend, I learned new concepts in trading, cryptocurrency, and software development. Our adventure led us through highs and lows, culminating in valuable lessons that reshaped our approach to technology and finance.

## Starting Out

Initially, my experience was limited to using Jupyter notebooks for financial data analysis in Python. However, my friend’s proficiency in trading and software development was pivotal. He proposed an architectural framework for our algorithmic trading system, setting the stage for our ambitious project.

## The Arbitrage Strategy: Identifying Market Opportunities

We noticed price discrepancies for the same cryptocurrency on two different exchanges — Deribit and BitMex. This observation presented an arbitrage opportunity: simultaneously taking short positions in one exchange and long positions in the other. This strategy appeared as a safe way to profit with minimal market exposure.

Enthused by these arbitrage opportunities, we immediately began developing an algorithmic trading system to capitalize on what seemed like ‘free money’.

## Facing Failure: The Reality Check

After four months of intense development and testing, we faced a hard truth. Our system failed to generate sufficient profits to cover our costs, leading us to discontinue the project.

## Key Lessons: Reflections and Insights

### Simplify Before You Amplify

Our primary aim was to profit from exchange price differences. However, we overlooked the simplest method to validate this idea. Instead of manually executing trades for a couple of weeks to test viability, we invested four months in developing complex systems. This approach was costly in terms of time and effort, yet it yielded no significant returns.

### The Complexity of Software Development

We grossly underestimated the time and complexity involved in software development. Debugging consumed a major portion of our schedule, leading to a project timeline four times longer than anticipated. This experience was a stark reminder of the intricacies of software engineering, even for those with strong mathematical backgrounds like us, who can be reasonably good at logic.

## Looking Forward: Applying Our Learnings

### Clear Goals and Simple Validation

Before initiating any project, setting clear, falsifiable goals is crucial. For instance, setting a target daily return or Sharpe ratio for a trading strategy. Simple, hands-on validation methods can provide early insights into the project’s feasibility and direct you toward a more evidence-based approach.

For example, in our arbitrage strategy, a hands-on validation method could have been to manually execute trades based on observed price differences between Deribit and BitMex. Over a two-week period, we could have tracked the number of successful trades, the average profit per trade, and the time taken to execute these trades. This data would have provided us with tangible evidence, such as:

1. **Frequency of Arbitrage** Opportunities: How often did price discrepancies occur? This would give us an idea of the potential volume of trades.
2. **Average Profit Margin**: What was the average profit we made from each trade? This would help assess if the profits were significant enough to pursue the strategy on a larger scale.
3. **Execution Time and Slippage**: How quickly were we able to execute trades, and what was the slippage from our target prices to the actual executed prices? This would inform us about the practical challenges in real-time trading and whether these factors significantly impacted our profits.

This evidence would have been crucial in assessing the practicality and profitability of our arbitrage strategy. It could have either validated our approach, leading us to invest more confidently in developing the automated system, or it could have revealed flaws or limitations in our strategy, saving us time and resources.

## Emphasizing Testing in Software Development

The importance of writing automatic tests cannot be overstated. They ensure stability, reveal logic bugs early, and facilitate smoother team collaboration. Our experience in the arbitrage project highlighted the need to prioritize testing over rapid development to enhance overall productivity.

Take, for example, the critical component of order flow management in our trading system. Managing the flow of trade orders accurately is essential to execute an arbitrage strategy effectively. Without automatic tests, there’s a risk of introducing bugs that could lead to misplaced or duplicated orders, or failures in timely order execution, potentially resulting in financial loss or missed opportunities.

By implementing comprehensive automatic tests, we could have ensured:

1. **Order Execution Accuracy**: Tests to verify that the system correctly places orders based on our trading strategy. This would include checks for the right order types, amounts, and targeted cryptocurrencies.
2. **Timely Order Processing**: Tests to simulate various network conditions to ensure orders are processed promptly, even under high latency scenarios. This is critical in a fast-moving market where delays can lead to significant price discrepancies.
3. **Error Handling and Recovery**: Tests to ensure the system appropriately handles failed or partially filled orders. The system should be able to make quick decisions to either retry, cancel, or adjust these orders based on current market conditions and the specifics of our trading strategy.
4. **Concurrent Order Management**: Simulating a scenario where multiple orders are placed simultaneously to ensure the system can handle concurrent order flows without errors or performance bottlenecks.

These automatic tests would provide a safety net, ensuring that the order flow management component of our system is robust, reliable, and effective under various market conditions. Regularly running these tests after each system update would also help in maintaining the system’s integrity over time. Furthermore, in a collaborative environment, these tests act as a standard benchmark for code changes, fostering better team coordination and understanding.

## Final Thoughts and Future Directions

This journey transformed us into more seasoned developers. Our improved skills in software development have led to a more robust trading system that now can assist cryptocurrency exchanges in order management and liquidity provision.

In a future article, I plan to talk about the architectural design of an automatic trading system, incorporating the wisdom gained from our past experiences.