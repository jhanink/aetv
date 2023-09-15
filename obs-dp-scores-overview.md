# AETV OBS/digital-pool-scores configuration explainer

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

PICTURE/DIAGRAM OF THE ABOVE - TBD

# AETV Digital Pool Scores spreadsheet

Use the spreadsheet to name the tournament correctly so that the screens can locate the tourney scores.

https://docs.google.com/spreadsheets/d/1OX2CZmV_Q6k5vdQS2Dz-fTWgxkkBNy0G4ZZwIl9Sou8/edit#gid=0


