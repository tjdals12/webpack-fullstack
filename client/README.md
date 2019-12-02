## **1. Webpack 설정**

**_mode:_** production, development, none 중에 하나를 설정. mode에 따라서 다른 최적화 옵션들이 적용된다.

> https://webpack.js.org/configuration/mode/

&nbsp;

**_devtool:_** source-map 생성 여부를 설정.

> 종류에 따라 번들링 속도가 다르므로 development, production에 따라 다르게 설정헌다. <br />
> **_development:_** cheap-module-eval-source-map, inline-source-map, eval-souce-map <br />
> **_production:_** cheap-module-source-map

&nbsp;

**_resolve:_** 경로 및 확장자에 대한 설정

> resolve > modules 옵션을 통해 절대경로로 import 하도록 설정할 수 있다.

&nbsp;

**_plugins:_** 번들링을 도와줄 여러가지 플러그인들을 설정할 수 있다. 케싱을 위한 플러그인이나 css 추출, 각 번들링 용량을 보여주는 플러그인 등

> Html과 Css를 위한 플러그인을 꼭 설정해야 한다. <br/>
> html-webpack-plugin: html template을 지정하고 번들링된 js와 css 파일을 자동으로 추가해준다. <br/>
> (리액트에선 id가 root인 요소에 Root Component를 추가하기 때문에 id가 root인 요소가 추가돤 html 파일을 사용해야 한다.) <br/>
> mini-css-extract-plugin: 합쳐진 css를 따로 파일로 추출한다.

&nbsp;

**_entry:_** 대상 파일의 경로. 지정한 파일에서 import한 파일들을 모두 찾아 번들링을 진행한다.

&nbsp;

**_module:_** 확장자에 따른 세부 설정. 이곳에 loader를 설정한다.

> 리액트에서 아래의 loader는 필수로 설정한다. <br/> > **_babel-loader:_** ES6 이상의 문법을 변환해준다.<br/> > **_html-loader:_** html을 합쳐준다. <br/> > **_css-loader, sass-loader_**: css, scss 스타일 파일을 합쳐준다. <br/> > **_file-loader, url-loader_**: static file들을 output 경로에 복사하거나 문자열로 변환해준다. <br/>

&nbsp;

**_output:_** 번들링된 파일이 저장될 경로와 이름을 설정한다.

&nbsp;
&nbsp;

## **2. Jest 설정**

package.json에 테스트를 위해 jest 설정을 추가한다. 루트 디렉토리에 jest.config.js를 만들어 설정해도 된다.

&nbsp;

**_collectCoverageFrom:_** 테스트할 파일들에 대한 정보를 수집, 테스트 관련 정보가 없어도 수집된다.

&nbsp;

**_testMatch:_** 테스트 파일들을 찾는다. default로 \_\_tests\_\_ 폴더 내에 _.test, _.spec 이름으로 정의된 .js, jsx, ts, tsx 파일들을 찾는다.

&nbsp;

**_transform:_** 지정한 파일을 지정한 플러그인으로 변환하도록 설정한다.

> 원래는 babel 설정을 웹팩에 babel-loader 부분에 함께 설정했지만, jest에서도 babel 설정이 필요하기 때문에 package.json에 작용하였다. babel.config.js 파일을 만들어 설정해도 된다. 하지만 기존처럼 .babelrc는 인식을 하지 못하는 것 같다.

&nbsp;

**_transformIgnorePatterns:_** transform을 제외할 파일을 설정한다.

&nbsp;

**_setupFilesAfterEnv:_** 각 테스트 전에 실행할 코드나 테스트 프레임워크를 설정하는 모듈의 목록 (설정 파일을 지정할 수도 있는 것 같다.)

> @testing-library/react/cleanup-after-each: 각 테스트 케이스가 끝날때마다 기존에 가상의 화면에 남아있는 UI 를 정리합니다. v9.0.0 부터 자동으로 지원해준다고 한다.<br/>
> @testing-library/jest-dom/extend-expect: jest에서 DOM 관련 matcher를 사용할 수 있게 해준다.

&nbsp;
&nbsp;

## **3. 개발용 웹팩 설정**

devServer를 설정하여 번들 파일 생성없이 지정한 포트로 실행할 수 있다.

&nbsp;

**_contentBase:_** output 경로를 적어줌. 이 경로에서 실행할 파일을 찾음. <br/>
**_index:_** 해당 경로에서 실행할 파일 <br/>
**_port:_** 실행할 포트 <br/>
**_historyApiFallback:_** 새로고침 시에도 해당 경로에 해당하는 페이지를 불러오도록 해줌.<br/>
**_proxy:_** API 요청을 위한 설정 <br/>
