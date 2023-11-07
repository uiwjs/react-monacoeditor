import React, { useEffect, useRef, useState } from 'react';
import { editor } from 'monaco-editor';
import MonacoEditor, { RefEditorInstance } from '@uiw/react-monacoeditor';
import styled from 'styled-components';
import Select from './Select';

const Wrapper = styled.div`
  header {
    background-color: var(--color-theme-bg);
    padding: 0 0 0 0;
    position: relative;
    z-index: 9;
    text-align: center;
    a {
      color: #333;
      outline: none;
      min-width: 88px;
      min-height: 30px;
      margin: 6px 5px;
      padding: 0 10px;
      font-size: 14px;
      display: inline-block;
      position: relative;
      overflow: hidden;
      user-select: none;
      border-radius: 3px;
      cursor: pointer;
      color: var(--color-theme-text);
      background-color: var(--color-neutral-muted);
      line-height: 30px;
      text-transform: uppercase;
      text-decoration: none;
      transition: background-color .25s linear,color .05s linear,opacity .25s linear,filter .25s linear,visibility .25s linear,transform .25s linear;
      &:hover {
        background-color: var(--color-fg-default);
        color: var(--color-canvas-default);
      }
    }
  }
`;

const Editor = styled.div`
  min-height: 500px;
  max-width: 995px;
  margin: 0 auto 0 auto;
  position: relative;
  z-index: 999;
  .monaco-editor, .monaco-editor .overflow-guard {
    border-radius: 5px;
  }
`;

const Options = styled.div`
  margin: 10px auto 0 auto;
`;

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
      href: 'https://github.com/uiwjs/react-monacoeditor',
      label: 'View on GitHub',
    },
    {
      href: 'https://www.npmjs.com/package/@uiw/react-monacoeditor',
      label: 'View on NPM',
    },
    {
      href: 'https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IEditorOptions.html',
      label: 'Monaco Editor Options',
    },
  ]);
  const editorRef = useRef<RefEditorInstance>(null);
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
  // let DocumentStrSource = DocumentStr;
  // if (DocumentStrSource) DocumentStrSource = DocumentStr.replace(/([\s\S]*)<!--dividing-->/, '');

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
    <Wrapper className="wmde-markdown-var">
      <header>
        {hyperlink.map((item, idx) => {
          return (
            <a key={idx} target="_blank" rel="noopener noreferrer" href={item.href}>{item.label}</a>
          );
        })}
      </header>
      <Editor>
        <MonacoEditor
          ref={editorRef}
          height="500px"
          language={mode}
          value={code}
          editorDidMount={(editor) => editorDidMount(editor)}
          onChange={onChange}
          options={options}
        />
      </Editor>
      <Options>
        <Select value={mode} options={languageData} onChange={onSelectChange} />
        <Select value={theme} options={themesData} onChange={onSelectThemeChange} />
      </Options>
    </Wrapper>
  )
}
