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
