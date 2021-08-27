import { Plugin } from 'vuex';
import { setStroage } from './app.service';
import { RootState } from './app.store';

export const LocalStorageStroePlugin: Plugin<RootState> = store => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case 'layout/setTheme':
        setStroage('theme', mutation.payload);
        break;
    }
  });
};
