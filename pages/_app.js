import "tailwindcss/tailwind.css";

import { NextIntlProvider } from "next-intl";

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  // Update the HTML element's `dir` attribute if needed
  const router = useRouter();
  useEffect(() => {
    const dir = router.locale.startsWith("ar") ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
  }, [router.locale]);

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}
