const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const MonacoEditorSrc = path.join(__dirname, 'src');

module.exports = function (webpackConf, ServerConf) {
  if (webpackConf) {
    // 获取版本信息
    webpackConf.plugins.push(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pkg.version),
      })
    );
    webpackConf.plugins.push(new MonacoWebpackPlugin({
      // languages: ['bat', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'pgsql', 'php', 'postiats', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'sb', 'scss', 'solidity', 'sql', 'swift', 'typescript', 'vb', 'xml', 'yaml'],
      // features: ['accessibilityHelp', 'bracketMatching', 'caretOperations', 'clipboard', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'format', 'gotoDeclarationCommands', 'gotoDeclarationMouse', 'gotoError', 'gotoLine', 'hover', 'inPlaceReplace', 'inspectTokens', 'iPadShowKeyboard', 'linesOperations', 'links', 'multicursor', 'parameterHints', 'quickCommand', 'quickFixCommands', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'wordHighlighter', 'wordOperations'],
    }));
    webpackConf.resolve = webpackConf.resolve || {};
    webpackConf.resolve.extensions = ['.js', '.json'];
    webpackConf.resolve.alias = { '@uiw/react-monacoeditor': MonacoEditorSrc };
    // 更入口文件位置
    webpackConf.entry = webpackConf.entry.map((item) => {
      item = item.replace(/\/react-monacoeditor\/src\//, '/react-monacoeditor/example/');
      console.log('item:', item);
      return item;
    })

    if (webpackConf.mode === 'development') {
      // 默认配置 devtool = 'source-map';
      // 大型工程可以删除此配置，非常消耗编译速度
      delete webpackConf.devtool;
    }
    if (webpackConf.mode === 'production') {
      // 生产模式下更改的 webpack 配置
      webpackConf.output.publicPath = '';
    }
    return webpackConf;
  }
};
