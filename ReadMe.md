# Voting System


Run redis docker image
```bash
docker run -p 6379:6379 -d redis redis-server --requirepass "password"
```

Check version of node,npm,angular
```
node --version
v16.14.2
npm --version
8.5.0
npm i -g @angular/cli
ng --version
Angular CLI: 13.3.3
npm i -g yarn
yarn --version
1.22.18c
npm install @cds/angular --save
```

```bash
docker build -f docker/Dockerfile --force-rm -t project94:1.0.0 .
docker images
docker-compose -f docker/docker-compose.yml up 
```
