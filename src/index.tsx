import React, { Component } from 'react';
import * as monaco from 'monaco-editor';

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


export default class MonacoEditor extends Component<MonacoEditorProps> {
  public static defaultProps: MonacoEditorProps = {
    width: '100%',
    height: '100%',
    defaultValue: '',
    language: 'javascript',
    options: {},
    editorDidMount: noop,
    onChange: noop,
  };
  containerElement?: HTMLDivElement;
  _currentValue?: string;
  editor?: monaco.editor.IStandaloneCodeEditor;
  constructor(props: MonacoEditorProps) {
    super(props);
    this.containerElement = undefined;
    this._currentValue = props.value;
  }
  componentDidMount() {
    this.initMonacoEditor();
  }
  componentDidUpdate(prevProps: MonacoEditorProps) {
    if (this.props.value !== this._currentValue) {
      this._currentValue = this.props.value;
      if (this.editor) {
        this.editor.setValue(this._currentValue || '');
      }
    }
    if (this.editor && prevProps.language !== this.props.language) {
      const model = this.editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, this.props.language || '');
      }
    }
    if (prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme || '');
    }
    if (
      this.editor &&
      (this.props.width !== prevProps.width || this.props.height !== prevProps.height)
    ) {
      this.editor.layout();
    }
  }
  editorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    const { editorDidMount, onChange } = this.props;
    editorDidMount!(editor, monaco);
    editor.onDidChangeModelContent((event) => {
      const value = editor.getValue();
      // Always refer to the latest value
      this._currentValue = value;
      onChange!(value, event);
    });
  }
  initMonacoEditor() {
    const value = this.props.value !== null ? this.props.value : this.props.defaultValue;
    const { language, theme, options } = this.props;
    if (this.containerElement) {
      this.editor = monaco.editor.create(this.containerElement, {
        value,
        language,
        ...options,
      });
      if (theme) {
        monaco.editor.setTheme(theme);
      }
      // After initializing monaco editor
      this.editorDidMount(this.editor);
    }
  }
  editorRef = (component: HTMLDivElement) => {
    this.containerElement = component;
  };
  render() {
    const { width, height, value, language, theme, options, editorDidMount, onChange, defaultValue, ...other } = this.props;
    return <div {...other} ref={this.editorRef} style={{ ...other.style, width, height }} />;
  }
}
