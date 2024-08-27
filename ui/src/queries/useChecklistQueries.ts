import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import apiClient from '../api/client'
import { Checklist, ChecklistResponse } from '../types/Checklist'

/*
 * Get all checklists
 */
function fetchChecklists(): Promise<ChecklistResponse[]> {
  return apiClient.get('/checklists')
    .then((res) => res.data)
}

export function useGetChecklists() {
  return useQuery({
    queryKey: ['checklists'],
    queryFn: fetchChecklists,
  })
}

function fetchChecklistById(id: number): Promise<ChecklistResponse> {
  return apiClient.get(`/checklists/${id}`)
    .then((res) => res.data)
}

/*
 * Get a checklist by id
 */
export function useGetChecklist(id: number) {
  return useQuery({
    queryKey: ['checklists', id],
    queryFn: () => fetchChecklistById(id),
  })
}

function addChecklist(newChecklist: Checklist): Promise<ChecklistResponse> {
  return apiClient.post('/checklists', newChecklist)
    .then((res) => res.data)
}

/*
 *  Add a new checklist
 */
export function useCreateChecklist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addChecklist,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['checklists'] })
    },
  })
}

/*
 * Update a checklist
 */
type UpdateChecklistInput = {
  id: number
  checklist: Checklist
}

function updateChecklist(id: number, updatedChecklist: Checklist): Promise<ChecklistResponse> {
  return apiClient.put(`/checklists/${id}`, updatedChecklist)
    .then((res) => res.data)
}

export function useUpdateChecklist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, checklist: updatedChecklist }: UpdateChecklistInput) => {
      queryClient.setQueryData(['checklists', id], updatedChecklist)
      return updateChecklist(id, updatedChecklist)
    },
    onSuccess: (updatedChecklist: ChecklistResponse) => {
      // Update the individual checklist query cache
      queryClient.setQueryData(['checklists', updatedChecklist.id], updatedChecklist)

      // Update the 'checklists' query cache
      queryClient.setQueryData<ChecklistResponse[]>(['checklists'], (old) => {
        return old
          ? old.map(existingChecklist =>
            existingChecklist.id === updatedChecklist.id ? updatedChecklist : existingChecklist
          )
          : [updatedChecklist]
      })

    },
    onError: (error) => {
      console.error('error %o', error)
    }
  })
}

/**
 * Delete a checklist
 */
function deleteChecklist(id: number): Promise<ChecklistResponse> {
  return apiClient.delete(`/checklists/${id}`)
    .then((res) => res.data)
}

export function useDeleteChecklist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteChecklist(id),
    onSuccess: (_, id) => {
      // Update the 'checklists' query cache
      queryClient.setQueryData<ChecklistResponse[]>(
        ['checklists'],
        (old) => {
          return old
            ? old.filter(item => item.id !== id)
            : []
        }
      )

      // And remove the individual checklist query cache
      queryClient.removeQueries({ queryKey: ['checklists', id] })
    },
    onError: (error) => {
      console.error('error %o', error)
    }
  })
}

/*
 * Delete a checklist item
 */
type DeleteChecklistItemInput = {
  id: number
  itemId: number
}

function deleteChecklistItem(id: number, itemId: number): Promise<ChecklistResponse> {
  return apiClient.delete(`/checklists/${id}/item/${itemId}`)
    .then((res) => res.data)
}

export function useDeleteChecklistItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, itemId }: DeleteChecklistItemInput) => deleteChecklistItem(id, itemId),
    onSuccess: (_, { id, itemId }) => {
      // Update the 'checklists' query cache
      queryClient.setQueryData<ChecklistResponse[]>(
        ['checklists'],
        (old) => {
          const updatedChecklists = old
            ?.map(checklist => checklist.id === id
              ? {
                ...checklist,
                items: checklist.items?.filter(item => item.id != itemId)
              }
              : checklist
            )

          return old ? updatedChecklists : []
        }
      )

      // And remove the individual checklist query cache
      queryClient.removeQueries({ queryKey: ['checklists', id] })
    },
    onError: (error) => {
      console.error('error %o', error)
    }
  })
}