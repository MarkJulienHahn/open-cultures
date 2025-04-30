"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";

export default function RouterComponent({
  section,
  id,
}: {
  section: string;
  id?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView({ threshold: 1 });

  // Create a function to update search params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (inView) {
      // Update just the search params, not the entire path
      const newUrl = pathname + "?" + createQueryString("section", section);
      router.push(newUrl, { scroll: false });
    }
  }, [inView, router, section, pathname, createQueryString]);

  return (
    <div
      style={{
        position: "absolute",
        height: "50vh",
        width: "1px",
        marginTop: "-100px",
      }}
      ref={ref}
      id={id}
    ></div>
  );
}