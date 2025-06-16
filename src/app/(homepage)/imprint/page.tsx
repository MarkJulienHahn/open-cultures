export const revalidate = 10;

import styles from "@/components/privacy/legals.module.css";
import { getImpressum } from "../../../../sanity/sanity-utils";
import { PortableText } from "next-sanity";
import Footer from "@/components/ui/Footer";

export default async function page() {
  const impressum = await getImpressum();

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.text}>
          <PortableText value={impressum.text} />
        </div>
      </main>
      <Footer />
    </>
  );
}
