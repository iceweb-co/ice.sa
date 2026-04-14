import Layout from "components/layout/layout";
import { contentfulClient } from "lib/contentful";
import { useTranslations } from "next-intl";
import Image from "next/image";

export async function getStaticProps({ locale }) {
  const cc = contentfulClient();
  const companies = await cc.getEntries({
    locale,
    content_type: "company",
  });

  return {
    props: {
      companies: companies.items,
      messages: require(`messages/${locale}.json`),
    },
  };
}

export default function Companies({ companies }) {
  const t = useTranslations("site");

  return (
    <Layout title={t("menu.companies")}>
      <section>
        {companies.map((company) => {
          const {
            name,
            slug,
            description,
            servicesHeader,
            services,
            ctaText,
            ctaUrl,
            brandColor,
          } = company.fields;
          const logo = {
            url: `https:${company.fields.logo.fields.file.url}`,
            alt: company.fields.logo.fields.title,
            width: company.fields.logo.fields.file.details.image.width,
            height: company.fields.logo.fields.file.details.image.height,
          };
          const banner = {
            url: `https:${company.fields.banner.fields.file.url}`,
            alt: company.fields.banner.fields.title,
            width: company.fields.banner.fields.file.details.image.width,
            height: company.fields.banner.fields.file.details.image.height,
          };

          return (
            <article key={company.sys.id}>
              <header className="py-8" style={{ backgroundColor: brandColor }}>
                <h1
                  className="text-center text-3xl font-bold text-white"
                  id={slug}
                >
                  {name}
                </h1>
              </header>

              <div className="container my-8">
                <div className="mx-5 space-i-8 md:flex">
                  <div className="text-center md:text-start">
                    <img className="inline-block" alt={name} src={logo.url} />
                  </div>
                  <p className="mt-4 max-w-prose md:mt-0">{description}</p>
                </div>

                <div className="mx-5 mt-4 items-center justify-between md:flex">
                  <div className="">
                    <h1
                      className="text-xl font-semibold"
                      style={{ color: brandColor }}
                    >
                      {servicesHeader}
                    </h1>
                    <ul className="mt-4 list-inside list-disc pis-4">
                      {services.map((service) => {
                        return <li key={service}>{service}</li>;
                      })}
                    </ul>

                    {ctaText && (
                      <a
                        className="mt-4 inline-block rounded px-4 py-2 text-white"
                        href={ctaUrl}
                        style={{ backgroundColor: brandColor }}
                      >
                        {ctaText}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline h-6 w-6 mis-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>

                  <div className="relative hidden h-64 w-64 md:block">
                    {banner && (
                      <Image
                        className="object-contain"
                        alt=""
                        src={banner.url}
                        layout="fill"
                      />
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </Layout>
  );
}
