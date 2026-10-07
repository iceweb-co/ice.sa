import { Buffer } from "buffer";
import formulencoded from "form-urlencoded";

const BASE_URL = "api.mailgun.net/v3";
const PUBLIC_KEY = process.env.MAILGUN_PUBLIC_KEY;
const PRIVATE_KEY = process.env.MAILGUN_API_KEY;

export const sendEmail = async (senderName, sender, message) => {
  var sendParameters = {
    from: "ICE Notifications <notify@iceweb.co>",
    to: "msaadany@iceweb.co",
    "h:Reply-To": sender,
    subject: "ice.sa Contact Form - New Message",
    text: message,
  };

  if (senderName !== undefined && senderName !== "") {
    sendParameters.subject = sendParameters.subject + " From: " + senderName;
  }
  const auth = Buffer.from(`api:${PRIVATE_KEY}`).toString("base64");
  const url = `https://${BASE_URL}/notify.iceweb.co/messages`;
  const response = await fetch(url, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${auth}`,
    },
    method: "POST",
    body: formulencoded(sendParameters),
  });
  console.log(response);
  console.log(await response.json());
};
