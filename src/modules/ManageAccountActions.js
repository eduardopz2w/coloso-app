import {
  logger,
  Storage,
  ColosoApi,
  tracker,
  createThunkAction,
} from 'utils';

const STORAGE_KEY = 'riotAccount';

function saveAccountToStorage(account, trackEvent = true) {
  logger.debug('Saving account to storage', account);

  Storage.save({ key: STORAGE_KEY, rawData: account });

  if (trackEvent) {
    tracker.trackEvent('ManageAccounts', 'ADD_ACCOUNT', { label: `summonerId: ${account.id}` });
  }
}

export const fetchAccount = createThunkAction('MANAGE_ACCOUNT/FETCH_ACCOUNT', params => (dispatch) => {
  dispatch({
    type: 'MANAGE_ACCOUNT/FETCH_ACCOUNT',
    payload: ColosoApi.summoner.byName(params),
  })
    .then(({ value: response }) => ({
      id: response.data.id,
      ...response.data.attributes,
    }))
    .then(account => saveAccountToStorage(account, params.trackEvent))
    .catch(logger.debug);
});

export const loadAccount = createThunkAction('MANAGE_ACCOUNT/LOAD_ACCOUNT', () => (dispatch) => {
  dispatch({
    type: 'MANAGE_ACCOUNT/LOAD_ACCOUNT',
    payload: Storage.load({ key: STORAGE_KEY }),
  })
    .then(({ value: riotAccount }) => dispatch(fetchAccount({
      summonerName: riotAccount.name,
      region: riotAccount.region,
      trackEvent: false,
    })))
    .catch(logger.debug);
});
