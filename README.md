# Project 94

Voting System

[https://gitorko.github.io/voting-system/](https://gitorko.github.io/voting-system/)

### Version

Check version

```bash
$java --version
openjdk 17.0.3 2022-04-19 LTS

node --version
v16.16.0

yarn --version
1.22.18
```

### Redis

```bash
docker run --name my-redis -p 6379:6379 -d redis redis-server --requirepass "password"
```

### Dev

To run the backend in dev mode.

```bash
./gradlew clean build
./gradlew bootRun
```

To Run UI in dev mode

```bash
cd ui
yarn install
yarn build
yarn start
```

Open [http://localhost:4200/](http://localhost:4200/)

### Prod

To run as a single jar, both UI and backend are bundled to single uber jar.

```bash
./gradlew cleanBuild
cd build/libs
java -jar project94-1.0.0.jar
```

Open [http://localhost:8080/](http://localhost:8080/)

### Docker

```bash
./gradlew cleanBuild
docker build -f docker/Dockerfile --force-rm -t project94:1.0.0 .
docker images |grep project94
docker tag project94:1.0.0 gitorko/project94:1.0.0
docker push gitorko/project94:1.0.0
docker-compose -f docker/docker-compose.yml up
```
