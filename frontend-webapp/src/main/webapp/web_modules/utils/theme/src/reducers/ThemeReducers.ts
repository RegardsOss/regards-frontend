export default (state: any = {}, action: any) => {
  switch (action.type) {
    case "SET_THEME" :
      return action.theme
    default :
      return state
  }
}
