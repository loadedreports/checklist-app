import {useMediaQuery, useTheme} from '@mui/material'

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type BreakpointMap = Record<BreakpointKey, unknown>

/**
 * Returns the value from the provided breakdpoint map that matches the current
 * device breakpoint.
 * @param breakpointMap 
 * @returns The value from the breakpoint map where the key matches the current
 * device breakpoint.
 */
export default function useCurrentBreakpoint<T>(
  breakpointMap: BreakpointMap
) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  if (isXs) return breakpointMap.xs as T;
  if (isSm) return breakpointMap.sm as T;
  if (isMd) return breakpointMap.md as T;
  if (isLg) return breakpointMap.lg as T;
  if (isXl) return breakpointMap.xl as T;

  return null
}