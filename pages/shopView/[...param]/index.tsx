import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {useRouter} from 'next/router';
import ShopViewContainer from "../../../containers/Common/ShopViewContainer";

const ShopViewPage: NextPage = () => {

    const query = useRouter().query;

    console.log(query);

    return (
        <>
            <ShopViewContainer/>
        </>
    )
}
/*
ShopViewPage.getInitialProps = async ({ query, store }) => {
    const { id } = query;

    try {

    } catch (e) {
        console.log(e);
    }
    return {};
};
 */

// export const getStaticPaths: GetStaticPaths = async () => {
//     const posts = [{id: '3'}, {id: '4'}, {id: '5'}, {id: 'notebook'}];
//     const paths = posts.map((post) => ({
//         params: {id: post.id},
//     }));
//     return {paths, fallback: false};
// };
//
// export const getStaticProps: GetStaticProps = async (context) => {
//     const postId = context.params?.id || '';
//     const post = {id: postId, content: `I'm the post with id ${postId}!`};
//     return {props: {post}};
// };

export default ShopViewPage;
