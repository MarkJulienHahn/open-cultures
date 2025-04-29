import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: "anxs6t8r",
  dataset: "production",
  apiVersion: "2025-03-24",
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

export async function getTeam() {
  return client.fetch(`*[_type == "team"][0]{...}`);
}
export async function getPerson() {
  return client.fetch(`*[_type == "person"]{...}`);
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

export async function getInteracting() {
  return client.fetch(
    `*[_type == "interacting"][0]{text, image { alt, "url": asset->url, "dimensions": asset->metadata.dimensions}}`
  );
}

export async function getTML() {
  return client.fetch(`*[_type == "transdisciplinaryMethodLab"][0]{...}`);
}

export async function getMPC() {
  return client.fetch(`*[_type == "methodologicalPhdColloquium"][0]{...}`);
}
export async function getSummerSchools() {
  return client.fetch(`*[_type == "summerSchools"][0]{...}`);
}
export async function getConferences() {
  return client.fetch(`*[_type == "conferences"][0]{...}`);
}

export async function getLivingLabProjects() {
  return client.fetch(
    `*[_type == "livingLabProject"] | order(orderRank) {
      _id,
      _type,
      headline,
      subHeadline,
      text,
      images[]{
        asset->{
          _id,
          url
        },
        caption,
        alt
      }
    }`
  );
}

export async function getMediating() {
  return client.fetch(
    `*[_type == "mediating"][0]{text, image { alt, "url": asset->url, "dimensions": asset->metadata.dimensions}}`
  );
}

export async function getPrintedMatter() {
  return client.fetch(`*[_type == "printedMatter"][0]{...}`);
}

export async function getSpokenWord() {
  return client.fetch(`*[_type == "spokenWord"][0]{...}`);
}

export async function getFooter() {
  return client.fetch(
    `*[_type == "footer"][0]{
      text,
      email,
      partners[]{ "url": asset->url },
      supporters[]{ "url": asset->url }
    }`);
}
