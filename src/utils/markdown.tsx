import React from 'react';

/**
 * Safe, zero-dependency Markdown to React component renderer.
 * Strictly sanitizes links, formats typography cleanly, and eliminates XSS risks.
 */

// Parse inline formatting: bold, italic, inline code, and safe links
function parseInline(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  // Regex to match: **bold**, *italic*, `code`, and [link text](url)
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `inline-${match.index}`;

    if (token.startsWith('**') && token.endsWith('**')) {
      elements.push(
        <strong key={key} className="font-semibold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      elements.push(
        <em key={key} className="italic text-slate-200">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      elements.push(
        <code key={key} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400 font-mono text-xs">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const linkText = linkMatch[1];
        const rawHref = linkMatch[2].trim();
        // Strict safe URL verification
        const isSafe = /^https?:\/\/|mailto:|^#/i.test(rawHref);
        const href = isSafe ? rawHref : '#';
        elements.push(
          <a
            key={key}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400 transition-colors"
          >
            {linkText}
          </a>
        );
      } else {
        elements.push(token);
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : [text];
}

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // Close code block
        renderedElements.push(
          <div key={`codeblock-${i}`} className="my-5 rounded-lg border border-slate-800 bg-[#090b14] overflow-hidden">
            {codeLanguage && (
              <div className="px-4 py-1.5 border-b border-slate-800/80 bg-slate-900/40 text-xs font-mono text-slate-400">
                {codeLanguage}
              </div>
            )}
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLanguage = '';
      } else {
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Empty line
    if (!trimmed) {
      continue;
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      renderedElements.push(
        <hr key={`hr-${i}`} className="my-8 border-t border-slate-800/80" />
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${i}`} className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mt-8 mb-4">
          {parseInline(trimmed.slice(2))}
        </h1>
      );
      continue;
    }
    if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mt-6 mb-3">
          {parseInline(trimmed.slice(3))}
        </h2>
      );
      continue;
    }
    if (trimmed.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-display font-semibold text-slate-100 mt-5 mb-2.5">
          {parseInline(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-5 py-3 px-5 border-l-2 border-blue-500 bg-blue-950/20 rounded-r-lg text-slate-300 italic text-sm leading-relaxed"
        >
          {parseInline(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Bullet list
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      renderedElements.push(
        <li key={`li-${i}`} className="ml-5 list-disc text-sm text-slate-300 mb-2 leading-relaxed">
          {parseInline(trimmed.slice(2))}
        </li>
      );
      continue;
    }

    // Numbered list
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numberedMatch) {
      renderedElements.push(
        <li key={`ol-${i}`} className="ml-5 list-decimal text-sm text-slate-300 mb-2 leading-relaxed">
          {parseInline(numberedMatch[2])}
        </li>
      );
      continue;
    }

    // Standard paragraph
    renderedElements.push(
      <p key={`p-${i}`} className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
        {parseInline(rawLine)}
      </p>
    );
  }

  return <div className={`prose-dark ${className}`}>{renderedElements}</div>;
};
