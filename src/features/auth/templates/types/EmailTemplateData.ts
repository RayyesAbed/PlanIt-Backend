type EmailTemplateData = {
  userLanguage: string;
  dir: "ltr" | "rtl";
  name: string;
  link: string;
  t: {
    subject: string;
    greeting: string;
    bodyText: string;
    buttonText: string;
    footer: string;
  };
};

export default EmailTemplateData;
