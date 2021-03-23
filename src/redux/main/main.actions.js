import { MainActionTypes } from './main.types';

export const setJournals = (data) => ({
  type: MainActionTypes.SET_JOURNALS,
  payload: data
});

export const setCategories = (data) => ({
  type: MainActionTypes.SET_CATEGORIES,
  payload: data
});

export const setCategory = (data) => ({
  type: MainActionTypes.SET_CATEGORY,
  payload: data
});

export const cleanData = () => ({
  type: MainActionTypes.CLEAN_DATA
});
