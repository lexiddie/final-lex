import { MainActionTypes } from './main.types';

export const setRequests = (data) => ({
  type: MainActionTypes.SET_REQUESTS,
  payload: data
});
