export type Identity = {
  id: string
  fullName?: string
  userName: string
  email: string
  user_roles: {
    id: string
    role: {
      id: string
      roleName: string
    }
  }[]
  avatarUrl?: string
}
