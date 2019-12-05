# Client, Server 모두 Webpack을 사용하여 구축해보기

**_📌 Client:_** Webpack, React, Jest

**_📌 Server:_** Webpack, Express, Winston, Mocha, Swagger

**_📌 DB:_** MongoDB

**_📌 Deploy:_** docker, docker-compose

&nbsp;

## 1. docker-compose로 배포

```bash
    # 실행
    $ docker-compose up -d

    # 종료
    # -f: 강제, -s: 정지, -v: 볼륨 삭제
    $ docker-compose rm -f -s -v
```

&nbsp;

## 2. docker로 배포

AWS EC2에서 프리티어로 제공되는 옵션으로는 docker-compose를 사용할 수 없다. 배포 중에 메모리 부족으로 실패한다.

dockerfile로 직접 이미지를 빌드하고 배포해야 한다.

```bash
    # 컨테이너들이 서로 통신할 수 있도록 같은 네트워크에 연결해야 한다.
    $ docker network create backend

    # -t는 tag를 지정하는 옵션으로 나중에 지정한 태그명으로 실행할 수 있다.
    # Client에 있는 dockerfile로 client 이미지를 만든다.
    $ docker build -t webpack_client ./client

    # Server에 있는 dockerfile로 server 이미지를 만든다.
    $ docker build -t webpack_server ./server

    # 이미지가 만들어졌는지 확인한다.
    $ docker images

    # client는 server와 연결되고
    # server는 db와 연결되므로
    # db -> server -> client 순으로 실행한다.

    # NETWORK_ID에 생성한 backend의 NETWORK ID를 넣는다.
    # mongoDB
    $ docker run -d -p 27017:27017 --network={NETWORK_ID} -e MONGO_INITDB_ROOT_USERNAME=todo MONGO_INITDB_ROOT_PASSWORD=1234 --name mongo mongo

    # server
    $ docker run -d -p 4000:4000 --network={NETWORK_ID} --name server webpack_server

    # client
    $ docker run -d -p 80:80 --network={NETWORK_ID} --name client webpack_client

    # 실행되었는지 확인한다.
    $ docker ps
```

&nbsp;

## 3. API 문서, 모니터링

**_API 문서:_** localhost:4000/swagger-api

**_모니터링:_** localhost:4000/swagger-stats/ui
