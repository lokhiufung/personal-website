import { MDXRemote } from "next-mdx-remote";
import Link from 'next/link';
import Image from 'next/image';

export const mdxComponents = {
    a: ({children, ...props}) => {
        return (
            <Link className="text-blue-500 hover:underline" {...props} href={props.href || ''}>
                {children}
            </Link>
        );
    },
    img: ({ ...props }) => (
        <Image 
            src={props.src} 
            alt={props.alt || ""} 
            width="800" 
            height="150" 
            layout={'responsive'} 
            className="mx-auto rounded-lg shadow"
        />
    ),
    h1: ({children, ...props}) => {
        return (
            <h1 className="mb-4 text-4xl font-bold text-left" {...props}>
                {children}
            </h1>
        );
    },
    h2: ({children, ...props}) => {
        return (
            <h2 className="mb-3 text-3xl font-semibold text-left" {...props}>
                {children}
            </h2>
        );
    },
    h3: ({children, ...props}) => {
        return (
            <h3 className="mb-3 text-2xl font-semibold text-left" {...props}>
                {children}
            </h3>
        );
    },
    p: ({children, ...props}) => {
        return (
            <p className="mb-6 leading-relaxed text-left" {...props}>
                {children}
            </p>
        );
    },
    blockquote: ({children, ...props}) => {
        return (
            <blockquote className="pl-4 italic border-l-4 border-blue-500 text-gray-600 mx-auto text-center" {...props}>
                {children}
            </blockquote>
        );
    },
    ul: ({children, ...props}) => {
        return (
            <ul className="mb-6 pl-5 list-disc mx-auto text-left" {...props}>
                {children}
            </ul>
        );
    },
    ol: ({children, ...props}) => {
        return (
            <ol className="mb-6 pl-5 list-decimal mx-auto text-left" {...props}>
                {children}
            </ol>
        );
    },
    code: ({children, ...props}) => {
        return (
            <code className="px-2 py-1 bg-gray-200 rounded text-sm mx-auto text-center" {...props}>
                {children}
            </code>
        );
    }
};

export function MdxContent({source}) {
    return <MDXRemote {...source} components={mdxComponents}/>
}
