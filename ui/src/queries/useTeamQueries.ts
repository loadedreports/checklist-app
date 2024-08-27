import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import apiClient from '../api/client'
import { TeamMember, TeamMemberResponse } from '../types/TeamMember'


/*
 * Get all team members
 */
function fetchTeamMembers(): Promise<TeamMemberResponse[]> {
  return apiClient.get('/team-members')
    .then((res) => res.data)
}

export function useGetTeamMembers() {
  return useQuery({
    queryKey: ['team'],
    queryFn: fetchTeamMembers,
  })
}


/*
 * Get a team member by id
 */
function fetchTeamMemberById(id: number): Promise<TeamMemberResponse> {
  return apiClient.get(`/team-members/${id}`)
    .then((res) => res.data)
}

export function useGetTeamMember(id: number) {
  return useQuery({
    queryKey: ['team', id],
    queryFn: () => fetchTeamMemberById(id),
  })
}

/*
 * Add a new team member
 */
function addTeamMember(newTeamMember: TeamMember): Promise<TeamMemberResponse> {
  return apiClient.post('/team-members', newTeamMember)
    .then((res) => res.data)
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addTeamMember,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['team'] })
    },
  })
}

/*
 * Update a team member
 */
type UpdateTeamMemberInput = {
  id: number
  teamMember: TeamMember
}

function updateTeamMember(id: number, updatedTeamMember: TeamMember): Promise<TeamMemberResponse> {
  return apiClient.put(`/team-members/${id}`, updatedTeamMember)
    .then((res) => res.data)
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, teamMember }: UpdateTeamMemberInput) => {
      // Update the individual team member query cache
      queryClient.setQueryData(['team', id], teamMember)
      return updateTeamMember(id, teamMember)
    },
    onSuccess: (updatedTeamMember: TeamMemberResponse) => {
      // Update the individual team member query cache
      queryClient.setQueryData(['team', updatedTeamMember.id], updatedTeamMember)

      // Update the 'team' query cache
      queryClient.setQueryData<TeamMemberResponse[]>(['team'], (old) => {
        return old
          ? old.map(existingTeamMember =>
            existingTeamMember.id === updatedTeamMember.id ? updatedTeamMember : existingTeamMember
          )
          : [updatedTeamMember]
      })
    },
    onError: (error) => {
      console.error('error %o', error)
    }
  })
}

/*
 * Delete a team member
 */
function deleteTeamMember(id: number): Promise<TeamMemberResponse> {
  return apiClient.delete(`/team-members/${id}`)
    .then((res) => res.data)
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTeamMember(id),
    onSuccess: (_, id) => {
      // Update the 'team' query cache
      queryClient.setQueryData<TeamMemberResponse[]>(
        ['team'],
        (old) => {
          return old
            ? old.filter(item => item.id !== id)
            : []
        }
      )

      // And remove the individual team member query cache
      queryClient.removeQueries({ queryKey: ['team', id] })
    },
    onError: (error) => {
      console.error('error %o', error)
    }
  })
}