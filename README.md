# Automated Entertainment

Code, instructions, documentation, and help files for projects that fuel Automated Entertainment

## Digital Pool

* custom css for OBS DP scores
* client side redirects used for stable DP score urls

## Apache
* htdocs
  * 89balls.png
  * cmd-switch-XXX.png
    * XXX=general|mezz9|usapl8|weekly8
  * dpscores.html
  * obs-scores.html
  * obs-command.html
* httpd.conf

## Steps to add a new switch command

ON table-2-pc, add command to the map in obs-command.html

```
  const ALLOWED_VALUES = {
    'general': 'general',
    'mezz9': 'mezz9',
    'usapl8': 'usapl8',
    'weekly8': 'weekly8',
    'gtah': 'gtah',
  }
```

ON each target table-N-pc

* in htdocs, add cmd-switch-XXX.png
* in httpd.conf, add custom log 
```
   # --- CMD: switch scene ---
  SetEnvIf Request_URI cmd-switch-XXX\.png XXX
  CustomLog "logs\cmd-switch-XXX.log" common env=XXX
```
* net stop Apache2.4
* net start Apache2.4
* add SSS custom file modification macro to advanced scene switcher
   
## OBS
  * scenes
  * score sources
  * advanced scene switcher

## OBS Commands

Added a "command" pattern that can be used to trigger OBS Advanced Scene Switcher macros.
The "commands" are web services on the master node table-2-pc.

### All Commands
* dpscores.html
  * parameters: None
  * description: used to refresh the DP score caches on all tables
* obs-command.html
  * parameters: c=COMMAND_NAME, v=VALUE
  * description: a general command pattern

### Switch Scene command
  * example: table-2-pc/obs-command.html?c=switch&v=mezz9
  * effect: changes all the screens to mezz9
