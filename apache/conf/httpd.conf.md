# httpd.conf configuration

## MAC

```
<Directory "/Library/WebServer/Documents">
    Options Indexes Multiviews FollowSymLinks
    MultiviewsMatch Any
    AllowOverride All
    Order allow,deny
    Allow from all
    Require all granted
</Directory>
```

add at the end of `<IfModule log_config_module>`

```
    # --- Refresh Browser Sources ---
    SetEnvIf Request_URI 89balls\.png dprefreshlog
    CustomLog "/private/var/log/dprefresh.log" common env=dprefreshlog
```

start and stop apache

```
apachectl -k start | stop
```

## WINDOWS

update `<Directory "${SRVROOT}/htdocs">`

```
  Options Indexes Multiviews FollowSymLinks
  MultiviewsMatch Any
  AllowOverride All
  Require all granted 
```

add at the end of `<IfModule log_config_module>`

```
  # --- Refresh Browser Sources ---
  SetEnvIf Request_URI 89balls\.png dprefreshlog
  CustomLog "logs\dprefresh.log" common env=dprefreshlog

  # --- CMD: switch scene ---
  SetEnvIf Request_URI cmd-switch-general\.png general
  CustomLog "logs\cmd-switch-general.log" common env=general

  SetEnvIf Request_URI cmd-switch-mezz9\.png mezz9
  CustomLog "logs\cmd-switch-mezz9.log" common env=mezz9

  SetEnvIf Request_URI cmd-switch-usapl8\.png usapl8
  CustomLog "logs\cmd-switch-usapl8.log" common env=usapl8

  SetEnvIf Request_URI cmd-switch-weekly8\.png weekly8
  CustomLog "logs\cmd-switch-weekly8.log" common env=weekly8
```

start and stop apache

```
net start | stop Apache2.4
```
