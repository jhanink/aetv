# Automated Entertainment

Code, instructions, documentation, and help files for projects that fuel Automated Entertainment

## Digital Pool

* custom css for OBS DP scores
* client side redirects used for stable DP score urls

## Apache
* htdocs
  * 89balls.png
  * dpscores.html
  * obs-scores.html
* httpd.conf
    ```
    # MAC
    <Directory "/Library/WebServer/Documents">
      Options Indexes Multiviews FollowSymLinks
      MultiviewsMatch Any
      AllowOverride All
      Order allow,deny
      Allow from all
      Require all granted
    </Directory>

    # WINDOWS
    <Directory "${SRVROOT}/htdocs">
      Options Indexes Multiviews FollowSymLinks
      MultiviewsMatch Any
      AllowOverride All
      Require all granted 
    </Directory>
    ```

    ```
    <IfModule log_config_module>
      # MAC
      SetEnvIf Request_URI 89balls\.png dprefreshlog
      CustomLog "/private/var/log/dprefresh.log" common env=dprefreshlog

      # WINDOWS
      SetEnvIf Request_URI 89balls\.png dprefreshlog
      CustomLog "logs\dprefresh.log" common env=dprefreshlog
    </IfModule>
    ```
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
