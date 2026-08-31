import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import clasesMd from '../data/Clases.md?raw';

export default function MasterClass() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // In Vite, ?raw imports the string content of the file
    setMarkdown(clasesMd);
  }, []);

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          Master Class: Arquitectura Headless
        </h1>
        <div className="markdown-body" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 style={{ color: 'var(--text-primary)', marginTop: '2.5rem', marginBottom: '1.5rem' }} {...props} />,
              h2: ({node, ...props}) => <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }} {...props} />,
              h3: ({node, ...props}) => <h3 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '1rem' }} {...props} />,
              p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }} {...props} />,
              ul: ({node, ...props}) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }} {...props} />,
              ol: ({node, ...props}) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '2rem' }} {...props} />,
              li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote style={{ borderLeft: '4px solid var(--accent-secondary)', margin: '1.5rem 0', padding: '1rem 1.5rem', background: 'var(--bg-secondary)', borderRadius: '0 8px 8px 0' }} {...props} />
              ),
              table: ({node, ...props}) => <table className="data-table" style={{ marginBottom: '2rem' }} {...props} />,
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div style={{ marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden' }}>
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, background: '#0d1117' }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code style={{ background: 'var(--bg-secondary)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: 'var(--accent-secondary)' }} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
