import useResponsiveLayout from '@/hooks/useResponsiveLayout'
import React, { ReactElement } from 'react'
import { useEffect } from 'react'

type Props = {
  renderOnTablet?: () => ReactElement<any, any>
  renderOnPhone?: () => ReactElement<any, any>
  onLayoutChange?: (layout: 'tablet' | 'phone') => any
}

const ResponsiveLayout: React.FC<Props> = props => {
  const { isTablet } = useResponsiveLayout()
  const { renderOnTablet, renderOnPhone, onLayoutChange } = props
  let children: React.ReactElement<any, any> | null = null

  if (isTablet === true && renderOnTablet) {
    children = renderOnTablet()
  } else if (isTablet === false && renderOnPhone) {
    children = renderOnPhone()
  }

  useEffect(() => {
    onLayoutChange && onLayoutChange(isTablet === true ? 'tablet' : 'phone')
  }, [isTablet])

  return children
}

export default ResponsiveLayout