export interface TeamMember {
  firstName: string
  lastName: string
  email: string
}

export interface TeamMemberResponse extends TeamMember {
  id: number
}