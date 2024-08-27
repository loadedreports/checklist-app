import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import {
  Button, Card, CardActions, CardContent, CircularProgress, Fab, Typography
} from '@mui/material'

import CardGrid from '../common/CardGrid'
import { useCreateChecklist, useGetChecklists } from '../../queries/useChecklistQueries'
import { Checklist, ChecklistResponse } from '../../types/Checklist'
import AssignChecklistDialog from './AssignChecklistDialog'
import { useState } from 'react'
import { TeamMemberResponse } from '../../types/TeamMember'
import { Dayjs } from 'dayjs'

export default function ChecklistList() {
  const { data: checklists, isLoading, error } = useGetChecklists()
  const createChecklist = useCreateChecklist()

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color='error'>Error: {error.message}</Typography>
  
  const handleCreateChecklist = () => {
    const newChecklist: Checklist = {
      name: 'New Checklist',
      description: 'a description',
      items: []
    }
    createChecklist.mutate(newChecklist)
  }

  return (
    <>
      <CardGrid
        variant='masonry'
        cardData={checklists}
        CardComponent={ChecklistCard}
      />
      <Fab
        variant='extended'
        color='primary'
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
        onClick={handleCreateChecklist}
      >
        <AddIcon sx={{ mr: 1 }} />
        New checklist
      </Fab>
    </>
  )
}

function ChecklistCard({ data }: { data: ChecklistResponse }) {
  const [open, setOpen] = useState(false)

  const handleAssign = () => {
    setOpen(true)
  }

  const handleClose = (teamMember: TeamMemberResponse | null, date: Dayjs | null) => {
    setOpen(false)
    if (teamMember && date) {
      console.log(
        'Team member %s assigned to checklist %s to be run at %s',
        teamMember?.firstName, data.name, date
      )
      // TODO - send API call to assign the checklist run
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {data.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {data.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button size='small' color='primary' component={Link} to={`/checklist/${data.id}`}>
            View
          </Button>
          <Button size='small' color='primary' onClick={handleAssign}>
            Assign
          </Button>
        </CardActions>
      </Card>
      <AssignChecklistDialog
        open={open}
        onClose={handleClose}
      />
    </>
  )
}