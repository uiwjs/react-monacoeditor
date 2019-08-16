import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import styles from './styles/index.module.less';
import InlineCode from './InlineCode';

export default class Markdown extends Component {
  render() {
    const { source, ...otherProps } = this.props;
    return (
      <div ref={(node) => { this.node = node; }} {...otherProps}>
        <ReactMarkdown
          className={classNames(styles.markdown, 'markdown')}
          source={source}
          escapeHtml={false}
          renderers={{
            code: InlineCode,
          }}
          allowNode={(node) => {
            return node;
          }}
        />
      </div>
    );
  }
}
