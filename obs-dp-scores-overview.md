# AETV OBS Digital Pool Scores Overview

We use a combination of Digital Pool (DP) and OBS to display match scores on a screen above each table during a tournament.

Digital pool provides a URL to display table scores when assigned to a match.

We use OBS to compose a "Scene" of "Sources". OBS supports a "Browser source" that renders web content from a URL. We use this to display the DP match scores for each table. The URL is unique by tournament name and table number. If you always reuse the same tournament name, the URL for a table remain constant, but this approach is impractical. However, using distinct tournament names requires manually updating the OBS Browser source configuration on each table screen for each tournament - a big hassle that calls out for some kind of automated solution.

# OBS Digital Pool Scores Problem & Solution 

We wanted a way provide the tournament directors an engineering solution to define a "stable url" that could dynamically show new tournament scores with minimal manual intevention.

We started by defining an OBS browser source "stable URL" and an apache level mapping to "DP URLS".

We encountered a series of obstacles that weren't clear at first, but ultimately, they all related to the OBS browser source cache.

## Problem 1
Scene Switching - The first problem with was that the screens are scheduled to switch over to the tourney scenes before the digital pool tournament was created. This caused OBS to exercise the URL and cache "no tourney found". Then when the tournament was created, there is no push signal for OBS to refresh the content.

## Solution 1
To signal OBS to refresh the scores, we added a step after creating the tourney to visit a URL, e.g. http://table-2-pc/dprefresh.html that uses apache custom log and OBS Advanced Scene Switcher to perform a source refresh on log file modification. However, this failed to work because OBS simply returned the previously cached result.

## Problem 2
Source Caching - The second problem was the OBS source cache. We needed a way to bust the cache.

## Solution 2
How about using a "stable url" with a client side redirect "http://table-2-pc/obs-scores.html?tourney=weekly8&table=2", so that OBS source caches the static html response but the html contains dynamic javascript able to redirect to the right place. However, this still didn't work. The OBS source caching was too aggressive and cached the last content returned, resulting in the same outcome as Problem 1.

## NOTE
OBS sources distinguish between refreshing the source and refreshing the cache. We found a way to trigger refreshing the sources, but triggering cache invalidation was more elusive. There is a handy button to refresh cache in OBS source config, but this is a manual button, and we need an automated signal.

## Problem 3
Cache Invalidation (the final obstacle) - We need a way to invalidate the cache, but there appeared to be no automated, scriptable way of accomplishing this. What to do.

## Solution 3
The final piece of the puzzle was discovered in the source config.

![](https://github.com/playatgtb/aetv/blob/main/images/obs-source-shutdown-unchecked.png?raw=true)

What did this mean "Shutdown source when not visible"? Could this mean that it unloaded the source and effectively invalidated the cache? What else could it mean? We had to try it. Check that box, then hide and show the source. Boom. Worked. No Way. Now, can we turn the manual steps into an automated macro? Yes. Let's toggle the visibility of the source OFF and ON.

### Toggle OFF
![](https://github.com/playatgtb/aetv/blob/main/images/obs-macro-refresh-scores-1.png?raw=true)

### Wait 1 second and Toggle ON
![](https://github.com/playatgtb/aetv/blob/main/images/obs-macro-refresh-scores-2.png?raw=true)

## Final Thoughts
Integrating with OBS and Digital pool with our screens required an iterative process of learning the ins and outs of OBS, browser source, advanced screen switcher, and considerable trial and error to overcome a very aggressive OBS browser cache.

Our solution ultimately required a complex combination of
* OBS source settings
* Advanced Scene Switcher macros
* A per table apache instance Custom Log and mod_rewrite config
* A tournament naming convention for OBS browser sources

# AETV OBS Digital Pool Scores Configuration

In a digital pool tournament, the system keeps track of the tables in use and the scores for each of them. Each table is given a URL to display the table's match score.

In this way, we are able to display the live scores on screens above the tables.

The basic setup works like this:

```
Screen -> computer -> OBS Studio -> browser source -> digital pool URL
```

However, the AETV platform has added layers of complexity:

1. We have different tournaments on different days
2. We use OBS advanced scene switcher to control automatic switching for the scheduled tournaments
3. Each screen's scene renderer uses a "browser source" configuration with a URL to get the score for that table for that tournament for that day. Each table has a "Stable URL format".
4. OBS caches the response, and due to timing reasons, we aren't guaranteed that the tourney or scores are ready at the time of automatic switchover. Therefore, we need to "refresh" obs scores via a trigger when ready
5. After creating a digital pool tourney, we need to refresh the OBS scores to recognize the newly valid DP URL. Although the OBS scores html is cached, the contents of the html include dynamic javascript reloading of the proper DP tournament/table/scores URL.
6. Go to http://table-2-pc/dpscores.html to refresh the score sources

# AETV Digital Pool Scores Spreadsheet

Use the spreadsheet to name the tournament correctly so that the screens can locate the tourney scores.

https://docs.google.com/spreadsheets/d/1OX2CZmV_Q6k5vdQS2Dz-fTWgxkkBNy0G4ZZwIl9Sou8/edit#gid=0


