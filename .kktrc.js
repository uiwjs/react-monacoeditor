const path = require('path');
const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const pkg = require('./package.json');

const MonacoEditorSrc = path.join(__dirname, 'src');

process.env.APPSRC = path.resolve(process.cwd(), 'example');

module.exports = {
  plugins: [
    require.resolve('@kkt/plugin-less'),
  ],
  babelInclude: [path.resolve(process.cwd(), 'src')],
  // Modify the webpack config
  config: (conf, { dev, env }, webpack) => {
    conf.plugins.push(new MonacoWebpackPlugin({
      // languages: ['bat', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'pgsql', 'php', 'postiats', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'sb', 'scss', 'solidity', 'sql', 'swift', 'typescript', 'vb', 'xml', 'yaml'],
      // features: ['accessibilityHelp', 'bracketMatching', 'caretOperations', 'clipboard', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'format', 'gotoDeclarationCommands', 'gotoDeclarationMouse', 'gotoError', 'gotoLine', 'hover', 'inPlaceReplace', 'inspectTokens', 'iPadShowKeyboard', 'linesOperations', 'links', 'multicursor', 'parameterHints', 'quickCommand', 'quickFixCommands', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'wordHighlighter', 'wordOperations'],
    }));
    conf.resolve = conf.resolve || {};
    conf.resolve.extensions = ['.js', '.json'];
    conf.resolve.alias = { '@uiw/react-monacoeditor': MonacoEditorSrc };
    if (env === 'prod') {
      conf = {
        ...conf,
        optimization: {
          ...conf.optimization,
          // https://webpack.js.org/plugins/split-chunks-plugin/
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
          }
        }
      };
    }
    // 获取版本信息
    conf.plugins.push(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pkg.version),
      })
    );
    // 解析 Markdown 文件
    conf.module.rules = [
      ...conf.module.rules,
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ];

    if (env === 'prod') {
      // 生产模式下更改的 webpack 配置
      conf.entry[0] = path.resolve(process.cwd(), 'example');
      conf.output.publicPath = '';
    } else {
      conf.entry[1] = path.resolve(process.cwd(), 'example', 'index.js');
    }
    // // 更入口文件位置
    // webpackConf.entry = webpackConf.entry.map((item) => {
    //   item = item.replace(/\/react-monacoeditor\/src\//, '/react-monacoeditor/example/');
    //   console.log('item:', item);
    //   return item;
    // })
    return conf;
  },
};




// module.exports = function (webpackConf, {dev, env }) {
//   if (webpackConf) {
//     // 获取版本信息
//     webpackConf.plugins.push(
//       new webpack.DefinePlugin({
//         VERSION: JSON.stringify(pkg.version),
//       })
//     );
//     webpackConf.plugins.push(new MonacoWebpackPlugin({
//       // languages: ['bat', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'pgsql', 'php', 'postiats', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'sb', 'scss', 'solidity', 'sql', 'swift', 'typescript', 'vb', 'xml', 'yaml'],
//       // features: ['accessibilityHelp', 'bracketMatching', 'caretOperations', 'clipboard', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'format', 'gotoDeclarationCommands', 'gotoDeclarationMouse', 'gotoError', 'gotoLine', 'hover', 'inPlaceReplace', 'inspectTokens', 'iPadShowKeyboard', 'linesOperations', 'links', 'multicursor', 'parameterHints', 'quickCommand', 'quickFixCommands', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'wordHighlighter', 'wordOperations'],
//     }));
//     webpackConf.resolve = webpackConf.resolve || {};
//     webpackConf.resolve.extensions = ['.js', '.json'];
//     webpackConf.resolve.alias = { '@uiw/react-monacoeditor': MonacoEditorSrc };
//     // 更入口文件位置
//     webpackConf.entry = webpackConf.entry.map((item) => {
//       item = item.replace(/\/react-monacoeditor\/src\//, '/react-monacoeditor/example/');
//       console.log('item:', item);
//       return item;
//     })

//     if (env === 'prod') {
//       // 生产模式下更改的 webpack 配置
//       webpackConf.output.publicPath = '';
//     } else {
//       // 默认配置 devtool = 'source-map';
//       // 大型工程可以删除此配置，非常消耗编译速度
//       delete webpackConf.devtool;
//     }
//     return webpackConf;
//   }
// };
