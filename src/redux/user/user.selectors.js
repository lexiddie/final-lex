import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (user) => (user.currentUser ? user.currentUser : null));

export const selectIsSignIn = createSelector([selectUser], (user) => user.isSignIn);
