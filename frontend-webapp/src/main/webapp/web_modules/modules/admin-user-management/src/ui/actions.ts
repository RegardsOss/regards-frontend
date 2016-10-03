export const SELECT_PROJECT_USER = 'SELECT_PROJECT_USER'
export const UIActions = {
  selectProjectUser(id: string): any {
    return {
      type: SELECT_PROJECT_USER,
      id
    }
  }
}
