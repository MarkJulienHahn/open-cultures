"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";

type PortableTextWithLinksProps = {
  value: any;
  className?: string;
};

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || "";

      return (
        <a href={href} target={"_blank"} rel={"noopener noreferrer"}>
          {children} ↗
        </a>
      );
    },
  },
};

export function PortableTextWithLinks({ value }: PortableTextWithLinksProps) {
  return <PortableText value={value} components={components} />;
}
