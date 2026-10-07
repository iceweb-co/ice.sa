import Layout from "../components/layout/layout";
import { contentfulClient } from "../lib/contentful";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps({ locale }) {
  const cc = contentfulClient();
  const companies = await cc.getEntries({
    locale,
    content_type: "company",
  });

  return {
    props: {
      companies: companies.items,
      messages: require(`../messages/${locale}.json`),
    },
  };
}

export default function Home({ companies }) {
  const t = useTranslations();

  return (
    <Layout>
      {/* About Us */}
      <div className="container mt-16">
        <h1 className="text-center text-3xl font-bold text-brand md:text-start">
          {t("home.mainHeader")}
        </h1>

        <div className="items-top mt-4 flex justify-between space-i-12">
          <p className="max-w-prose text-xl font-light text-gray-800">
            {t("site.description")}
          </p>

          <div className="hidden lg:-mt-4 lg:block">
            <Image alt="" src="/icebrand.jpg" width={192} height={192} />
          </div>
        </div>
      </div>

      {/* Companies */}
      <section className="mt-16">
        <h1 className="bg-brand py-8 text-center text-2xl font-semibold text-white">
          {t("home.companiesHeader")}
        </h1>

        <ul
          className="container mb-16 mt-8
            md:flex md:flex-wrap md:items-center md:justify-center"
        >
          <br /> {/* To prevent margin-collapse of the mt-8 */}
          {companies.map(({ sys: { id }, fields: { logo, slug } }) => {
            const logoInfo = {
              url: `https:${logo.fields.file.url}`,
              alt: logo.fields.title,
            };

            return (
              <li
                key={id}
                className="mt-8 border-t border-transparent md:w-1/2 lg:w-1/3"
              >
                <Link href={`/companies#${slug}`}>
                  <a className="relative block h-20">
                    <Image
                      alt={logoInfo.alt}
                      src={logoInfo.url}
                      className="object-contain"
                      layout="fill"
                    />
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
