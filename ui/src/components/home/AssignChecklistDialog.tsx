import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import StringAvatar from '../common/StringAvatar'
import { TeamMemberResponse } from '../../types/TeamMember'
import { useGetTeamMembers } from '../../queries/useTeamQueries'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { useState } from 'react'

export interface AssignChecklistDialogProps {
  open: boolean
  onClose: (value: TeamMemberResponse | null, date: Dayjs | null) => void
}

export default function AssignChecklistDialog(props: AssignChecklistDialogProps) {

  const { data: teamMembers, isLoading, error } = useGetTeamMembers()
  const [runDate, setRunDate] = useState<Dayjs | null>(null)
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberResponse | null>(null)

  const { onClose, open } = props

  const handleCancel = () => {
    onClose(null, null)
  }

  const handleAssign = () => {
    onClose(selectedTeamMember, runDate)
  }

  const handleTeamMemberSelected = (value: TeamMemberResponse) => {
    setSelectedTeamMember(value)
  }

  const handleDateChange = (date: Dayjs | null) => {
    setRunDate(date)
  }

  const readyToDisplay = !isLoading && !error && teamMembers

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>
        Assign a run of this checklist to ...
      </DialogTitle>

      {isLoading &&
        <CircularProgress />
      }

      {!readyToDisplay &&
        <Typography color='error'>
          Unable to load team members.
        </Typography>
      }

      {readyToDisplay &&
        <List sx={{ pt: 0 }}>
          {teamMembers.map((teamMember: TeamMemberResponse) => (
            <ListItem
              disableGutters
              key={teamMember.id}
              sx={teamMember.id == selectedTeamMember?.id ? {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              } : {}}
            >
              <ListItemButton onClick={() => handleTeamMemberSelected(teamMember)}>
                <ListItemAvatar>
                  <StringAvatar input={`${teamMember.firstName} ${teamMember.lastName}`} />
                </ListItemAvatar>
                <ListItemText primary={`${teamMember.firstName} ${teamMember.lastName}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      }

      <DateTimePicker
        label="Run this checklist at"
        onChange={handleDateChange}
        sx={{
          margin: 2,
        }}
      />

      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleAssign} color='primary'>
          Assign
        </Button>
      </DialogActions>
    </Dialog>
  )
}
