export const revalidate = 10;

import styles from "@/components/privacy/legals.module.css";
import { getDatenschutz } from "../../../../sanity/sanity-utils";

import Footer from "@/components/ui/Footer";
import { PortableTextWithLinks } from "@/components/ui/utils/PortableTextWithLinks";

export default async function page() {
  const privacy = await getDatenschutz();

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.text}>
          <PortableTextWithLinks value={privacy.text} />
        </div>
      </main>
      <Footer />
    </>
  );
}
