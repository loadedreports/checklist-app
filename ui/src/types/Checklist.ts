export interface ChecklistItem {
  title: string
  description: string
}

export interface ChecklistItemResponse extends ChecklistItem {
  id: number
}

export interface Checklist {
  name: string
  description: string
  items?: ChecklistItem[]
}

export interface ChecklistResponse extends Checklist {
  id: number
  createdAt: string
  items?: ChecklistItemResponse[]
}