export type Action = {
  label: string
  details: string
}

export type Goal = {
  label: string
  actions: Action[]
}
