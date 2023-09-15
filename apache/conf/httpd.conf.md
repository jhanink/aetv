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
```
