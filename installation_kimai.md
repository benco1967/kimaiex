# Installation Kimai sur le serveur de l'art du bois

date: 22/11/2020
auteur: Benoît Chanclou (benoitchanclou@sfr.fr)

## documentation
- Kimai : https://www.kimai.org/documentation/installation.html
- ionos : https://my.ionos.fr/hosting-overview

## création de la base  de données

Base de données : dbs1038013

|Description|base données kimai|
|---|---|
|Nom d'hôte|db5001214024.hosting-data.io|
|Port|3306|
|Nom d'utilisateur|dbu616494|
|Type et version|MySQL 5.7|
|Stockage|0 / 1000 MB utilisé(s)|
|Mot de passe|******* (idem connexion ionos)|
|Sauvegardes|Les 7 derniers jours|

## installation

- modification du mot de passe ssh/ftp de l'utilisateur u87412334: idem admin
- connexion via l'utilisateur 
- git est opérationnel
- git clone de kimai
- La version de php par défaut est la 4.4.9 !
- il faut utiliser `/usr/bin/php7.4-cli` en lieu est place de php
- pas d'accès au compte root ou à sudo, impossible de changer la version de php par défaut
- pas de `.bashrc` impossible de changer le path
- la documentation de Kimai (https://www.kimai.org/documentation/installation.html#ionos--11) indique 
  - composer: /usr/bin/php7.4-cli composer.phar install --no-dev --optimize-autoloader
  - installation: /usr/bin/php7.4-cli bin/console kimai:install -n
  - /usr/bin/php7.4-cli bin/console kimai:create-user NCH nicolas.chanclou@lart-du-bois.com ROLE_SUPER_ADMIN
 
