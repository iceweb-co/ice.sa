import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const locale = ctx.locale ?? "en";
    const {
      site: { description },
    } = await import(`messages/${locale}.json`);
    return { ...initialProps, locale, description };
  }

  render() {
    const dir = this.props.locale.startsWith("ar") ? "rtl" : "ltr";

    return (
      /*
       * Using the em unit on the `html` tag is better for accessibility
       * because setting a px font size will override a user's chosen
       * default font size set in the browser.
       */
      <Html dir={dir} className="h-full" style={{ fontSize: "1em" }}>
        <Head>
          <meta name="description" content={this.props.description} />
          <link rel="dns-prefetch" href={process.env.API_URL} />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <style>
            {`
              #__next {
                height: 100%;
                isolation: isolate;
              }
            `}
          </style>
        </Head>
        <body className="h-full overflow-x-hidden bg-white font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
