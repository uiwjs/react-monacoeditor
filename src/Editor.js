import React, { Component } from 'react';
import * as monaco from 'monaco-editor';
import PropTypes from 'prop-types';

function noop() {}

export default class MonacoEditor extends Component {
  constructor(props) {
    super(props);
    this.containerElement = undefined;
    this._currentValue = props.value;
  }
  componentDidMount() {
    this.initMonacoEditor();
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== this._currentValue) {
      this._currentValue = this.props.value;
      if (this.editor) {
        this.editor.setValue(this._currentValue);
      }
    }
    if (prevProps.language !== this.props.language) {
      monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
    }
    if (prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme);
    }
    if (
      this.editor &&
      (this.props.width !== prevProps.width || this.props.height !== prevProps.height)
    ) {
      this.editor.layout();
    }
  }
  editorDidMount(editor) {
    this.props.editorDidMount(editor, monaco);
    editor.onDidChangeModelContent((event) => {
      const value = editor.getValue();
      // Always refer to the latest value
      this._currentValue = value;
      this.props.onChange(value, event);
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
  editorRef = (component) => {
    this.containerElement = component;
  };
  render() {
    const { width, height, className } = this.props;
    return <div className={className} ref={this.editorRef} style={{ width, height }} />;
  }
}

MonacoEditor.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.object,
  editorDidMount: PropTypes.func,
  onChange: PropTypes.func,
};

MonacoEditor.defaultProps = {
  width: '100%',
  height: '100%',
  value: null,
  defaultValue: '',
  language: 'javascript',
  theme: null,
  options: {},
  editorDidMount: noop,
  onChange: noop,
};
