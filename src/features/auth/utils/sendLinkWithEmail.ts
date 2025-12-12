import path from "path";
import { promises as fs } from "fs";
import compileTemplate from "./compileTemplate";
import sendEmail from "../../../configs/nodemailer";

const sendLinkWithEmail = async (
  userName: string,
  userEmail: string,
  userLanguage: string,
  templateName: string,
  token: string
) => {
  const FRONTEND_URL = process.env.FRONTEND_URL;

  const localePath = path.join(
    __dirname,
    "../",
    "templates",
    "locales",
    `${userLanguage}.json`
  );

  const translations = JSON.parse(await fs.readFile(localePath, "utf8")); // Read translations

  let emailVerificationLink = "";

  let t; // Template data in Email (subject, greeting, bodyText, buttonText, footer)

  if (templateName == "emailVerify") {
    emailVerificationLink = `${FRONTEND_URL}/verify?token=${token}`;
    t = translations.verification; // access verification
  } else if (templateName == "passwordReset") {
    emailVerificationLink = `${FRONTEND_URL}/verify?password-reset-token=${token}`;
    t = translations.passwordReset; // access password reset
  }

  const html = await compileTemplate(templateName, {
    userLanguage,
    dir: translations.dir,
    name: userName,
    link: emailVerificationLink,
    t,
  });

  await sendEmail(userEmail, t.subject, html);
};

export default sendLinkWithEmail;
