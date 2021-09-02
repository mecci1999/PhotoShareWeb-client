import { Plugin } from 'vuex';
import { setStroage } from './app.service';
import { RootState } from './app.store';

export const LocalStorageStroePlugin: Plugin<RootState> = store => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case 'layout/setTheme':
        setStroage('theme', mutation.payload);
        break;
      case 'auth/login/setLoginResponseData':
        if (!mutation.payload) {
          setStroage('nid', '');
          setStroage('uid', '');
        } else {
          setStroage('nid', mutation.payload.token);
          setStroage('uid', mutation.payload.id);
        }
        break;
      case 'post/index/setLayout':
        setStroage('post-list-layout', mutation.payload);
        break;
    }
  });
};
