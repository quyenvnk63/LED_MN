import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';
import { RootState } from '../../types/RootState';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state?.KidsPreSchool || initialState;

export const selectIdHome = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.idHome,
);

export const selectIdMenu = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.idMenu,
);

export const selectImageDetail = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.imageDetail,
);

export const selectRandomQuestion = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.itemsQuestion,
);

export const selectRandomAnswer = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.itemAnswer,
);

export const selectLoading = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.loading,
);

export const selectError = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.error,
);

export const selectRepos = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.repositories,
);

export const selectUser = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.dataUser,
);

export const selectIsUser = createSelector(
  [selectDomain],
  (KidsPreSchoolState) => KidsPreSchoolState.isUser,
);

