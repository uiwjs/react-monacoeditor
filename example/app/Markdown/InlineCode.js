import React, { PureComponent } from 'react';
import MonacoEditor from 'react-monacoeditor';
import styles from './InlineCode.less';

export default class Canvas extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { value, language } = this.props;
    const line = value ? value.split('\n').length : 1;
    // 设置高度，超过20行出现滚动条
    const height = ((line > 20 ? 20 : line) * 18);
    return (
      <MonacoEditor
        className={styles.editor}
        height={`${height}px`}
        language={language}
        value={value}
        options={{
          lineNumbers: 'off',
          folding: false,
          foldingStrategy: 'indentation',
          contextmenu: false,
          revealHorizontalRightPadding: 200,
          minimap: {
            // 超过而是行才显示代码地图
            enabled: line > 20,
          },
          // Enable that scrolling can go one screen size after the last line. Defaults to true.
          scrollBeyondLastLine: false,
          lineNumbersMinChars: 1,
          cursorStyle: 'line',
          // automaticLayout: false,
          readOnly: true,
          theme: 'vs-dark',
        }}
      />
    );
  }
}
