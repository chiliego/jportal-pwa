/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const navigate = (location) => (dispatch) => {

  // Extract the page name from path.
  // const page = path === '/' ? 'login' : path.slice(1);
  // const page = path === '/' ? 'view1' : path.slice(1);

  // dispatch(loadPageRegex(page));
  // Any other info you might want to extract from the path (like page type),
  // you can do here
  // dispatch(loadPage(page));
  dispatch(loadPage(location));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (location) => (dispatch) => {
  const path = decodeURIComponent(location.pathname);
  const splitPath = (path || '').slice(1).split('/');
  const params = location.search.slice(1).split('&').reduce((acc, item) => {
    const pair = item.split('=');
    acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    return acc;
  }, {});

  let page = path === '/' ? 'login' : splitPath[0];

  switch (page) {
    case 'view1':
      import('../components/my-view1.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'view2':
      import('../components/my-view2.js');
      break;
    case 'view3':
      import('../components/my-view3.js');
      break;
    case 'login':
      import('../components/jp-login.js');
      break;
    case 'metadata':
      if (splitPath[1]) {
        import('../components/jp-metadata.js').then((module) => {
          dispatch(module.fetchMetadata(splitPath[1]));
        });
        break;
      }
    default:
      page = 'view404';
      import('../components/my-view404.js');
  }

  dispatch(updatePage(page));
};

const updatePage = (page) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  window.clearTimeout(snackbarTimer);
  snackbarTimer = window.setTimeout(() =>
    dispatch({type: CLOSE_SNACKBAR}), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar only if offline status changes.
  if (offline !== getState().app.offline) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateDrawerState = (opened) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened
  };
};
