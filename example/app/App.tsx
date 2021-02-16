import React, { useEffect, useRef, useState } from 'react';
import { editor } from 'monaco-editor';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved, import/extensions
import MonacoEditor, { RefEditorInstance } from '../../';
import Markdown from '@uiw/react-markdown-preview';
import Select from './Select';
import logo from './logo.svg';
import styles from './App.module.less';
import DocumentStr from '../../README.md';

export const languageData = [
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

const themesData = ['vs', 'vs-dark', 'hc-black']

export default function Example() {
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('javascript');
  const [hyperlink, setHyperlink] = useState<Record<'href' | 'label', string>[]>([
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
  ]);
  const editorRef = useRef<RefEditorInstance>(null);
  // @ts-ignore
  const version = VERSION; // eslint-disable-line
  const options: editor.IStandaloneEditorConstructionOptions & editor.IEditorScrollbarOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    cursorStyle: 'line',
    automaticLayout: false,
    theme,
    // // Subtle shadows to the left & top. Defaults to true.
    // useShadows: false,
    // // Render vertical arrows. Defaults to false.
    // verticalHasArrows: true,
    // // Render horizontal arrows. Defaults to false.
    // horizontalHasArrows: true,
    // // Render vertical scrollbar.
    // // Accepted values: 'auto', 'visible', 'hidden'.
    // // Defaults to 'auto'
    // vertical: 'visible',
    // // Render horizontal scrollbar.
    // // Accepted values: 'auto', 'visible', 'hidden'.
    // // Defaults to 'auto'
    // horizontal: 'visible',
    // verticalScrollbarSize: 17,
    // horizontalScrollbarSize: 17,
    // arrowSize: 30,
  };
  let DocumentStrSource = DocumentStr;
  if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');

  function editorDidMount(editor: editor.IStandaloneCodeEditor) {
    // console.log('editorDidMount', editor, monaco); // eslint-disable-line
    editor.focus();
  }
  function onChange() {}
  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.persist();
    const lang = e.target.value;
    if (languageData.indexOf(lang) === -1) {
      setMode(lang);
      return;
    }
    // editorRef.current?.editor.set
    const model = editorRef.current?.editor?.getModel()
    if (model) {
      editor.setModelLanguage(model, lang || '');
    }
    setMode(lang);
    dynamicLoadable(lang).then((code) => {
      setCode(code.default || '');
    });
  }
  function onSelectThemeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.persist();
    setTheme(e.target.value);
  }
  function dynamicLoadable(lang: string) {
    return import(`code-example/lib/${lang}.js`);
  }

  useEffect(() => {
    dynamicLoadable(mode).then((code) => {
      setCode(code.default || '');
      // setMode(mode);
      // this.setState({ mode: this.state.mode, code: code.default || '' });
    });
  }, []);
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
          ref={editorRef}
          height="500px"
          language={mode}
          value={code}
          editorDidMount={(editor) => editorDidMount(editor)}
          onChange={onChange}
          options={options}
        />
      </div>
      <div className={styles.options}>
        <Select value={mode} options={languageData} onChange={onSelectChange} />
        <Select value={theme} options={themesData} onChange={onSelectThemeChange} />
      </div>
      <div>
      <Markdown source={DocumentStrSource} className={styles.markdown} />
      </div>
    </div>
  )
}
