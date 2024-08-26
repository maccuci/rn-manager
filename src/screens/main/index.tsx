import Container from "@/atoms/container";
import ResponsiveLayout from "@/components/responsive-layout";
import MobileMainScreen from "./mobile";

export default function MainScreen() {
  return (
    <Container>
      <ResponsiveLayout
        renderOnPhone={() => <MobileMainScreen />}
        renderOnTablet={() => <MobileMainScreen />}
      />
    </Container>
  );
}
