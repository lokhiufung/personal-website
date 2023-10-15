import { MdxContent } from '@/components/mdx/markdown-content'

export default function PostBody({post}) {
    const { serialized, frontmatter } = post
    return (
        <article>
            <div style={{paddingBottom: '20px'}}>
                <h1 style={{textAlign: 'center', padding: '10px', fontSize: '36px'}}>
                {frontmatter.title} 
                </h1>
                <p style={{textAlign: 'center', padding: '5px', fontSize: '18px', color: '#888'}}>
                    {`Published on: ${frontmatter.date}`}
                </p>
            </div>
            <MdxContent source={serialized}/>
        </article>
    )
}