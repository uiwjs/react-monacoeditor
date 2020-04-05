import React from 'react';
import * as MonacoEditor from 'monaco-editor';

export type IMonacoEditor = typeof MonacoEditor;
export interface MonacoEditorProps {
  /**
   * width of editor.
   * Defaults to `100%`
   */
  width: number | string;
  /**
   * height of editor.
   * Defaults to `100%`.
   */
  height: number | string;
  /**
   * value of the auto created model in the editor.
   */
  value: string;
  /**
   * the initial value of the auto created model in the editor.
   */
  defaultValue: string;
  /**
   * The initial language of the auto created model in the editor.
   * To not create automatically a model, use `model: null`.
   */
  language: MonacoEditor.editor.IStandaloneEditorConstructionOptions['language'];
  /**
   * Initial theme to be used for rendering.
   * The current out-of-the-box available themes are: 'vs' (default), 'vs-dark', 'hc-black'.
   * You can create custom themes via `monaco.editor.defineTheme`.
   * To switch a theme, use `monaco.editor.setTheme`
   */
  theme: MonacoEditor.editor.IStandaloneEditorConstructionOptions['theme'];
  /**
   * The options to create an editor.
   */
  options: MonacoEditor.editor.IStandaloneEditorConstructionOptions;
  /**
   * an event emitted when the editor has been mounted (similar to `componentDidMount` of React)
   */
  editorDidMount: (editor: MonacoEditor.editor.IStandaloneCodeEditor, monaco: IMonacoEditor) => void;
  /**
   * an event emitted when the content of the current model has changed.
   */
  onChange: (value: string, event: MonacoEditor.editor.IModelContentChangedEvent) => void;
}


export default class ReactCodemirror extends React.Component<MonacoEditorProps> {
  static defaultProps: MonacoEditorProps;
  render(): JSX.Element;
}
