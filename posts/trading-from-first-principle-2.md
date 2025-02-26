---
title: 'Trading from First Principle 2: Enhancing Financial Time Series Analysis with Fractional Differentiation in Feature Engineering'
slug: 'trading-from-first-principle-2'
description: 'In my previous article, we dived into the methodology for determining take profit and stop loss strategies, based on the estimation of five key parameters: r_{stop}, p_{-}, \gamma, E[r_{T}]. A natural progression from there is to explore how to refine these estimations. This article will focus on leveraging publicly available data, such as daily market data from Yahoo Finance, to enhance our trading for these parameters.'
date: 'Dec 24, 2023'
thumbnail: '/thumbnails/trading-from-first-principle-1.png'
---

In my previous article, we dived into the methodology for determining take profit and stop loss strategies, based on the estimation of five key parameters: r_{stop}, p_{-}, \gamma, E[r_{T}]. A natural progression from there is to explore how to refine these estimations. This article will focus on leveraging publicly available data, such as daily market data from Yahoo Finance, to enhance our trading for these parameters.

# Starting with data
We begin with the aggregation of publicly available data from diverse sources to accurately model the parameters of interest. The foundation for a robust trading strategy is laid by solidifying our understanding and confidence in these parameters. Yahoo Finance serves as our starting point, offering a decade’s worth of daily historical market data for the entire Nasdaq (e.g. Open, High, Low, and Close (OHLC) prices.)

# Feature Engineering in Financial Data
In the realm of modeling, feature engineering emerges as a crucial step. It is the craft of transforming raw data into informative features that significantly influence the performance of our models. However, the creation of effective features is not always straightforward and often requires insightful manipulation of the raw data.

# Studying the time series
A key aspect of time series analysis is ensuring stationarity, meaning the absence of significant trends. Simple differencing is a common technique to achieve stationarity:

d_{t} := x_{t}— x_{t-1}

While this transformation can remove the stationarity in the time series, it comes with a cost — the loss of ‘memory’ in the data. That means that the time series now does not contain information about trends (auto-correlations in the time series). This ‘memory’ or autocorrelation is vital for identifying and leveraging trends in the data, an aspect crucial for building robust predictive models in trading. How can you build a trend trading strategy based on a model that does not rely on trends?

# Balancing stationarity and memory
Thankfully, mathematicians have developed an elegant solution: fractional differencing. This approach generalizes the concept of differencing, allowing us to differentiate with fractional orders. Such flexibility enables us to finely tune the balance between retaining memory and achieving stationarity in our time series.

# Mathematical details of fractional differencing
Consider the backshift operator, denoted as B, which when applied to a function x_{t}​:

B(x_{t}) = x_{t-1}

It shifts the value of x at time t to the value of x at time t-1. You can do this repeatedly to obtain older values of x too.

B(B(x_{t})) = B(x_{t-1}) = x_{t-2}

It turns out that the backshift operator offers a new perspective on differencing. Now we can define the difference d_{t} with the operator (1-B):

d_{t} = (1-B)x_{t}

and you can easily check that they are identical.

(1-B)x_{t} = x_{t)-B(x_{t}) = x_{t}-x_{t-1}

You can also obtain higher order differences by repeatedly applying this differencing operator (1-B). To illustrate this, let’s try to find the second order of difference first:

d_{t}-d_{t-1} = (x_{t}-x_{t-1})-(x_{t-1}-x_{t-2}) = x_{t}-2x_{t-1}+x_{t-2}

Then let’s use the differencing operator to get the same result:

(1-B)(1-B)x_{t} = (1–2B+BB)x_{t} = x_{t} -2x_{t-1}+x_{t_2}

To sum up, the differencing operator gives us a nice way to generalize differencing to any order:

d-th order of difference := [(1-B)**d]x_{t}, where d can be any real number.

Things get interesting when 0 < d < 1. When d = 0, you have the original series with all the memory preserved and the series is non-stationary. On the other hand, when d = 1, you have the first-order difference without memory and the series becomes stationary. When 0 < d < 1, there is a sweet spot where the series can maximally preserve the memory while maintaining the stationarity.

Here is a simple implementation of the fractional differentiation in Python.
```python
import numpy as np


def get_weights(d: float, size: int) -> np.ndarray:
    # Weights for fractional differentiation
    # the series of weights is a binomail series?
    w = [1.]
    for k in range(1, size):
        w.append(-w[-1] * ((d - k + 1)) / k)
    w = np.array(w[::-1]).reshape(-1, 1)
    return w


def frac_diff(array: np.ndarray, d: float, threshold=0.01) -> np.ndarray:
    """
    Applies fractional differentiation to a time series.

    :param array: A time series data.
    :param d: Fractional d (d).
    :param threshold: Cutoff threshold for weights.
    :return: Fractionally differentiated series.
    """
    # Length of the time series
    array_length = len(array)

    # Getting the weights
    weights = get_weights(d, array_length)

    # Adjust weights for threshold
    weights = np.array(weights[np.abs(weights) > threshold])
    diff_series_length = array_length - len(weights) + 1

    # Applying the weights to the series
    diff_series = []
    for i in range(diff_series_length):
        window = array[i:i + len(weights)]
        # Handle scalar result of np.dot
        result = np.dot(weights.T, window)
        if np.isscalar(result):
            diff_series.append(result)
        else:
            diff_series.append(result[0])

    return np.array(diff_series)

```

# How to choose the perfect fraction?
The idea is to balance the stationarity and the memory. First of all, we need to measure them with well-defined quantities. We can use the Augmented Dickey-Fuller (ADF) statistics to measure the stationarity and the correlation coefficient to measure the linear pattern between the original series and the transformed series. Let’s visualize these 2 quantities with different values of d between 0 and 1:

The left y-axis is the correlation coefficient and the right y-axis is the adf statistics. the dotted horizon line shows the 95% confidence level of rejecting the stationarity hypothesis. We can see from the graph that when d ~ 0.17, the series is fairly stationary while it still maintains a very high correlation to the original series.


# Reference
1. Fractionally Differentiated Features: Advances in Financial Machine Learning (2018, Marcos Lopez de Prado)
2. Lecture 3/10 — Data Analysis: https://www.quantresearch.org/Lectures.htm