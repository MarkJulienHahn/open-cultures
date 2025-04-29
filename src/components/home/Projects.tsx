import LivingLabComponent from "./LivingLabComponent";
import InteractingComponent from "./InteractingComponent";
import MediatingComponent from "./MediatingComponent";

export default async function LivingLab() {
  return (
    <div>
      <LivingLabComponent />
      <InteractingComponent />
      <MediatingComponent />
    </div>
  );
}
