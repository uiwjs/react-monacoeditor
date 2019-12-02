import path from 'path';
import webpack from 'webpack';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export const moduleScopePluginOpts = [
  path.resolve(process.cwd(), 'README.md'),
  path.resolve(process.cwd(), 'src'),
];

export const loaderOneOf = [
  require.resolve('@kkt/loader-less')
];

export default (conf) => {
  const pkg = require(path.resolve(process.cwd(), 'package.json'));
  conf.plugins.push(new MonacoWebpackPlugin({
    // languages: ['bat', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'pgsql', 'php', 'postiats', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'sb', 'scss', 'solidity', 'sql', 'swift', 'typescript', 'vb', 'xml', 'yaml'],
    // features: ['accessibilityHelp', 'bracketMatching', 'caretOperations', 'clipboard', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'format', 'gotoDeclarationCommands', 'gotoDeclarationMouse', 'gotoError', 'gotoLine', 'hover', 'inPlaceReplace', 'inspectTokens', 'iPadShowKeyboard', 'linesOperations', 'links', 'multicursor', 'parameterHints', 'quickCommand', 'quickFixCommands', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'wordHighlighter', 'wordOperations'],
  }));
  // conf.resolve = conf.resolve || {};
  conf.resolve.alias = { '@uiw/react-monacoeditor': process.cwd() };

  // Loader Markdown
  conf.module.rules.map((item) => {
    if (item.oneOf) {
      item.oneOf.unshift({
        test: /\.md$/,
        use: require.resolve('raw-loader'),
      });
    }
    return item;
  });

  // 获取版本信息
  conf.plugins.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    })
  );
  conf.output = {
    ...conf.output,
    path: path.join(process.cwd(), 'dist'),
    publicPath: './',
  };
  return conf;
}
