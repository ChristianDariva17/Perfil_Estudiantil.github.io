import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "proyectos/sistema-desayunos.html",
  "proyectos/canales-abiertos.html",
  "proyectos/ucayali-decide.html",
];
const siteUrl =
  "https://christiandariva17.github.io/Perfil_Estudiantil.github.io/";
const failures = [];

function fail(file, message) {
  failures.push(`${file}: ${message}`);
}

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

function checkInternalReferences(file, source) {
  const references = source.matchAll(/(?:href|src)=["']([^"']+)["']/gi);

  for (const [, reference] of references) {
    if (
      !reference ||
      reference.startsWith("#") ||
      reference.startsWith("//") ||
      /^[a-z][a-z\d+.-]*:/i.test(reference)
    ) {
      continue;
    }

    const relativePath = reference.split(/[?#]/, 1)[0];
    const target = relativePath.startsWith("/")
      ? path.resolve(root, relativePath.slice(1))
      : path.resolve(root, path.dirname(file), relativePath);

    if (!existsSync(target)) {
      fail(file, `referencia interna inexistente: ${reference}`);
    }
  }
}

for (const file of pages) {
  const source = readFileSync(path.join(root, file), "utf8");

  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(source)) {
    fail(file, "falta el atributo lang en html");
  }

  if (!/<title>\s*[^<]+\s*<\/title>/i.test(source)) {
    fail(file, "falta un title no vacío");
  }

  if (
    !/<meta\s+name=["']description["'][^>]+content=["'][^"']+["']/i.test(source)
  ) {
    fail(file, "falta una meta description no vacía");
  }

  if (!/<link\s+rel=["']canonical["'][^>]+href=["']https:\/\//i.test(source)) {
    fail(file, "falta un canonical absoluto");
  }

  if (countMatches(source, /<h1\b/gi) !== 1) {
    fail(file, "debe existir exactamente un h1");
  }

  for (const image of source.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt=["'][^"']*["']/i.test(image)) {
      fail(file, "cada imagen debe tener alt");
    }
  }

  for (const [, json] of source.matchAll(
    /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(json);
    } catch (error) {
      fail(file, `JSON-LD inválido: ${error.message}`);
    }
  }

  checkInternalReferences(file, source);
}

const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");
const expectedUrls = [
  siteUrl,
  `${siteUrl}proyectos/sistema-desayunos.html`,
  `${siteUrl}proyectos/canales-abiertos.html`,
  `${siteUrl}proyectos/ucayali-decide.html`,
];

for (const url of expectedUrls) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    fail("sitemap.xml", `falta la URL ${url}`);
  }
}

const robots = readFileSync(path.join(root, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${siteUrl}sitemap.xml`)) {
  fail("robots.txt", "falta la referencia al sitemap");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Quality checks passed for ${pages.length} HTML pages.`);
}
