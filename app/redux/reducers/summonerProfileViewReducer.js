import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  summonerData: {
    isFetching: true
  }
})

function searchView (state = initialState, action) {
  let newState = state

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA_PENDING') {
    newState = newState.mergeIn(['summonerData'], {
      isFetching: true
    })
  }

  if (action.type === 'SUMMONER_PROFILE_VIEW/FETCH_SUMMONER_DATA_FULFILLED') {
    newState = newState.mergeIn(['summonerData'], {
      ...action.payload,
      isFetching: false
    })
  }

  return newState
}

export default searchView
