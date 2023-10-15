import { getPost, getPostDetails } from '@/lib/get-posts';
import RootLayout from '@/components/layouts/RootLayout';
import PostBody from '@/components/mdx/post-body';

export default function Post({ post }) {
    return (
        <RootLayout>
            <div className="w-4/5 p-5 mt-36 mx-auto">
                <PostBody post={post}/>
            </div>
        </RootLayout>
    )
}


export async function getStaticPaths() {
    const postDetails = await getPostDetails();
    
    const paths = postDetails.map(postDeatil => ({
        params: { slug: postDeatil.slug }, // if your post ID is non-string, convert it
    }));
    
    return {
        paths,
        fallback: false // or 'blocking' based on your use case
    }
}


export async function getStaticProps({ params }) {
    const post = await getPost(params.slug); // Fetch post data based on ID

    return {
        props: {
            post
        }
    }
}
