import LivingLabComponent from "./LivingLabComponent";
import InteractingComponent from "./InteractingComponent";
import MediatingComponent from "./MediatingComponent";

import styles from "./projects.module.css"

export default async function LivingLab() {
  return (
    <div className={styles.wrapper}>
      <LivingLabComponent />
      <InteractingComponent />
      <MediatingComponent />
    </div>
  );
}
