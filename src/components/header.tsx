import React, { useCallback } from "react";
import AnimatedBox, { AnimatedBoxProps } from "@/atoms/animated-box";
import FeatherIcon from "@/components/icon";
import { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { TouchableOpacity } from "@/atoms/touchable";
import Box from "@/atoms/box";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/themes";

type Props = AnimatedBoxProps & {
  onPress: () => void;
  backButtonVisible: boolean;
};

export const HeaderBarLeftButton: React.FC<Props> = (props) => {
  const { onPress, backButtonVisible } = props;
  const theme = useTheme<Theme>();

  const backButtonStyle = useAnimatedStyle(
    () => ({
      transform: [
        { rotateZ: withTiming(backButtonVisible ? `0deg` : `180deg`) },
      ],
      opacity: withTiming(backButtonVisible ? 1 : 0, {
        easing: Easing.in(Easing.quad),
      }),
      color: "white"
    }),
    [backButtonVisible]
  );

  return (
    <TouchableOpacity m="xs" p="xs" onPress={onPress} rippleBorderless>
      <AnimatedBox
        position="absolute"
        width={30}
        height={30}
        alignItems="center"
        justifyContent="center"
        style={backButtonStyle}
      >
        <FeatherIcon name="menu" size={26} />
      </AnimatedBox>
      <Box width={22} height={22} />
    </TouchableOpacity>
  );
};

type HProps = AnimatedBoxProps & {
  onSidebarToggle: () => any;
  isOpen: boolean;
};

export const HeaderBar = (props: HProps) => {
  const { onSidebarToggle, isOpen, ...rest } = props;

  const handleLeftButtonPress = useCallback(() => {
    onSidebarToggle();
  }, [onSidebarToggle]);

  return (
    <AnimatedBox position="absolute" top={0} left={0} right={0} {...rest}>
      <HeaderBarLeftButton
        onPress={handleLeftButtonPress}
        backButtonVisible={props.isOpen}
      />
    </AnimatedBox>
  );
};
