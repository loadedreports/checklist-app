import { ChecklistResponse } from "./Checklist"
import { TeamMemberResponse } from "./TeamMember"

// Proposed API model for a checklist run
export interface ChecklistRun {
  runAt: string
  completedAt?: string
  checklist?: ChecklistResponse
  teamMember?: TeamMemberResponse
}

export interface ChecklistRunResponse extends ChecklistRun {
  id: number
}
