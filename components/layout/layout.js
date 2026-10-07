import ContactForm from "components/form";
import { useTranslations } from "next-intl";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";

/*
 * Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 * Copyright 2022 Fonticons, Inc.
 */
const PhoneIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    {...props}
  >
    <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
  </svg>
);

/*
 * Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 * Copyright 2022 Fonticons, Inc.
 */
const FaxIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="currentColor"
    {...props}
  >
    <path d="M192 64h197.5L416 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C419.4 3.375 411.2 0 402.8 0H160C142.3 0 128 14.33 128 32v128h64V64zM64 128H32C14.38 128 0 142.4 0 160v320c0 17.62 14.38 32 32 32h32c17.62 0 32-14.38 32-32V160C96 142.4 81.63 128 64 128zM480 192H128v288c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V224C512 206.4 497.6 192 480 192zM288 432c0 8.875-7.125 16-16 16h-32C231.1 448 224 440.9 224 432v-32C224 391.1 231.1 384 240 384h32c8.875 0 16 7.125 16 16V432zM288 304c0 8.875-7.125 16-16 16h-32C231.1 320 224 312.9 224 304v-32C224 263.1 231.1 256 240 256h32C280.9 256 288 263.1 288 272V304zM416 432c0 8.875-7.125 16-16 16h-32c-8.875 0-16-7.125-16-16v-32c0-8.875 7.125-16 16-16h32c8.875 0 16 7.125 16 16V432zM416 304c0 8.875-7.125 16-16 16h-32C359.1 320 352 312.9 352 304v-32C352 263.1 359.1 256 368 256h32C408.9 256 416 263.1 416 272V304z" />
  </svg>
);

/**
 * Site layout.
 *
 * @param {*} props
 * @returns {React.ReactElement}
 */
function Layout({ title, children }) {
  const t = useTranslations("site");
  const siteTitle = t("title");

  return (
    <div className="flex min-h-full flex-col">
      <Head>
        <title>{title ? `${siteTitle} | ${title}` : siteTitle}</title>
      </Head>

      <header className="container">
        <div className="space-y-4 md:flex md:items-baseline md:justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="mt-4 block text-center md:text-start">
              <Image
                alt={t("title")}
                src="/logo-ice.png"
                width="202"
                height="64"
              />
            </a>
          </Link>

          {/* Nav */}
          <nav className="text-center font-semibold md:text-end">
            <ul className="flex justify-center leading-none text-brand space-i-12">
              <li className="hover:text-cyan-600 hover:underline">
                <Link href="/companies">{t("menu.companies")}</Link>
              </li>
              <li className="hover:text-cyan-600 hover:underline">
                <Link href="#contact-form">{t("menu.contactUs")}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero image for now - slider later */}
      <aside className="relative hidden aspect-[4.3/1] md:mt-4 md:block">
        <Image
          className="object-cover"
          src="/slider/3.jpg"
          layout="fill"
          priority
          alt=""
        />
      </aside>

      {/* Layout children */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer
        className="border border-t border-gray-200
          bg-gradient-to-b from-gray-50 to-gray-400
          pt-16 pb-8"
      >
        <div className="container">
          <h1 className="text-center text-3xl font-bold lg:text-start">
            {t("form.title")}
          </h1>

          <div className="justify-between lg:flex lg:space-i-16">
            {/* Contact form */}
            <div className="mx-auto max-w-prose lg:mx-0 lg:w-1/2">
              <ContactForm />
            </div>

            {/* Company Contact details + Address */}
            <div className="mt-8 lg:mt-20">
              <address className="mx-auto max-w-prose">
                <p>
                  {t("address.line1")}
                  <br />
                  {t("address.line2")}
                  <br />
                  {t("address.city")}&nbsp;{t("address.zip")}
                </p>

                <p className="mt-4 rtl:text-end" dir="ltr">
                  <PhoneIcon className="inline h-4 w-4 align-baseline text-gray-800 mie-2" />
                  <bdo dir="ltr">{t("address.phone")}</bdo>
                  <br />
                  <FaxIcon className="inline h-4 w-4 align-baseline text-gray-800 mie-2" />
                  <bdo dir="ltr">{t("address.fax")}</bdo>
                </p>
              </address>
            </div>
          </div>

          {/* Language & Copyright */}
          <div
            className="mt-16 text-center
              lg:flex lg:justify-between lg:text-start"
          >
            <LocaleSwitcher />
            <p className="mt-2 text-gray-600">
              <small>{t("copyright")}</small>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
