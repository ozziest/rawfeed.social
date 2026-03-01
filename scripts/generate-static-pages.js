const fs = require("fs");
const path = require("path");

const pages = [
  {
    ejs: "views/legal/terms.ejs",
    tsx: "src/views/legal/Terms.tsx",
    fn: "TermsPage",
    title: "Terms of Service - Rawfeed",
  },
  {
    ejs: "views/legal/privacy.ejs",
    tsx: "src/views/legal/Privacy.tsx",
    fn: "PrivacyPage",
    title: "Privacy Policy - Rawfeed",
  },
  {
    ejs: "views/legal/cookies.ejs",
    tsx: "src/views/legal/Cookies.tsx",
    fn: "CookiesPage",
    title: "Cookie Policy - Rawfeed",
  },
  {
    ejs: "views/legal/data-rights.ejs",
    tsx: "src/views/legal/DataRights.tsx",
    fn: "DataRightsPage",
    title: "Data Subject Rights - Rawfeed",
  },
  {
    ejs: "views/legal/dpa.ejs",
    tsx: "src/views/legal/DPA.tsx",
    fn: "DPAPage",
    title: "Data Processing Agreement - Rawfeed",
  },
  {
    ejs: "views/legal/bots.ejs",
    tsx: "src/views/legal/Bots.tsx",
    fn: "BotsLegalPage",
    title: "Bots & Automation - Rawfeed",
  },
];

function prepareHtml(raw) {
  return (
    raw
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, "")
      // Remove EJS include/output/logic tags (layouts handle partials)
      .replace(/<%[-=][\s\S]*?%>/g, "")
      .replace(/<%[\s\S]*?%>/g, "")
      // Replace bare <br> with <br />
      .replace(/<br>/g, "<br />")
      // Replace bare <hr> with <hr />
      .replace(/<hr>/g, "<hr />")
      // Replace bare <input with <input ... /> (ensure self-closing)
      .replace(/<input([^>]*)>/g, "<input$1 />")
      .trim()
  );
}

for (const p of pages) {
  const raw = fs.readFileSync(p.ejs, "utf-8");
  const content = prepareHtml(raw);
  fs.mkdirSync(path.dirname(p.tsx), { recursive: true });
  const tsxContent = `import type { BaseProps } from '../../types/views';
import { DefaultLayout } from '../layouts/DefaultLayout';

type Props = BaseProps;

export function ${p.fn}(props: Props) {
  return (
    <DefaultLayout {...props} title="${p.title}">
      <>
        ${content.trim()}
      </>
    </DefaultLayout>
  );
}
`;
  fs.writeFileSync(p.tsx, tsxContent);
  console.log("Created", p.tsx);
}

// About page
const aboutRaw = fs.readFileSync("views/about.ejs", "utf-8");
const aboutContent = prepareHtml(aboutRaw);
fs.mkdirSync("src/views", { recursive: true });
const aboutTsx = `import type { BaseProps } from '../types/views';
import { LandingLayout } from './layouts/LandingLayout';

type Props = BaseProps;

export function AboutPage(props: Props) {
  return (
    <LandingLayout {...props} title="About - Rawfeed">
      <>
        ${aboutContent.trim()}
      </>
    </LandingLayout>
  );
}
`;
fs.writeFileSync("src/views/About.tsx", aboutTsx);
console.log("Created src/views/About.tsx");
