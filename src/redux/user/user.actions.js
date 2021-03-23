import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user
});

export const signOut = () => ({
	type: UserActionTypes.SIGN_IN_OUT
});
