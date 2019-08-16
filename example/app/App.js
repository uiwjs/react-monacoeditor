import React, { PureComponent } from 'react';
// eslint-disable-next-line import/no-unresolved, import/extensions
import MonacoEditor from '@uiw/react-monacoeditor';
import Markdown from './Markdown';
import Select from './Select';
import logo from './logo.svg';
import styles from './App.module.less';
import DocumentStr from '../../README.md';

const languageData = [
  'json', 'apl', 'brainfuck', 'clike', 'clojure', 'cmake', 'cobol', 'coffeescript', 'commonlisp', 'crystal', 'css',
  'cypher', 'cython', 'd', 'dart', 'diff', 'dockerfile', 'dtd', 'dylan', 'ecl', 'eiffel', 'elm', 'erlang', 'factor',
  'fcl', 'forth', 'fortran', 'gas', 'gherkin', 'go', 'groovy', 'haml', 'haskell', 'haskell-literate', 'haxe', 'htmlembedded',
  'htmlmixed', 'http', 'idl', 'javascript', 'jinja2', 'jsx', 'less', 'julia', 'livescript', 'lua', 'mathematica', 'mbox', 'mirc',
  'modelica', 'mscgen', 'mumps', 'nginx', 'nsis', 'ntriples', 'octave', 'oz', 'pascal', 'pegjs', 'perl', 'php', 'pig',
  'powershell', 'properties', 'protobuf', 'pug', 'puppet', 'python', 'q', 'r', 'rpm', 'ruby', 'rust', 'sas', 'sass',
  'scheme', 'shell', 'sieve', 'slim', 'smalltalk', 'smarty', 'solr', 'soy', 'sparql', 'spreadsheet', 'sql', 'stex',
  'stylus', 'swift', 'tcl', 'textile', 'tiddlywiki', 'tiki', 'toml', 'tornado', 'troff', 'ttcn', 'ttcn-cfg',
  'turtle', 'twig', 'typescript', 'vb', 'vbscript', 'velocity', 'verilog', 'vhdl', 'vue', 'webidl', 'xml', 'xquery', 'yacas', 'yaml',
];

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      mode: 'javascript',
      hyperlink: [
        {
          href: 'https://github.com/jaywcjlove/react-monacoeditor',
          label: 'View on GitHub',
        },
        {
          href: 'https://www.npmjs.com/package/react-monacoeditor',
          label: 'View on NPM',
        },
        {
          href: 'https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#linenumbers',
          label: 'Monaco Editor Options',
        },
      ],
    };
  }
  componentDidMount() {
    this.dynamicLoadable(this.state.mode).then((code) => {
      this.setState({ mode: this.state.mode, code: code.default || '' });
    });
  }
  editorDidMount(editor) {
    // console.log('editorDidMount', editor, monaco); // eslint-disable-line
    editor.focus();
  }
  onChange() {
    // console.log('onChange', newValue, e);  // eslint-disable-line
  }
  onSelectChange(e) {
    e.persist();
    const lang = e.target.value;
    if (languageData.indexOf(lang) === -1) {
      this.setState({ mode: lang });
      return;
    }
    this.dynamicLoadable(lang).then((code) => {
      // console.log('code.default:', code.default);
      this.setState({ mode: lang, code: code.default || '' });
    });
  }
  dynamicLoadable(lang) {
    return import(`code-example/lib/${lang}.js`);
  }
  render() {
    const { hyperlink, code } = this.state;
    const version = VERSION; // eslint-disable-line
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      cursorStyle: 'line',
      automaticLayout: false,
      theme: 'vs-dark',
    };
    let DocumentStrSource = DocumentStr;
    if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');
    return (
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h1 className={styles.AppTitle}>React-MonacoEditor <sup>v{version}</sup></h1>
          <p className={styles.content}>MonacoEditor component for React. </p>
          <div className={styles.button}>
            {hyperlink.map((item, idx) => {
              return (
                <a key={idx} target="_blank" rel="noopener noreferrer" href={item.href}>{item.label}</a>
              );
            })}
          </div>
        </header>
        <div className={styles.editor}>
          <MonacoEditor
            ref={editor => this.editor = editor}
            height="500px"
            language={this.state.mode}
            value={code}
            editorDidMount={this.editorDidMount.bind(this)}
            onChange={this.onChange.bind(this)}
            options={options}
            scrollbar={{
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
            }}
          />
        </div>
        <div className={styles.options}>
          <Select value={this.state.mode} options={languageData} onChange={this.onSelectChange.bind(this)} />
        </div>
        <Markdown source={DocumentStrSource} className={styles.markdown} />
      </div>
    );
  }
}

export default App;
