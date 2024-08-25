import { useWindowDimensions } from 'react-native'

const RESPONSIVE_SCREEN_BREAKPOINT = 1024

const useResponsiveLayout = () => {
    const screenSize = useWindowDimensions()
    const isTablet = screenSize.width >= RESPONSIVE_SCREEN_BREAKPOINT || screenSize.height >= RESPONSIVE_SCREEN_BREAKPOINT
    const isPortrait = screenSize.width < screenSize.height

    return { isTablet, isPortrait }
}

export default useResponsiveLayout