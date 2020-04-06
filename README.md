react-monacoeditor
===

[Monaco Editor](https://github.com/Microsoft/monaco-editor) component for React. demo @[jaywcjlove.github.io/react-monacoeditor/](https://jaywcjlove.github.io/react-monacoeditor/)  

<a href="https://jaywcjlove.github.io/react-monacoeditor/"><img src="https://raw.githubusercontent.com/jaywcjlove/react-monacoeditor/master/react-monacoeditor.png" /></a>

<!--dividing-->

## Installation

```bash
npm install @uiw/react-monacoeditor --save
```

## Using

```js
import React from 'react';
import MonacoEditor from '@uiw/react-monacoeditor';

<MonacoEditor
  language="html"
  value="<h1>I ♥ react-monacoeditor</h1>"
  options={{
    theme: 'vs-dark',
  }}
/>
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

Add the [Monaco Webpack plugin](https://github.com/Microsoft/monaco-editor-webpack-plugin) `monaco-editor-webpack-plugin` to your `webpack.config.js`:

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
- `options` refer to [Monaco interface IEditorConstructionOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html).
- `editorDidMount(editor, monaco)` an event emitted when the editor has been mounted (similar to `componentDidMount` of React).
- `onChange(newValue, event)` an event emitted when the content of the current model has changed.

## Events & Methods

Refer to [Monaco interface IEditor](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditor.html).

## Other

- [react-codemirror](https://uiw-react.github.io/react-codemirror/): CodeMirror component for React.

## License

Licensed under the MIT License.
