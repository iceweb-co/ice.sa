import { useTranslations } from "next-intl";
import Script from "next/script";

function setInputError({ target: input }) {
  const { dataset: { error } } = input; // prettier-ignore
  const { validity: { typeMismatch } } = input; // prettier-ignore
  if (typeMismatch) {
    input.setCustomValidity(error);
    input.classList.add("border-red-600");
  } else {
    input.setCustomValidity("");
    input.classList.remove("border-red-600");
  }
}

/**
 * Footer contact form.
 *
 * @returns {React.ReactElement}
 */
export default function ContactForm() {
  const t = useTranslations("site.form");

  function handleSubmit(e) {
    e.preventDefault();
    grecaptcha.ready(async function () {
      const token = await grecaptcha.execute(
        "6LeT-K0gAAAAAAy3DgfYLM_6LK7SvHYj3c7ctVF4",
        {
          action: "submit",
        }
      );

      const form = e.target;
      const formData = new FormData(form);
      const searchParams = new URLSearchParams();
      searchParams.append("name", formData.get("name"));
      searchParams.append("email", formData.get("email"));
      searchParams.append("message", formData.get("message"));
      searchParams.append("token", token);

      const response = await fetch("/api/contact-form", {
        method: "POST",
        body: searchParams,
      });

      response.json().then((body) => {
        console.log(body);
      });
    });
  }

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js?render=6LeT-K0gAAAAAAy3DgfYLM_6LK7SvHYj3c7ctVF4" />
      <form
        id="contact-form"
        name="contact"
        className="mt-8 flex flex-col space-y-4"
        action="/api/contact-form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label className="block">
          {t("name")}
          <input
            className="mt-2 w-full"
            type="text"
            autoComplete="name"
            name="name"
            dir="auto"
          />
        </label>

        <label className="block">
          {t("email")}
          <input
            className="mt-2 w-full"
            type="email"
            autoComplete="email"
            name="email"
            dir="auto"
            required
            data-error={t("emailFeedback")}
            onInput={setInputError}
          />
        </label>
        <label className="block">
          {t("message")}
          <textarea
            className="mt-2 w-full"
            rows="4"
            autoComplete="off"
            name="message"
            dir="auto"
            required
            data-error={t("messageFeedback")}
            onInvalid={setInputError}
          ></textarea>
        </label>

        <button className="self-start rounded bg-brand px-8 py-2 text-white hover:bg-brand-dark active:bg-black">
          {t("submit")}
        </button>
      </form>
    </>
  );
}
