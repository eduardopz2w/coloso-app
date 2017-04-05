import { createAction } from 'redux-actions';
import I18n from 'i18n-js';
import _ from 'lodash';

import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../redux/middlewares/ColosoApiMiddleware';
import Storage from '../utils/Storage';

const STORAGE_KEY = 'favoriteBuildsIds';

const saveIdsToStorage = ids => Storage.save({ key: STORAGE_KEY, rawData: ids });
const loadIdsFromStorage = () => Storage.load({ key: STORAGE_KEY });

export const fetchFavoriteBuilds = () => (dispatch) => {
  const actionType = 'FAVORITE_BUILDS/FETCH_BUILDS';

  loadIdsFromStorage()
    .then((ids) => {
      dispatch({
        type: actionType,
        payload: {
          queryParams: {
            ids,
          },
          pageParams: {
            number: 1,
            size: 50,
          },
          [COLOSO_CALL]: {
            type: COLOSO_CALL_TYPES.PRO_BUILDS,
          },
        },
      });
    })
    .catch((e) => {
      if (e.name === 'NotFoundError') {
        dispatch({
          type: `${actionType}_FULFILLED`,
          payload: {
            ids: [],
          },
        });
      } else {
        dispatch({
          type: `${actionType}_REJECTED`,
          payload: {
            errorMessage: I18n.t('errors.something_wrong'),
          },
        });
      }
    });
};


/**
  *  Al momento de guardar se retorna la lista completa de ids, esto con la finalidad de que si el
  *  usuario no ha realizado el fetch de los ids ya existentes aprovechar esta funcion para ello
  *  y asi tener ya todos los ids en el reducer
  */
export const addFavoriteBuild = createAction('FAVORITE_BUILDS/ADD_BUILD', id => new Promise((resolve, reject) => {
  loadIdsFromStorage()
    .then((ids) => {
      const newIds = ids.concat(id);

      saveIdsToStorage(newIds)
        .then(() => resolve({ ids: newIds }))
        .catch(() => reject({ errorMessage: I18n.t('errors.something_wrong') }));
    })
    .catch((e) => {
      if (e.name === 'NotFoundError') {
        saveIdsToStorage([id])
          .then(() => resolve({ ids: [id] }))
          .catch(() => reject({ errorMessage: I18n.t('errors.something_wrong') }));
      } else {
        reject({ errorMessage: I18n.t('errors.something_wrong') });
      }
    });
}));

export const removeFavoriteBuild = createAction('FAVORITE_BUILDS/REMOVE_BUILD', id => new Promise((resolve, reject) => {
  loadIdsFromStorage()
    .then((ids) => {
      const newIds = ids;

      _.remove(newIds, sId => sId === id);

      saveIdsToStorage(newIds)
        .then(() => resolve({ ids: newIds }))
        .catch(() => reject({ errorMessage: I18n.t('errors.something_wrong') }));
    })
    .catch((e) => {
      if (e.name === 'NotFoundError') {
        saveIdsToStorage([])
          .then(() => resolve({ ids: [id] }))
          .catch(() => reject({ errorMessage: I18n.t('errors.something_wrong') }));
      } else {
        reject({ errorMessage: I18n.t('errors.something_wrong') });
      }
    });
}));

export const setFavoriteBuildsFilters = createAction('FAVORITE_BUILDS/SET_FILTERS', filters => filters);
