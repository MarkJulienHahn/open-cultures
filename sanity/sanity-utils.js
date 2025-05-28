import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "anxs6t8r",
  dataset: "production",
  apiVersion: "2025-03-24",
  useCdn: false, // wieder rausnehmen für Production!
});

export async function getNews() {
  return client.fetch(`*[_type == "newsmeldung"] | order(orderRank) {
        title,
        text,
        image {
            alt,
            "url": asset->url,
            "dimensions": asset->metadata.dimensions
        },
        slug, 
        lab,
      }`);
}
export async function getOpenCultures() {
  return client.fetch(`*[_type == "openCultures"][0]{...}`);
}
export async function getOpenPlanning() {
  return client.fetch(`*[_type == "openPlanning"][0]{...}`);
}
export async function getOpenFactory() {
  return client.fetch(`*[_type == "openFactory"][0]{...}`);
}
export async function getOpenImaginaries() {
  return client.fetch(`*[_type == "openImaginaries"][0]{...}`);
}
export async function getTeam() {
  return client.fetch(`*[_type == "team"][0]{...}`);
}
export async function getPerson() {
  return client.fetch(
    `*[_type == "person"]|order(name){..., portrait {alt, "url": asset->url}}`
  );
}
export async function getAdvisoryBoard() {
  return client.fetch(`*[_type == "advisoryBoard"]{...}`);
}
export async function getPraxisPartners() {
  return client.fetch(`*[_type == "praxisPartners"]{...}`);
}
export async function getLivingLab() {
  return client.fetch(
    `*[_type == "livingLab"][0]{text, image { alt, "url": asset->url, "dimensions": asset->metadata.dimensions}}`
  );
}

export async function getLivingLabProjects() {
  return client.fetch(
    `*[_type == "livingLabProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`
  );
}

export async function getInteracting() {
  return client.fetch(
    `*[_type == "interacting"][0]{text, image { alt, "url": asset->url, "dimensions": asset->metadata.dimensions}}`
  );
}

export async function getTML() {
  return client.fetch(`*[_type == "transdisciplinaryMethodLab"][0]{...}`);
}
export async function getTMLProjects() {
  return client.fetch(`*[_type == "transdisciplinaryMethodLabProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`);
}

export async function getMPC() {
  return client.fetch(`*[_type == "methodologicalPhdColloquium"][0]{...}`);
}

export async function getMPCProjects() {
  return client.fetch(`*[_type == "methodologicalPhdColloquiumProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`);
}

export async function getSummerSchools() {
  return client.fetch(`*[_type == "summerSchools"][0]{...}`);
}

export async function getSummerSchoolsProjects() {
  return client.fetch(`*[_type == "summerSchoolsProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`);
}

export async function getConferences() {
  return client.fetch(`*[_type == "conferences"][0]{...}`);
}

export async function getConferencesProjects() {
  return client.fetch(`*[_type == "conferencesProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`);
}

export async function getMediating() {
  return client.fetch(
    `*[_type == "mediating"][0]{text, image { alt, "url": asset->url, "dimensions": asset->metadata.dimensions}}`
  );
}

export async function getMediatingProjects() {
  return client.fetch(
    `*[_type == "mediatingProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`
  );
}

export async function getPrintedMatter() {
  return client.fetch(`*[_type == "printedMatter"][0]{...}`);
}

export async function getPrintedMatterProjects() {
  return client.fetch(
    `*[_type == "printedMatterProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`
  );
}

export async function getSpokenWord() {
  return client.fetch(`*[_type == "spokenWord"][0]{...}`);
}

export async function getSpokenWordProjects() {
  return client.fetch(
    `*[_type == "spokenWordProject"] | order(orderRank) {
      slug, 
      headline,
      subHeadline,
      text,
      images[] { alt, caption, "url": asset->url, "dimensions": asset->metadata.dimensions}
    }`
  );
}

export async function getFooter() {
  return client.fetch(
    `*[_type == "footer"][0]{
      coordination,
      info,
      address,
      contact,
      email,
      partners[]{ "url": asset->url },
      supporters[]{ "url": asset->url }
    }`
  );
}

export async function getImpressum() {
  return client.fetch(`*[_type == "impressum"][0]{...}`);
}

export async function getDatenschutz() {
  return client.fetch(`*[_type == "datenschutz"][0]{...}`);
}
