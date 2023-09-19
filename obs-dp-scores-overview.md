# Overview

We use a combination of Digital Pool (DP) and OBS to display match scores on a screen above each table during a tournament.

Digital pool provides a URL to display table scores when assigned to a match.

We use OBS to compose a "Scene" of "Sources". OBS supports a "Browser source" that renders web content from a URL. We use this to display the DP match scores for each table. The URL is unique by tournament name and table number. If you always reuse the same tournament name, the URL for a table remains constant, but this approach is impractical. However, using distinct tournament names requires manually updating the OBS Browser source configuration on each table screen for each tournament - a big hassle that calls out for some kind of automated solution.

# OBS/DP Automation Journey 

We wanted a way provide the tournament directors an engineering solution to define a "stable url" that could dynamically show new tournament scores with minimal manual intevention.

We started by defining an OBS browser source "stable URL" and an apache level mapping to "DP URLS".

We encountered a series of obstacles that weren't clear at first, but ultimately, they all related to the OBS browser source cache.

## Problem 1
Scene Switching - We encountered the first problem after adding scene scheduling to automatically switch to the day's tournament scene. This caused OBS to exercise the scene's source URL and cache "no tourney found". Once the DP tournament got created, there was no push signal for OBS to refresh the content.

## Solution 1
We added a manual step after creating a tourney to visit a URL to signal OBS to trigger a source refresh from an apache log file modification. This refreshed the source, but did not refresh the cache. No Dice.

## Problem 2
Source Caching - Attacking the OBS source cache. We needed a way to bust the cache.

## Solution 2
How about using a "stable url" with parameters and a client side redirect, hoping that OBS would cache the initial response and not the second response. BUT - no luck. The OBS source aggressively caches all the content, resulting in exactly the same outcome as Problem 1.

## NOTE
OBS sources distinguish between refreshing the source and refreshing the cache. We found a way to trigger refreshing the sources, but triggering cache invalidation was more elusive. There is a handy button to manually refresh cache in OBS source config, but we need an automated signal.

## Problem 3
Cache Invalidation (the final obstacle) - We need a way to invalidate the cache, but there appeared to be no automated, scriptable way of accomplishing this. Until...

## Solution 3
The final piece of the puzzle was a mystery checkbox in the source config.

![](https://github.com/playatgtb/aetv/blob/main/images/obs-source-shutdown-unchecked.png?raw=true)

What did this mean - "Shutdown source when not visible"? Could this mean that it unloaded the source and effectively invalidated the cache? What else could it mean? We had to try it. Check that box, then find a way to toggle source source visibility OFF and ON. Boom. Worked. No Way. Advanced Scene Switcher to the rescue. Yes it had a way to toggle source visibility. Indirect combination of config plus plugin macro. Excellente!

### Toggle OFF
![](https://github.com/playatgtb/aetv/blob/main/images/obs-macro-refresh-scores-1.png?raw=true)

### Wait 1 second and Toggle ON
![](https://github.com/playatgtb/aetv/blob/main/images/obs-macro-refresh-scores-2.png?raw=true)

## Final Thoughts
Integrating with OBS and Digital pool with our screens required an iterative process of learning the (sometimes unexpected) behavior of OBS, browser source, advanced screen switcher, and considerable trial and error to overcome a very aggressive OBS cache. We also had to incorporate an apache server as an intermediary for stable URLs and OBS triggers.

Our solution ultimately required a complex combination of
* OBS source settings
* Advanced Scene Switcher macros
* A per table apache instance Custom Log and mod_rewrite config
* A tournament naming convention for OBS browser sources

# OBS/DP Tourney Naming Conventions

Use the naming conventions for DP tourneys so that OBS can locate table scores using the codified URL mappings.

2-step instructions are provided in the spreadsheet.

https://docs.google.com/spreadsheets/d/1OX2CZmV_Q6k5vdQS2Dz-fTWgxkkBNy0G4ZZwIl9Sou8/edit#gid=0
