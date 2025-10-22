export const revalidate = 10;

import styles from "@/components/privacy/legals.module.css";
import { getImpressum } from "../../../../sanity/sanity-utils";
import Footer from "@/components/ui/Footer";
import { PortableTextWithLinks } from "@/components/ui/utils/PortableTextWithLinks";

export default async function page() {
  const impressum = await getImpressum();

  return (
    <>
      <main className={styles.wrapper}>
        <div className={styles.text}>
          <PortableTextWithLinks value={impressum.text} />
        </div>
      </main>
      <Footer />
    </>
  );
}
