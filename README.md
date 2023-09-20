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
