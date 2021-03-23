import { createSelector } from 'reselect';
import { manipulateAll, manipulateEdition, manipulateJournals, findCategoryIndex } from './main.utils';

const selectMain = (state) => state.main;

export const selectJournals = createSelector([selectMain], (main) => (main.journals ? main.journals.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) : []));

export const selectCategories = createSelector([selectMain], (main) => (main.categories ? main.categories.sort((a, b) => (a.name < b.name ? -1 : 1)) : []));

export const selectManipulateJournals = createSelector([selectMain], (main) => (main.journals && main.categories ? manipulateJournals(main.journals, main.categories, main.categoryId) : []));

export const selectAllCategories = createSelector([selectMain], (main) => (main.categories ? manipulateAll(main.categories) : []));

export const selectEditCategories = createSelector([selectMain], (main) => (main.categories ? manipulateEdition(main.categories) : []));

export const selectIndex = createSelector([selectMain], (main) => (main.categories ? findCategoryIndex(main.categories, main.categoryId) : 0));

export const selectTotal = createSelector([selectManipulateJournals], (journals) => journals.reduce((total, current) => parseFloat(total) + parseFloat(current.amount), 0));
