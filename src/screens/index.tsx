import Container from "@/atoms/container";
import ResponsiveLayout from "@/components/responsive-layout";
import ScreenTest from "./test";

export default function MainScreen() {
  return (
    <Container>
      <ResponsiveLayout
        renderOnPhone={() => <ScreenTest />}
        renderOnTablet={() => <ScreenTest />}
      />
    </Container>
  );
}
