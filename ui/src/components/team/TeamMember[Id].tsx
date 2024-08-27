import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Lock'
import StopEditingIcon from '@mui/icons-material/LockOpen'
import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import { useDeleteTeamMember, useGetTeamMember, useUpdateTeamMember } from '../../queries/useTeamQueries'
import EditableTypography from '../common/EditableTypography'
import StringAvatar from '../common/StringAvatar'

export default function TeamMemberPage() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [isEditing, setIsEditing] = useState(false)

  const teamMemberId = parseInt(id || '')

  const {
    data: teamMember,
    isLoading,
    error,
  } = useGetTeamMember(isNaN(teamMemberId) ? 0 : teamMemberId)

  const updateTeamMember = useUpdateTeamMember()
  const deleteTeamMember = useDeleteTeamMember()

  if (!id || isNaN(teamMemberId) || !teamMember) {
    return <Typography>Checklist not found</Typography>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color='error'>Error: {error.message}</Typography>
  }

  const handleFirstNameUpdate = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    updateTeamMember.mutate(
      {
        id: teamMember.id,
        teamMember: { ...teamMember, firstName: newValue }
      }
    )
  }

  const handleLastNameUpdate = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    updateTeamMember.mutate(
      {
        id: teamMember.id,
        teamMember: { ...teamMember, lastName: newValue }
      }
    )
  }

  const handleEmailUpdate = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    updateTeamMember.mutate(
      {
        id: teamMember.id,
        teamMember: { ...teamMember, email: newValue }
      }
    )
  }

  const handleTeamMemberDelete = () => {
    deleteTeamMember.mutate(teamMember.id)
    navigate('/team')
  }

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Stack direction='row' marginBottom={2}>
          <StringAvatar
            input={`${teamMember.firstName} ${teamMember.lastName}`}
            sx={{
              width: '5rem',
              height: '5rem',
              marginRight: '1rem',
            }}
          />
          <CloseIcon
            onClick={() => navigate('/team')}
            sx={{ marginLeft: 'auto', color: 'rgba(0, 0, 0, 0.7)' }}
          />
        </Stack>
        <Stack direction='row'>
          <EditableTypography
            variant='h4'
            component='h1'
            gutterBottom
            onBlur={handleFirstNameUpdate}
            color='primary'
            value={teamMember.firstName}
            TextFieldProps={{
              label: 'First name',
              margin: 'normal',
            }}
            readonly={!isEditing}
          />
          <EditableTypography
            marginLeft='0.25lh'
            variant='h4'
            component='h1'
            gutterBottom
            onBlur={handleLastNameUpdate}
            color='primary'
            value={teamMember.lastName}
            TextFieldProps={{
              label: 'Last name',
              margin: 'normal',
            }}
            readonly={!isEditing}
          />
        </Stack>
        <EditableTypography
          variant='body1'
          component='p'
          paragraph
          onBlur={handleEmailUpdate}
          value={teamMember.email}
          TextFieldProps={{
            label: 'Email',
            margin: 'normal',
          }}
          readonly={!isEditing}
        />
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          {isEditing &&
          <Button
            variant='text'
            color='error'
            onClick={handleTeamMemberDelete}
            startIcon={<DeleteIcon />}
          >
            Remove
          </Button>
          }
          {!isEditing &&
          <Button
            variant='text'
            color='primary'
            onClick={() => setIsEditing(true)}
            startIcon={<EditIcon />}
            sx={{
              marginLeft: 'auto',
            }}
          >
            Edit
          </Button>
          }
          {isEditing &&
          <Button
            variant='text'
            color='primary'
            onClick={() => setIsEditing(false)}
            startIcon={<StopEditingIcon />}
          >
            Stop editing
          </Button>
          }
        </Stack>
      </Paper>
    </Container>
  )
}