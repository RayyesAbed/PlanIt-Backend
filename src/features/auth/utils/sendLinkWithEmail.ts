import path from "path";
import { promises as fs } from "fs";
import compileTemplate from "./compileTemplate";
import sendEmail from "../../../configs/nodemailer";
import EmailTemplateData from "../templates/types/EmailTemplateData";

const sendVerificationEmail = async (
  userName: string,
  userEmail: string,
  userLanguage: string,
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

  const verificationLink = `${FRONTEND_URL}/verify?token=${token}`;

  const t: EmailTemplateData["t"] = translations.verification; // access verification

  const html = await compileTemplate("emailVerify", {
    userLanguage,
    dir: translations.dir,
    name: userName,
    link: verificationLink,
    t,
  });

  await sendEmail(userEmail, t.subject, html);
};

export default sendVerificationEmail;
