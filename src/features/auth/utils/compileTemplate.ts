import { promises as fs } from "fs";
import path from "path";
import Handlebars from "handlebars";
import EmailTemplateData from "../templates/types/EmailTemplateData";

const compileTemplate = async (
  templateName: string,
  data: EmailTemplateData
) => {
  const layoutPath = path.join(__dirname, "../templates", "layout.hbs"); // shared layout
  const contentPath = path.join(
    __dirname,
    "../templates",
    "custom",
    `${templateName}.hbs`
  ); // dynamic layout (email verify for now)

  const [layoutSrc, contentSrc] = await Promise.all([
    fs.readFile(layoutPath, "utf-8"),
    fs.readFile(contentPath, "utf-8"),
  ]);

  const contentTemplate = Handlebars.compile(contentSrc); // compile content handlebars file
  const contentHtml = contentTemplate(data); // then pass localized and user data to it

  const layoutTemplate = Handlebars.compile(layoutSrc);

  return layoutTemplate({ ...data, body: contentHtml });
};

export default compileTemplate;
