import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import AppRoutes from './Routes'

const queryClient = new QueryClient()
const theme = createTheme()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRoutes />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}