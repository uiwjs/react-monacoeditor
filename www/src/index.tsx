import { createRoot } from 'react-dom/client';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import data from '@uiw/react-monacoeditor/README.md';
import App from './app/App';

const Github = MarkdownPreviewExample.Github;
const Example = MarkdownPreviewExample.Example;
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    title="React Monacoeditor"
    description="Monaco Editor component for React"
    version={`v${VERSION}`}
    exampleProps={{
      style: {
        flexDirection: 'column'
      }
    }}
  >
    <Github href="https://github.com/jaywcjlove/react-monacoeditor" />
    <Example>
      <App />
    </Example>
  </MarkdownPreviewExample>
);

