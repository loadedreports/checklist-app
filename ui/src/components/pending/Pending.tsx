import {
  Paper,
  Typography
} from '@mui/material'

export default function PendingChecklistRuns() {

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Pending Checklist Runs
      </Typography>

      <Paper sx={{ padding: '2rem' }}>
        <Typography
          variant='h6'
          color='error'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Not yet implemented.
        </Typography>
      </Paper>
    </>
  )
}
