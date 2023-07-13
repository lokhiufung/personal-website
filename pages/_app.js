import '@/styles/globals.css'
import Script from 'next/script';

function App({ Component, pageProps }) {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TTTL9SQWM3" />
            <Script
                id="google-analytics"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-TTTL9SQWM3');
                    `
                }}
            />
        <Component {...pageProps} />
        </>
    )
}

export default App;
