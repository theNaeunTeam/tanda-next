import Document, {DocumentContext, Head, Html, Main, NextScript,} from "next/document";
import {ServerStyleSheet} from "styled-components";

class MyDocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8"/>
                    <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
                    <meta name="title" content="탄다오더"/>
                    <meta name="description" content="탄소 다이어트를 실천하는 마켓"/>
                    <link rel="canonical" href="https://thenaeunteam.link/"/>
                    <meta property="og:type" content="website"/>
                    <meta property="og:url" content="https://thenaeunteam.link/"/>
                    <meta property="og:title" content="탄다오더"/>
                    <meta property="og:description" content="탄소 다이어트 오더"/>
                    <meta property="og:image"
                          content="https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/image%202.png"/>
                    <meta property="twitter:card" content="summary_large_image"/>
                    <meta property="twitter:url" content="https://thenaeunteam.link/"/>
                    <meta property="twitter:title" content="탄다오더"/>
                    <meta property="twitter:description" content="탄소 다이어트 마켓"/>
                    <meta property="twitter:image"
                          content="https://thebetterteam-image.s3.ap-northeast-2.amazonaws.com/image%202.png"/>
                    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png"/>
                    <link rel="manifest" href="%PUBLIC_URL%/manifest.json"/>
                    <script
                        type="text/javascript"
                        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d7ce0d0be1747514097184bcef3a61d1&libraries=services,clusterer"
                    />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
