/* eslint-disable react-hooks/exhaustive-deps */
import React, { useImperativeHandle, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { editor, languages } from 'monaco-editor';
// @ts-ignore
import codicon from 'monaco-editor/min/vs/base/browser/ui/codicons/codicon/codicon.ttf';

function noop() {}

export type IMonacoEditor = typeof monaco;
export interface MonacoEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>{
  /**
   * width of editor.
   * Defaults to `100%`
   */
  width?: number | string;
  /**
   * height of editor.
   * Defaults to `100%`.
   */
  height?: number | string;
  /**
   * value of the auto created model in the editor.
   */
  value?: string;
  /**
   * the initial value of the auto created model in the editor.
   */
  defaultValue?: string;
  /**
   * The initial language of the auto created model in the editor.
   * To not create automatically a model, use `model: null`.
   */
  language?: monaco.editor.IStandaloneEditorConstructionOptions['language'];
  /**
   * User provided extension function provider for auto-complete.
   */
  autoComplete?: (model: monaco.editor.ITextModel, position: monaco.Position) => languages.CompletionItem[];
  /**
   * Initial theme to be used for rendering.
   * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
   * You can create custom themes via `monaco.editor.defineTheme`.
   * To switch a theme, use `monaco.editor.setTheme`
   */
  theme?: monaco.editor.IStandaloneEditorConstructionOptions['theme'];
  /**
   * The options to create an editor.
   */
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  /**
   * an event emitted when the editor has been mounted (similar to `componentDidMount` of React)
   */
  editorDidMount?: (editor: monaco.editor.IStandaloneCodeEditor, monaco: IMonacoEditor) => void;
  /**
   * an event emitted when the content of the current model has changed.
   */
  onChange?: (value: string, event: monaco.editor.IModelContentChangedEvent) => void;
}

export async function loadFont(fontFamily: string, url: string): Promise<void> {
  const font = new FontFace(fontFamily, `local(${fontFamily}), url(${url})`);
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
}

export interface RefEditorInstance {
  container: HTMLDivElement | null;
  editor?: monaco.editor.IStandaloneCodeEditor;
  monaco: IMonacoEditor;
}

function MonacoEditor(props: MonacoEditorProps, ref: ((instance: RefEditorInstance) => void) | React.RefObject<RefEditorInstance> | null | undefined) {
  const { width = '100%', height = '100%', value = '', theme = '', language = 'javascript', autoComplete, options = {}, editorDidMount = noop, onChange = noop, defaultValue = '', ...other } = props;
  options.language = language || options.language;
  options.theme = theme || options.theme;
  const [val, setVal] = useState(defaultValue);
  const container = useRef<HTMLDivElement>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  useImperativeHandle(ref, () => ({ container: container.current, editor: editor.current, monaco }));
  useEffect(() => {
    if (container.current) {
      editor.current = monaco.editor.create(container.current, {
        value: val,
        language,
        ...options,
      });
      if (options.theme) {
        monaco.editor.setTheme(options.theme);
      }
      // After initializing monaco editor
      editorDidMount!(editor.current, monaco);
      editor.current.onDidChangeModelContent((event) => {
        const valueCurrent = editor.current!.getValue();
        // Always refer to the latest value
        onChange!(valueCurrent, event);
      });
    }
    loadFont('codicon', codicon).catch((e) => {
      if (e) {
        throw new Error('Failed to load font codicon!!');
      }
    });

    return () => {
      if(editor.current) {
        editor.current.dispose()
      }
    }
  }, []);

  useEffect(() => {
    if (options.theme) {
      monaco.editor.setTheme(options.theme);
    }
  }, [options.theme])

  useEffect(() => {
    if (value !== val && editor.current) {
      if (autoComplete) {
        if (editor?.current?.getModel() && editor?.current?.getPosition()) {
          monaco.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (model, position) => {
              return {
                suggestions: autoComplete(model, position)
              };
            }
          });
        }
      }

      setVal(value);
      editor.current.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, props.language || '');
      }
    }
  }, [language]);

  useEffect(() => {
    if (editor.current) {
      const optionsRaw = editor.current.getRawOptions();
      ;(Object.keys(optionsRaw) as (keyof editor.IEditorOptions)[]).forEach((keyname) => {
        const propsOpt = options[keyname];
        if (optionsRaw[keyname] !== propsOpt && propsOpt !== undefined) {
          editor.current!.updateOptions({ [keyname]: propsOpt });
        }
      });
    }
  }, [options]);

  return <div {...other} ref={container} style={{ ...other.style, width, height }} />;
}

export default React.forwardRef<RefEditorInstance, MonacoEditorProps>(MonacoEditor);