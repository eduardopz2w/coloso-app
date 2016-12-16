import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  isSearching: false,
  searchError: false,
  errorMessage: null
})

function searchView (state = initialState, action) {
  let newState = state

  if (action.type === 'SEARCH_VIEW/SEARCH_SUMMONER_PROFILE_PENDING') {
    newState = newState.set('isSearching', true)
  }

  if (action.type === 'SEARCH_VIEW/SEARCH_SUMMONER_PROFILE_REJECTED') {
    newState = newState.merge({
      isSearching: false,
      searchError: true,
      errorMessage: action.payload.errorMessage
    })
  }

  if (action.type === 'SEARCH_VIEW/CLEAR_SEARCH_ERROR') {
    newState = newState.merge({
      isSearching: false,
      searchError: false,
      errorMessage: null
    })
  }

  return newState
}

export default searchView
