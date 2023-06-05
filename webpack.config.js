const path = require('path')//node.js에서 항상 가져올수 있는 값
const Htmlplugin = require('html-webpack-plugin')//node.js에서 해당 내용을 가져온다는 의미
const CopyPlugin = require('copy-webpack-plugin')

//export
module.exports = {
  //파일을 읽어들이기 시작하는 진입점 설정 (entry)
  entry: './js/main.js',
  //entry를 통해 나온 결과물(번들)을 반환하는 과정
  output: {
    path : path.resolve(__dirname, 'dist'),//__dirname(root폴더에 dist란 폴더 생성 후),
    filename: 'main.js'/* entry의 js를 filename으로 dist에 생성 */,
    clean : true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,/* .css확장자로 끝나는 모든 css 파일을 매칭한다., s?css로 끝나는 파일도 함께 찾을 수 있음 */
        use: [
          'style-loader',/* 해석된 내용을 html 스타일에 css-loader에서 해석된 css 추가 */
          'css-loader'/* js에서 css 파일로 해설하게끔하는 loader */,
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,/* js로 끝나는 파일들을 ↓*/
        use: [
          'babel-loader'/* babel-loader로 읽어서 버전별 js파일에 적용되게끔  */
        ]
      } 
    ]
  },
  plugins : [/* 번들링 후 결과물의 처리 방식 등 다양한 플로그인 설정 */
    new Htmlplugin({/* 템플릿으로 */
      template : './index.html'/* template에 index.html 파일과 entry에 들어간 main.js의 합본을 dist에 생성 */
      
    }),
    new CopyPlugin({
      patterns: [
        {from: 'static'}/* copyplugig 플러그인을 통해서 static 안에 들어간 내용이 dist란 폴더에 들어가게끔하는 플러그인
         */
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }



}//module.export