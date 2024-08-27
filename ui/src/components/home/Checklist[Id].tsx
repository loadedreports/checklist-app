import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Lock'
import StopEditingIcon from '@mui/icons-material/LockOpen'
import {
  Accordion,
  AccordionDetails,
  Button,
  CircularProgress,
  Container,
  Paper,
  styled,
  Stack,
  Typography,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import {
  useDeleteChecklist, useDeleteChecklistItem, useGetChecklist, useUpdateChecklist
} from '../../queries/useChecklistQueries'
import { ChecklistResponse } from '../../types/Checklist'
import { formatDate } from '../../utilities/dateFormatter'
import EditableTypography from '../common/EditableTypography'

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

export default function ChecklistPage() {

  const navigate = useNavigate()
  const { id } = useParams()

  const checklistId = parseInt(id || '')

  const {
    data: checklist,
    isLoading,
    error,
  } = useGetChecklist(isNaN(checklistId) ? 0 : checklistId)

  const updateChecklist = useUpdateChecklist()
  const deleteChecklist = useDeleteChecklist()
  const deleteChecklistItem = useDeleteChecklistItem()

  const [isEditing, setIsEditing] = useState(false)

  const [expanded, setExpanded] = useState<number[]>([])

  if (!id || isNaN(checklistId) || !checklist) {
    return <Typography>Checklist not found</Typography>
  }

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return <Typography color='error'>Error: {error.message}</Typography>
  }

  const handleTitleUpdate = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    updateChecklist.mutate(
      {
        id: checklist.id,
        checklist: { ...checklist, name: newValue }
      }
    )
  }

  const handleDescriptionUpdate = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    updateChecklist.mutate(
      {
        id: checklist.id,
        checklist: { ...checklist, description: newValue }
      }
    )
  }

  const handleChecklistDelete = () => {
    deleteChecklist.mutate(checklist.id)
    navigate('/')
  }

  const handleItemTitleUpdate = (itemId: number) => (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    const newItems = checklist.items?.map(item => {
      return item.id == itemId ? { ...item, title: newValue } : item
    })
    updateChecklist.mutate({
      id: checklist.id,
      checklist: { ...checklist, items: newItems }
    })
  }

  const handleItemDescriptionUpdate = (itemId: number) => (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''
    const newItems = checklist.items?.map(item => {
      return item.id == itemId ? { ...item, description: newValue } : item
    })
    updateChecklist.mutate({
      id: checklist.id,
      checklist: { ...checklist, items: newItems }
    })
  }

  const handleItemDelete = (id: number, itemId: number) => (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation()
    deleteChecklistItem.mutate({ id, itemId })
  }

  const handleExpand = (itemId: number) => (_: React.ChangeEvent<unknown>, toggle: boolean) => {
    setExpanded(toggle ?  [...expanded, itemId] : expanded.filter(id => id !== itemId))
  }

  return (
    <Container maxWidth='md'>
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Stack direction='row'>
          <EditableTypography
            variant='h4'
            component='h1'
            gutterBottom
            color='primary'
            value={checklist.name}
            onBlur={handleTitleUpdate}
            readonly={!isEditing}
            TextFieldProps={{
              label: 'Name',
              margin: 'normal',
            }}
          />
          {!isEditing &&
          <CloseIcon
            onClick={() => navigate('/')}
            sx={{ marginLeft: 'auto', color: 'rgba(0, 0, 0, 0.7)' }}
          />
          }
        </Stack>
        <EditableTypography
          variant='body1'
          component='p'
          paragraph
          value={checklist.description}
          onBlur={handleDescriptionUpdate}
          readonly={!isEditing}
          TextFieldProps={{
            label: 'Description',
            margin: 'normal',
          }}
        />
        <Typography variant='h6' gutterBottom color='text.primary'>
          Tasks
        </Typography>
        <div>
          {checklist.items?.map((item) => (
            <Accordion
              key={item.id || crypto.randomUUID()}
              expanded={isEditing || expanded.includes(item.id)}
              onChange={handleExpand(item.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  display: 'flex'
                }}
              >
                <EditableTypography
                  onBlur={handleItemTitleUpdate(item.id)}
                  value={item.title}
                  readonly={!isEditing}
                  TextFieldProps={{
                    InputProps: {
                      endAdornment: <InputAdornment position="end">
                        <DeleteIcon
                          sx={{ marginLeft: 'auto', color: 'rgba(0, 0, 0, 0.1)' }}
                          onClick={handleItemDelete(checklist.id, item.id)}
                        />
                      </InputAdornment>
                    },
                  }}
                />
              </AccordionSummary>
              <AccordionDetails>
                <EditableTypography
                  onBlur={handleItemDescriptionUpdate(item.id)}
                  value={item.description || 'Add instructions'}
                  readonly={!isEditing}
                />
              </AccordionDetails>
            </Accordion>
          ))}
          {isEditing &&
          <AddItem checklist={checklist} />
          }
        </div>
        <Stack direction='row' justifyContent='space-between'  sx={{ marginTop: 4 }}>
          {!isEditing &&
          <Chip
            label={`Created on ${formatDate(checklist.createdAt)}`}
            variant='outlined'
          />
          }
          {isEditing &&
          <Button
            variant='text'
            color='error'
            onClick={handleChecklistDelete}
            startIcon={<DeleteIcon />}
          >
            Remove
          </Button>
          }
          {!isEditing &&
          <Button
            variant='text'
            color='primary'
            onClick={() => setIsEditing(!isEditing)}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          }
          {isEditing &&
          <Button
            variant='text'
            color='primary'
            onClick={() => setIsEditing(!isEditing)}
            startIcon={<StopEditingIcon />}
          >
            Stop Editing
          </Button>
          }
        </Stack>
      </Paper>
    </Container>
  )
}

const AddItem = ({ checklist }: { checklist: ChecklistResponse }) => {

  const updateChecklist = useUpdateChecklist()

  const handleAddItemInputComplete = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValue = event.target.value ?? ''

    if (newValue.length > 0) {
      updateChecklist.mutate(
        {
          id: checklist.id,
          checklist: {
            ...checklist,
            items: [
              ...(checklist.items ?? []),
              {
                title: newValue,
                description: ''
              }
            ]
          }
        },
        {
            onSuccess: () => {
                event.target.value = ''
            }
        }
      )
    }
  }
  return (
    <Accordion expanded={false}>
      <MuiAccordionSummary
        sx={{
          '&.MuiAccordionSummary-root.Mui-focusVisible': {
            backgroundColor: 'transparent',
          }
        }}
      >
        <TextField
          variant='outlined'
          placeholder='Add task'
          fullWidth
          onBlur={handleAddItemInputComplete}
        />
      </MuiAccordionSummary>
    </Accordion>
  )
}