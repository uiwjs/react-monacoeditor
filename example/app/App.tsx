import React, { useEffect, useRef, useState } from 'react';
import { editor } from 'monaco-editor';
import Markdown from '@uiw/react-markdown-preview';
import GitHubCorners from '@uiw/react-github-corners';
import '@wcj/dark-mode';
import MonacoEditor, { RefEditorInstance } from '../../';
import Select from './Select';
import logo from './logo.svg';
import styles from './App.module.less';
import DocumentStr from '../../README.md';

export const languageData = [
  'abap', 'aes', 'apex', 'azcli', 'bat', 'c', 'cameligo', 'clojure', 'coffeescript', 'cpp', 'csharp', 'csp', 'css', 'dart', 'dockerfile', 'fsharp', 'go', 'graphql', 'handlebars', 'hcl', 'html', 'ini', 'java', 'javascript', 'json', 'julia', 'kotlin', 'less', 'lex', 'lua', 'markdown', 'mips', 'msdax', 'mysql', 'objective', 'pascal', 'pascaligo', 'perl', 'pgsql', 'php', 'plaintext', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'restructuredtext', 'ruby', 'rust', 'sb', 'scala', 'scheme', 'scss', 'shell', 'sol', 'sql', 'st', 'swift', 'systemverilog', 'tcl', 'twig', 'typescript', 'vb', 'verilog', 'xml', 'yaml'
];

const themesData = ['vs', 'vs-dark', 'hc-black']

export default function Example() {
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('javascript');
  const [hyperlink] = useState<Record<'href' | 'label', string>[]>([
    {
      href: 'https://github.com/jaywcjlove/react-monacoeditor',
      label: 'View on GitHub',
    },
    {
      href: 'https://www.npmjs.com/package/@uiw/react-monacoeditor',
      label: 'View on NPM',
    },
    {
      href: 'https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorOptions.html#linenumbers',
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
  const themeRef = useRef<string>()
  function onSelectThemeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.persist();
    document.documentElement.setAttribute('data-color-mode', /^vs$/.test(e.target.value) ? 'light' : 'dark');
    themeRef.current = e.target.value;
    setTheme(e.target.value);
  }
  function dynamicLoadable(lang: string) {
    return import(`code-example/txt/sample.${lang}.txt`);
  }

  useEffect(() => {
    dynamicLoadable(mode).then((code) => {
      setCode(code.default || '');
      // setMode(mode);
      // this.setState({ mode: this.state.mode, code: code.default || '' });
    });
    document.addEventListener('colorschemechange', (e) => {
      setTheme(e.detail.colorScheme === 'dark' ? (['vs-dark', 'hc-black'].includes(themeRef.current!) ? themeRef.current! : 'vs-dark') : 'vs');
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`${styles.App} wmde-markdown-var`}>
      <dark-mode permanent dark="Dark" light="Light" style={{ position: 'fixed', top: 8, left: 10, zIndex: 999 }}></dark-mode>
      <GitHubCorners
        fixed
        size={52}
        zIndex={9999}
        target="__blank"
        href="https://github.com/jaywcjlove/react-monacoeditor"
      />
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <h1 className={styles.AppTitle}>React Monaco Editor <sup>v{version}</sup></h1>
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
