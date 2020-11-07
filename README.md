## Prerequisite

Have a mongo database running.

### Fedora mongo installation

add mongodb.repo file with the following content

```
[Mongodb]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

then run  
```bash
sudo dnf install mongodb-org
```

use systemctl to manage mongod server, example
```bash
sudo systemctl start/stop/status mongod.service
```

in mongoshell add necessary users with `db.createUser()`

enable access control in mongod modifying file /etc/mongod.conf adding 
```
security:
  authorization: enabled
```
