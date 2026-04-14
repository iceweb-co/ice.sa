import formurlencoded from "form-urlencoded";
import { sendEmail } from "lib/mailgun";

export default async function handler(req, res) {
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: formurlencoded({
        response: req.body.token,
        secret: process.env.GOOGLE_RECAPTCHA_SECRET,
      }),
    }
  );

  const recaptchaResponse = await response.json();
  console.log(recaptchaResponse.score);

  if (recaptchaResponse.success && recaptchaResponse.score > 0.5) {
    sendEmail(req.body.name, req.body.email, req.body.message);
    return res.status(200).json();
  } else {
    res.status(400).json({});
  }

  res.status(200).json({});
}
