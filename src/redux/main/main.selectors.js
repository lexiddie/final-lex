import { createSelector } from 'reselect';

const selectMain = (state) => state.main;

export const selectRequests = createSelector([selectMain], (main) => (main.requests ? main.requests.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) : []));
