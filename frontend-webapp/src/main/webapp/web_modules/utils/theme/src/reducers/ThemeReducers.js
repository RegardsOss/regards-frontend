export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_THEME' :
      return action.theme
    default :
      return state
  }
}
