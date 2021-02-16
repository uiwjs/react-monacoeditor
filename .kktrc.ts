import path from 'path';
import webpack, { Configuration } from 'webpack';
import { LoaderConfOptions } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import pkg from './package.json';

export default (conf: Configuration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
  conf = rawModules(conf, env, { ...options, test: /\.(md|txt)$/i });
  conf = scopePluginOptions(conf, env, {
    ...options,
    allowedFiles: [
      path.resolve(process.cwd(), 'README.md'),
      path.resolve(process.cwd(), 'src'),
    ]
  });
  conf.plugins!.push(new MonacoWebpackPlugin({
    // languages: ['bat', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dockerfile', 'fsharp', 'go', 'handlebars', 'html', 'ini', 'java', 'json', 'less', 'lua', 'markdown', 'msdax', 'mysql', 'objective', 'pgsql', 'php', 'postiats', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'ruby', 'sb', 'scss', 'solidity', 'sql', 'swift', 'typescript', 'vb', 'xml', 'yaml'],
    // features: ['accessibilityHelp', 'bracketMatching', 'caretOperations', 'clipboard', 'codelens', 'colorDetector', 'comment', 'contextmenu', 'coreCommands', 'cursorUndo', 'dnd', 'find', 'folding', 'format', 'gotoDeclarationCommands', 'gotoDeclarationMouse', 'gotoError', 'gotoLine', 'hover', 'inPlaceReplace', 'inspectTokens', 'iPadShowKeyboard', 'linesOperations', 'links', 'multicursor', 'parameterHints', 'quickCommand', 'quickFixCommands', 'quickOutline', 'referenceSearch', 'rename', 'smartSelect', 'snippets', 'suggest', 'toggleHighContrast', 'toggleTabFocusMode', 'transpose', 'wordHighlighter', 'wordOperations'],
  }));
  // conf.resolve!.alias = { '@uiw/react-monacoeditor': process.cwd() };
  // Get the project version.
  conf.plugins!.push(new webpack.DefinePlugin({
    VERSION: JSON.stringify(pkg.version),
  }));
  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
  }
  return conf;
}
