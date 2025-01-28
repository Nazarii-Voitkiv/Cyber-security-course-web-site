import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';

// Компоненти для перевизначення поведінки
const customComponents: Components = {
    // Перевизначення тега <p>
    p: ({children }) => <span className="inline-block">{children}</span>,
};

interface CustomMarkdownProps {
    children: string;
}

export default function CustomMarkdown({ children }: CustomMarkdownProps) {
    return (
        <ReactMarkdown components={customComponents}>
            {children}
        </ReactMarkdown>
    );
}
