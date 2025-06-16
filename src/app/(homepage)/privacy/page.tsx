export const revalidate = 10;

import styles from "@/components/privacy/legals.module.css";
import { getDatenschutz } from "../../../../sanity/sanity-utils";
import { PortableText } from "next-sanity";
import Footer from "@/components/ui/Footer";

export default async function page() {
  const privacy = await getDatenschutz();

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.text}>
          <PortableText value={privacy.text} />
        </div>
      </main>
      <Footer />
    </>
  );
}
