import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const customComponents: Components = {
    p: ({ children, ...props }): React.ReactNode => {
        const dataProps = props as { "data-color"?: string };
        const color = dataProps["data-color"] || 'inherit';
        return (
            <span className="inline-block" style={{ color }}>
                {children}
            </span>
        );
    },
    span: ({ children, ...props }): React.ReactNode => {
        const dataProps = props as { "data-color"?: string };
        const color = dataProps["data-color"];
        if (color === 'gradient') {
            return (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                    {children}
                </span>
            );
        }
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