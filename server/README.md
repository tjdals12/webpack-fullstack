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

app.js

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

\*.test.js

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
