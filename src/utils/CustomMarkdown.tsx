import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Компоненти для перевизначення поведінки
const customComponents: Components = {
    // Custom paragraph that accepts a "data-color" attribute
    p: ({ node, children, ...props }) => {
        // Use a fallback color or read from a custom attribute (if implemented)
        const color = (props as any)['data-color'] || 'inherit';
        return (
            <span className="inline-block" style={{ color }}>
                {children}
            </span>
        );
    },
    // Перевизначення для тегу <span>
    span: ({ node, children, ...props }) => {
        const color = (props as any)['data-color'];
        if (color === 'gradient') {
            return (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    {children}
                </span>
            );
        }
        // Якщо потрібно інший колір - використовуйте inline стиль
        return (
            <span style={{ color: color || 'inherit' }}>
                {children}
            </span>
        );
    },
};

interface CustomMarkdownProps {
    children: string;
}

export default function CustomMarkdown({ children }: CustomMarkdownProps) {
    return (
        <ReactMarkdown components={customComponents} rehypePlugins={[rehypeRaw]}>
            {children}
        </ReactMarkdown>
    );
}
