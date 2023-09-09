import { createSlice } from '../../utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from '../../utils/redux-injectors';

import { PayloadAction } from '@reduxjs/toolkit';

import { Repo } from '../../types/Repo';

import { KidsPreSchoolState, RepoErrorType } from './types';

export const initialState: KidsPreSchoolState = {
  idHome: '',
  idMenu: 0,
  imageDetail: 0,
  itemsQuestion: [],
  itemAnswer: {},
  repositories: [],
  loading: false,
  error: null,
  dataUser: [],
  isUser: false,
};

const slice = createSlice({
  name: 'KidsPreSchool',
  initialState,
  reducers: {
    changeIdHome(state, action: PayloadAction<string>) {
      state.idHome = action.payload;
    },
    changeIdMenu(state, action: PayloadAction<number>) {
      state.idMenu = action.payload;
    },
    changeImageDetail(state, action: PayloadAction<number>) {
      // console.log('1', state.imageDetail);
      state.imageDetail = action.payload;
    },
    randomQuestion(state, action: PayloadAction<Array<LearningInFo>>) {
      state.itemsQuestion = action.payload;
    },
    randomAnswer(state, action: PayloadAction<LearningInFo>) {
      state.itemAnswer = action.payload;
    },
    changeDataUser(state, action: PayloadAction<any>) {
      state.dataUser = action.payload;
    },
    setIsUser(state, action: PayloadAction<any>) {
      state.isUser = action.payload;
    },

    loadRepos(state) {
      state.loading = true;
      state.error = null;
      state.repositories = [];
    },
    reposLoaded(state, action: PayloadAction<Repo[]>) {
      const repos = action.payload;
      state.repositories = repos;
      state.loading = false;
    },
    repoError(state, action: PayloadAction<RepoErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: githubRepoFormActions, reducer } = slice;

export const useKidsPreSchoolSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });

  return { actions: slice.actions };
};
