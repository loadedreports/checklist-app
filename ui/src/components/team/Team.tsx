import AddIcon from '@mui/icons-material/Add'
import {
  Button, Card, CardActions, CardContent, CircularProgress, Fab, Typography
} from '@mui/material'

import CardGrid from '../common/CardGrid'
import { Link } from 'react-router-dom'
import { useCreateTeamMember, useGetTeamMembers } from '../../queries/useTeamQueries'
import { TeamMember, TeamMemberResponse } from '../../types/TeamMember'

export default function Team() {
  const { data: teamMembers, isLoading, error } = useGetTeamMembers()
  const createTeamMember = useCreateTeamMember()

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color='error'>Error: {error.message}</Typography>

  const handleCreateTeamMember = () => {
    const newTeamMember: TeamMember = {
      firstName: 'Team',
      lastName: 'Member',
      email: 'new@example.com',
    }
    createTeamMember.mutate(newTeamMember)
  }

  return (
    <>
      <CardGrid
        cardData={teamMembers || []}
        CardComponent={TeamMemberCard}
      />
      <Fab
        variant='extended'
        color='primary'
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={handleCreateTeamMember}
      >
        <AddIcon sx={{ mr: 1 }} />
        New team member
      </Fab>
    </>
  )
}

function TeamMemberCard({ data }: { data: TeamMemberResponse }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {data.email}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size='small' color='primary' component={Link} to={`/team/${data.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  )
}