# Run in development mode

## Start database
Using docker, run mysql.  
```sh
docker run --name bingwa-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:9
```

## Start app
```sh
npm run start:dev
```


## Reference
1. [mysql docker](https://hub.docker.com/_/mysql)
