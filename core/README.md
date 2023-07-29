react-monacoeditor
===

[![CI](https://github.com/jaywcjlove/react-monacoeditor/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/react-monacoeditor/actions/workflows/ci.yml)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/npm/@uiw/react-monacoeditor/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@uiw/react-monacoeditor)
[![Downloads](https://img.shields.io/npm/dm/@uiw/react-monacoeditor.svg?style=flat)](https://www.npmjs.com/package/@uiw/react-monacoeditor)
[![Open in unpkg](https://img.shields.io/badge/Open%20in-unpkg-blue)](https://uiwjs.github.io/npm-unpkg/#/pkg/@uiw/react-monacoeditor/file/README.md)
[![npm version](https://img.shields.io/npm/v/@uiw/react-monacoeditor.svg)](https://www.npmjs.com/package/@uiw/react-monacoeditor)

[Monaco Editor](https://github.com/Microsoft/monaco-editor) component for React. demo @[jaywcjlove.github.io/react-monacoeditor/](https://jaywcjlove.github.io/react-monacoeditor/)  

<!--rehype:ignore:start-->
<a href="https://jaywcjlove.github.io/react-monacoeditor/"><img src="https://raw.githubusercontent.com/jaywcjlove/react-monacoeditor/master/react-monacoeditor.png" /></a>

<!--rehype:ignore:end-->
<!--dividing-->

## Installation

```bash
npm install @uiw/react-monacoeditor --save
```

## Using

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/react-monacoeditor-example-hgqfj?fontsize=14&hidenavigation=1&theme=dark)

```jsx mdx:preview
import React from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';

export default function Demo() {
  return (
    <MonacoEditor
      language="html"
      value="<h1>I ♥ react-monacoeditor</h1>"
      height="300px"
      options={{
        theme: 'vs-dark',
      }}
    />
  );
}
```

## Using with Webpack

```javascript
import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from '@uiw/react-monacoeditor';

const code = `import React, { PureComponent } from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';

export default class App extends PureComponent {
  render() {
    return (
      <MonacoEditor
        language="html"
        value="<h1>I ♥ react-codemirror2</h1>"
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          automaticLayout: false,
          theme: 'vs-dark',
        }}
      />
    );
  }
}
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor, monaco);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
      theme: 'vs-dark',
      scrollbar: {
        // Subtle shadows to the left & top. Defaults to true.
        useShadows: false,
        // Render vertical arrows. Defaults to false.
        verticalHasArrows: true,
        // Render horizontal arrows. Defaults to false.
        horizontalHasArrows: true,
        // Render vertical scrollbar.
        // Accepted values: 'auto', 'visible', 'hidden'.
        // Defaults to 'auto'
        vertical: 'visible',
        // Render horizontal scrollbar.
        // Accepted values: 'auto', 'visible', 'hidden'.
        // Defaults to 'auto'
        horizontal: 'visible',
        verticalScrollbarSize: 17,
        horizontalScrollbarSize: 17,
        arrowSize: 30,
      },
    };
    return (
      <MonacoEditor
        height="500px"
        language="javascript"
        editorDidMount={this.editorDidMount.bind(this)}
        onChange={this.onChange.bind(this)}
        value={code}
        options={options}
      />
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
```

Add the [Monaco Editor Webpack Loader Plugin](https://github.com/microsoft/monaco-editor/tree/main/webpack-plugin) `monaco-editor-webpack-plugin` to your `webpack.config.js`:

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  plugins: [
    new MonacoWebpackPlugin()
  ]
};
```

## Properties

If you specify `value` property, the component behaves in controlled mode.
Otherwise, it behaves in uncontrolled mode.

- `width` width of editor. Defaults to `100%`.
- `height` height of editor. Defaults to `100%`.
- `value` value of the auto created model in the editor.
- `defaultValue` the initial value of the auto created model in the editor.
- `language` the initial language of the auto created model in the editor.
- `theme` the theme of the editor `vs`, `vs-dark`, `hc-black`
- `options` refer to [Monaco interface IEditorConstructionOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorConstructionOptions.html).
- `editorDidMount(editor, monaco)` an event emitted when the editor has been mounted (similar to `componentDidMount` of React).
- `onChange(newValue, event)` an event emitted when the content of the current model has changed.
- `autoComplete?: (model: monaco.editor.ITextModel, position: monaco.Position) => languages.CompletionItem[];` User provided extension function provider for auto-complete. [#47](https://github.com/jaywcjlove/react-monacoeditor/pull/47)

## Events & Methods

Refer to [Monaco interface IEditor](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditor.html).

### Related

- [@uiw/react-textarea-code-editor](https://github.com/uiwjs/react-textarea-code-editor): A simple code editor with syntax highlighting.
- [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror): CodeMirror component for React. @codemirror
- [@uiw/react-monacoeditor](https://github.com/jaywcjlove/react-monacoeditor): Monaco Editor component for React.
- [@uiw/react-markdown-editor](https://github.com/uiwjs/react-markdown-editor): A markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor): A simple markdown editor with preview, implemented with React.js and TypeScript.
- [@uiw/react-markdown-preview](https://github.com/uiwjs/react-markdown-preview): React component preview markdown text in web browser. 
- [Nginx Editor](https://github.com/jaywcjlove/nginx-editor) Nginx language for Monaco Editor.

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/react-monacoeditor/graphs/contributors">
  <img src="https://jaywcjlove.github.io/react-monacoeditor/CONTRIBUTORS.svg" />
</a>

Made with [github-action-contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
