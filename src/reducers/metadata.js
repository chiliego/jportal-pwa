import {
  REQUEST_METADATA,
  RECEIVE_METADATA,
  FAIL_METADATA,
  EDIT_METADATA,
  SAVE_METADATA
} from '../actions/metadata'

import { createSelector } from 'reselect';

const INITIAL_XML_STATE = {
  isEditing: false,
  failure: true,
  isFetching: true,
  xml: "",
  json: {}
}

const INITIAL_STATE = {
  id: "",
  xmlState: {}
}

const metadata = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_METADATA:
    case RECEIVE_METADATA:
    case FAIL_METADATA:
    case EDIT_METADATA:
    case SAVE_METADATA:
      return {
        ...state,
        id: action.id,
        xmlState: xml(state.xmlState, action)
      };
    default:
      return state;
  }
};

const xml = (state = INITIAL_XML_STATE, action) => {
  switch (action.type) {
    case REQUEST_METADATA:
      return {
        ...state,
        failure: false,
        isFetching: true
      };
    case RECEIVE_METADATA:
      return {
        ...state,
        failure: false,
        isFetching: false,
        xml: action.xml,
        json: action.json
      };
    case FAIL_METADATA:
      return {
        ...state,
        failure: true,
        isFetching: false
      };
    case EDIT_METADATA:
      return {
        ...state,
        isEditing: true
      }
    case SAVE_METADATA:
      return {
        ...state,
        isEditing: false,
        json: saveJson(state.json, action)
      }
    default:
      return state;
  }
}

const saveJson = (state, action) => {
  return {
    ...state,
    metadata: saveMetadat(state, action)
  }
}

const saveMetadat = (state, action) => {
  return {
    ...state,
    [action.name]: action.editedData
}
}

export default metadata;

const xmlSelector = state => state.metadata.xmlState;
const jsonSelector = state => xmlSelector(state).json;

export const metadataSelector = createSelector(
  jsonSelector,
  (json) => (name) => {
    if(json){
     return json.mycoreobject.metadata[name];
    }
  }
);

export const isEditingSelector = createSelector(
  xmlSelector,
  (xml) =>  {
      return xml.isEditing;
  }
);