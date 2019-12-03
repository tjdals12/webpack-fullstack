## **1. Webpack 설정**

**_mode:_** production, development, none 중에 하나를 설정. mode에 따라서 다른 최적화 옵션들이 적용된다.

> https://webpack.js.org/configuration/mode/

&nbsp;

**_devtool:_** source-map 생성 여부를 설정.

> 종류에 따라 번들링 속도가 다르므로 development, production에 따라 다르게 설정헌다.
> <br />
> development: cheap-module-eval-source-map, inline-source-map, eval-souce-map
> <br/>
> production: cheap-module-source-map

&nbsp;

**_externals:_** node_modules를 번들링에서 제외한다.

&nbsp;

**_resolve:_** 경로 및 확장자에 대한 설정

> resolve > modules 옵션을 통해 절대경로로 import 하도록 설정할 수 있다.

&nbsp;

**_plugins:_** 번들링을 도와줄 여러가지 플러그인들을 설정할 수 있다.

> EnvironmentPlugin: .env에 설정한 환경변수들을 번들링 시 전역변수로 선언해준다.
> <br>
> BundleAnalyzerPlugin: 번들링된 파일의 모듈들의 사이즈를 보여준다. 트리 쉐이킹을 위해서 많은 용량을 차지하는 모듈을 파악할 필요가 있다.
> <br>
> HardSourceWebpackPlugin: 캐싱 처리를 위한 플러그인, cache-loader 보다 성능이 좋다고 한다. (https://github.com/mzgoddard/hard-source-webpack-plugin)

&nbsp;

**_entry:_** 대상 파일의 경로. 지정한 파일에서 import한 파일들을 모두 찾아 번들링을 진행한다.

&nbsp;

**_module:_** 확장자에 따른 세부 설정. 이곳에 loader를 설정한다.

> babel-loader 말고는 특별히 설정할 것이 없다.

&nbsp;

**_output:_** 번들링된 파일이 저장될 경로와 이름을 설정한다.

&nbsp;
&nbsp;

## 2. 테스트 작성

supertest를 사용하여 테스트를 할 경우, koa는 listen을 한 후 리턴되는 객체를 supertest에 전달하고 express는 app 객체를 그대로 전달한다.

📎 app.js

```javascript
// Expres
import express from 'express';
const app = express();

// Koa
import Koa from 'koa';
const app = new Koa();

export default app;
```

&nbsp;

📎 \*.test.js

```javascript
// app.js를 불러오면 app 객체를 가져온다.
import app from 'app';
import supertest from 'supertest';

describe('...', () => {
    // Koa를 사용하는 경우 listen 호출하고 리턴되는 객체를 supertest에 전달해야 하기 때문에 담을 변수를 선언한다.
    let server;

    // app 객체를 가져왔기 때문에 listen을 호출하여 서버를 열어야 한다.
    before(done => {
        // Express는 app 객체를 supertest에 app 객체를 전달하면 되기 때문에 열기만 하면 된다.
        app.listen(4000, () => {
            console.log('Server running at localhost:4000');
            done();
        });

        // koa는 리턴된 값을 받는다.
        server = app.listen(...생략);
    });

    it('GET /api/todos', (done) => {
        // Express
        supertest(app).get ...

        // Koa
        supertest(server).get ...
    })
});
```

&nbsp;
&nbsp;

## 3. Logger 추가

winston 사용, morgan도 있지만 커스터마이징 측면에선 winston이 더 좋은 것 같다. morgan은 파일로만 log를 찍어봤고 콘솔에는 못 찍어봤다. color를 입힐 수 있을지 모르겠다.

windoston.format.combine 을 통해서 커스터마이징 할 수 있고 콘솔에 찍으려면 winston.format.printf를 마자막에 추가한다.

**_더 다양한 옵션이 있겠지만 지금은 이 정도로도 충분한 것 같으므로 더 적지않고 필요한 경우 찾아보고 추가해야 겠다._**

&nbsp;

📎 logger.js

```javascript
    /** 파일에 기록하든, 콘솔에 기록하는 아래의 내용은 필요하므로 공통 format으로 정의하였다. */
    const commonFormat = format.combine(
        // level이 소문자를 찍히는게 이쁘지 않아서 대문자로 바꾼다.
        // 원래는 printf에 적용하려 했지만 color가 적용된 문자는 toUppercase()가 작동되지 않는다.
        format(info => ({ ...info, level: info.level.toUppercase() })),

        // 마지막 printf에는 level과 message가 기본적으로 제공되지만, 이렇게 추가적으로 제공할 수 있다.
        format.label({ label: 'APP_NAME' })
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' })
    )


    /** 이렇게 콘솔용 format을 정의하여 마지막에 다시 combine 해주면 된다. */
    const consoleFormat = format.combine(
        // winston-timestamp-colorize를 추가적으로 설치하면 timestamp에도 color를 적용할 수 있다.
        timestampColorize({ color: 'yellow' })

        // 기본적으로 제공되는 color 적용 옵션이다.
        format.colorize({
            // level, message를 따로 적용할 수도 있고, 이렇게 둘 다 한번에 적용할 수도 있다.
            all: true,

            // level에 따라 다른 color를 적용할 수 있다.
            colors: { info: 'blue', error: 'red', debug: 'yellow' }
        })

        // timestamp와 label은 위에서 정의한 commonFormat에서 추가했기 때문에 전달받을 수 있다.
        format.printf(({ timestamp, label, level, message }) => {
            // 원하는 형태의 문자열로 조합하여 리턴하면 된다.
            return `${timestamp} ${label} [${level}] - ${message}`;
        })
    )
```

&nbsp;

이제 winston.createLogger를 통해 커스터마이징 Logger를 만들어 export 한다.

📎 logger.js

```javascript
const logger = winston.createLogger({
    // error, warn, info, http, verbose, debug, silly
    // 설정한 값보다 상위에 있는 레벨은 출력돠지 않는다.
    level: 'debug',

    // log를 찍을 방식을 정한다. 여러 개의 지정할 수 있다.
    // 콘솔에도 찍고, 파일에도 찍을 수 있다.
    // 파일에 찍고 싶으면 winston-daily-rotate-file을 설치해야 한다.
    transports: [new winston.transports.Console()],

    // 위에서 정의한 포맷을 적용한다. 물론 위에서 정의할 필요없이 바로 적용해도 상관없다.
    // 파일과 콘솔에 둘 다 찍을 경우 위의 transports에서 각 transport에 개별적으로 옵션을 적용해준다.
    // 왜냐하면 아래처럼 color까지 적용된 log를 파일에 찍을 경우 color가 적용된 부분은 유니코드로 찍혀나온다.
    format: format.combine(commonFormat, consoleFormat),
});

// log를 찍어야 되는 곳에서 불러와야 하므로 export 한다.
// logger.info('메시지를 적는다'); 이런식으로 적용한다.
// logger.silly('이건 출력되지 않는다.'); 현재 설정한 level이 debug이기 때문에 silly는 출력되지 않는다. (debug보다 level이 높기 때문이다.);
export default logger;
```

&nbsp;

이제 필요한 곳에서 logger를 불러와 사용하면 된다. 하지만 이걸 필요한 모든 곳에서 불러와서 사용하는 것보다 미들웨어로 적용하면 깔끔할 것 같은데 방법을 모르겠다.

```javascript
import logger from './logger';

logger.info('Server running at localhost:4000');
```

&nbsp;
&nbsp;

## 4. Swagger 추가

Swagger는 API 문서화를, swagger-stats는 API의 모니터링을 도와주는 라이브러리이다. swagger-stats는 처음 적용해봤는데 삽질을 꽤나 했다. 알고나면 정말 쉽지만 swagger로 API 문서화를 한번도 해본 적이 없다면 아마 중간에 하다 때려칠 것 이다. 공식문서에도 설명이 조금 부실한 것 같다..
elasticsearch와도 연동할 수 있다고 해서 나중에 한번 해봐야 겠다.

express와 koa에서 각각 적용하는 방법이 다르다.

스펙을 정의하는 부분은 동일하지만 필요한 패키지와 미들웨어를 적용하는 방법이 다르다. 그리고 koa는 기존엔 /swaager 를 라우트 주소로 사용할 수 있었는데 버전이 바뀌면서 되지 않는 것 같다. (몇 개월 전에 했던 개인 프로젝트에서는 /swagger를 적용하였다.) /swagger-api도 안된다.

먼저 필요한 패키지를 설치한다.

```bash
    # 이건 express, koa 둘 다 똑같다.
    $ yarn add swagger-jsdoc swagger-stats

    # express
    $ yarn add swagger-ui-express

    # koa
    # koa-static: 불러와서 사용하진 않지만 없으면 에러난다.
    # express-to-koa: swagger-stats에 적용하려면 필요하다. (swagger-stats는 사용하는 프레임워크에 따라 설정 방법이 다르다.)
    $ yarn add swagger-ui-koa koa-convert koa-mount koa-static express-to-koa
```

&nbsp;

app.js에서 불러와서 사용할 수 있지만 깔끔하게 관리하기 위해서 swagger.js로 분리하여 작성한다.

📎 swagger.js

_\[express\]_

```javascript
    import swaggerJSDoc from 'swagger-jsdoc';
    import swaggerUI from 'swagger-ui-express';

    // API 스펙을 정의한다.
    // 어떤 사람들은 options = {} 로 정의하고 swaggerUI.setup 할 때 swaggerJSDoc으로 감싼다. 근데 그렇게 하면 자동완성이 되지 않는다.
    const options = swaggerJSDoc({
        // swagger가 제공해주는 페이지 상단에 들어갈 정보들이다.
        // host와 basePath는 swagger로 API를 테스트할 때 http://<host>/<basePath> 형식으로 prefix 해준다.
        // 나중에 각 API에 스펙을 작성할 때 /api/v1을 생략할 수 있어서 편하다. host는 설정 안해도 상관없다.
        swaggerDefinition: {
            info: {
                title: 'Express App',
                description: 'Example API',
                version: '0.0.1',
            },
            host: 'localhost:4000',
            basePath: '/api/v1',
        },

        // apis는 우리가 적성한 API 스펙을 수집한다. .js에 /** @swagger ... */ 형식 또는 .yaml에 작성해야 불러온다. 원래는 js에 작성했지만 들여쓰기를 일일이 해야 해서 yaml로 작성하는걸로 바꿧다.
        apis: ['./src/api/**/*.js' 또는 './src/api/**/*.yaml'],
    })

    // app.js에서 불러와서 사용할 수 있게 export 한다.
    // app.use('/swagger-apis', swaggerUI.serve, swaggerUI.setup(options)); 이렇게 작용하면 된다.
    // 원래는 따로따로 export 할려했는데 app.use에 나열하는 방식이라면 배열로 내보내고 비구조화 할당을 하면 될 것 같아서 해봤더니 됐다.
    // app.use(...swaggerConfig); 이런식으로 적용하면 된다.
    export const swaggerConfig = ['/swagger-api', swaggerUI.server, swaggerUI.setup(options)];

    // swagger-stats를 적용하는 부분이다. 역시 app.js에서 사용할 수 있도록 export 한다.
    // app.use(statsConfig); 이렇게 적용하면 된다.
    export const statsConfig = swaggerStats.getMiddleware({
        // 공식문서에는 json을 불러와서 전달해주는 것만 나와있어서 json만 되는 줄 알았다.
        // 근데 swaggerJSDoc으로 설정한 options를 전달해주니깐 되었다. 이것도 삽질하느라 시간이 좀 걸렸다..
        swaggerSpec: options,

        // apis에서 수집한 것만 모니터링한다. false로 하면 favicon 요청하는 것도 모니터링 되는걸 확인할 수 있다.
        swaggerOnly: true
    })
```

> ! 꼭 라우터보다 먼저 적용해야 된다. 안그러면 swagger-stats에서 모니터링이 안된다. <br/>
> /swagger-stats/ui를 접속해보면 페이지는 뜨지만 API를 추적하지 못하는 것을 확인할 수 있다. 하루종일 이걸로 삽질했다.

&nbsp;

_\[koa\]_

```javascript
    import swaggerJSDoc from 'swagger-jsdoc';
    import swaggerUI from 'swagger-ui-koa';
    import convert from 'koa-convert';
    import mount from 'koa-mount';
    import e2k from 'express-to-koa';
    import swaggerStats from 'swagger-stats';

    // express와 똑같으므로 생략한다.
    const options = ...

    // swaggerServe와 swaggerUI.setup을 한번에 적용할 수 없다.
    // 각각 export 해서 사용할 수 있지만, 이번에 app 객체를 전달받아 적용해주는 함수를 만들어서 export 했다.
    // app.js에서 swaggerConfig(app); 이렇게 적용하면 된다.
    export default (app) => {
        app.use(swaggerUI.server);

        // convert와 mount가 어떤 역할을 하는진 잘 모르겠다.
        app.use(convert(mount('/swagger-apis', swaggerUI.setup(swaggerJSDoc(options)))));

        app.use(e2k(swagger.getMiddleware({
            swaggerSpec: options,
            swaggerOnly: true
        })))
    }
```
