export interface TextBlock {
  _key: string;
  _type: 'block';
  style: string;
  children: Array<{
    _key: string;
    _type: 'span';
    text: string;
    marks: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: unknown;
  }>;
}

export interface ImageType {
  caption: { en: string, de: string };
  url: string;
  alt?: string;
  dimensions: { _type: string, width: number, height: number, aspectRatio: number }
}

export interface Slug {
  current: string
}

export type NewsType = {
  title: string,
  text: TextBlock,
  image: ImageType,
  slug?: string,
  lab?: string
}

export type PersonType = {
  affiliation?: string,
  position?: string,
  website?: string,
  lab?: string,
  title?: string,
  name: string,
  text: TextBlock,
  slug: { current: string },
  quote?: TextBlock
}

export type ProjectType = {
  text: TextBlock;
  headline?: string;
  subHeadline?: string;
  slug: { current: string };
  images?: ImageType[];
};