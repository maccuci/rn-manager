import { searchInputHasFocusAtom } from '@/states/search-bar'
import { useAtom } from 'jotai'
import useResponsiveLayout from './useResponsiveLayout'

const useDrawerEnabled = () => {
  const [searchInputHasFocus] = useAtom(searchInputHasFocusAtom)
  const { isTablet, isPortrait } = useResponsiveLayout()
  if (isTablet) {
    return isPortrait
  } else {
    return !searchInputHasFocus
  }
}

export default useDrawerEnabled