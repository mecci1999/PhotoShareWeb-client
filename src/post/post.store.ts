import { Module } from 'vuex';
import { RootState } from '../app/app.store';
import {
  postIndexStoreModule,
  PostIndexStoreState,
} from './index/post-index.store';

import {
  postShowStoreModule,
  PostShowStoreState,
} from './show/post-show.store';

import { PostCreateStoreState, postCreateStoreModule } from '@/post/create/post-create.store';

export interface PostItem {
  id: number;
  title: string;
  content: string;
}

export interface PostStoreState {
  create: PostCreateStoreState;
  index: PostIndexStoreState;
  show: PostShowStoreState;
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  namespaced: true,

  modules: {
    create: postCreateStoreModule,
    index: postIndexStoreModule,
    show: postShowStoreModule,
  },
};
