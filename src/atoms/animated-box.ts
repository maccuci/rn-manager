import * as React from 'react'
import { Theme } from '@/themes'
import { ViewProps } from 'react-native'
import Animated, { AnimatedProps } from 'react-native-reanimated'
import { createBox } from '@shopify/restyle'

const AnimatedBox = createBox<Theme, AnimatedProps<ViewProps>>(Animated.View)

export type AnimatedBoxProps = React.ComponentProps<typeof AnimatedBox>
export default AnimatedBox