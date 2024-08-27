import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@mui/material'

import dayjs from 'dayjs'
import { ChecklistRunResponse } from '../../types/ChecklistRun'

export default function CompletedChecklistRuns() {

  const exampleChecklistRuns: ChecklistRunResponse[] = [
    {
      "id": 1,
      "runAt": "2024-08-29T00:00:00+00:00",
      "completedAt": "2024-08-27T01:13:37.755933+00:00",
      "checklist": {
        "id": 1,
        "createdAt": "2024-04-01T11:00:00+13:00",
        "name": "Start of day - kitchen",
        "description": "Checklist tracking what needs to be done first thing in the kitchen.",
        "items": []
      },
      "teamMember": {
        "id": 1,
        "firstName": "Ava",
        "lastName": "Cado",
        "email": "ava@example.com"
      }
    },
    {
      "id": 2,
      "runAt": "2024-08-28T10:00:00+00:00",
      "completedAt": "2024-08-27T01:37:14.955916+00:00",
      "checklist": {
        "id": 2,
        "createdAt": "2024-04-01T11:40:00+13:00",
        "name": "End of day - kitchen",
        "description": "Closing process for end of day.",
        "items": []
      },
      "teamMember": {
        "id": 3,
        "firstName": "Pete",
        "lastName": "Zah",
        "email": "pete@example.com"
      }
    },
    {
      "id": 3,
      "runAt": "2024-08-28T18:00:00+00:00",
      "completedAt": "2024-08-27T01:38:14.910418+00:00",
      "checklist": {
        "id": 3,
        "createdAt": "2024-06-11T08:00:00+12:00",
        "name": "Midday check in",
        "description": "Lists of tasks to be completed around midday, these can be done by anyone.",
        "items": []
      },
      "teamMember": {
        "id": 1,
        "firstName": "Ava",
        "lastName": "Cado",
        "email": "ava@example.com"
      }
    }
  ]

  return (
    <>
    <Typography variant='h4' color='text.primary' gutterBottom>
      Completed Checklist Runs
    </Typography>

    <Paper>

      {!exampleChecklistRuns &&
        <Typography color='error'>
          Unable to load checklist runs.
        </Typography>
      }

      <Typography
        variant='h6'
        color='error'
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 2 }}
      >
        This page is currently using mock data. 
      </Typography>

      {exampleChecklistRuns &&
      <Table
        sx={{
          minWidth: 650,
          '& .MuiTableHead-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
          }
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Checklist</TableCell>
            <TableCell>Team Member</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Completed Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exampleChecklistRuns.map((checklistRun) => (
            <TableRow
              key={checklistRun.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{checklistRun.checklist?.name}</TableCell>
              <TableCell>{checklistRun.teamMember?.firstName} {checklistRun.teamMember?.lastName}</TableCell>
              <TableCell>{dayjs(checklistRun.runAt).format('ddd, MMM D, YYYY, h:mm A')}</TableCell>
              <TableCell>{dayjs(checklistRun.completedAt).format('ddd, MMM D, YYYY, h:mm A')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }
    </Paper>
    </>
  )
}
