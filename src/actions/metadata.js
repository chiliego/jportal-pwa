import {xml2JSON} from "./metadataJSON";

export const REQUEST_METADATA = 'REQUEST_METADATA';
export const RECEIVE_METADATA = 'RECEIVE_METADATA';
export const FAIL_METADATA = 'FAIL_METADATA';
export const EDIT_METADATA = 'EDIT_METADATA';
export const SAVE_METADATA = 'SAVE_METADATA';

export const fetchMetadata = (id) => (dispatch, getState) => {
  dispatch(requestList(id));
  fetch(`http://localhost:8291/jportal/api/v2/objects/${id}`)
    .then(res => res.text())
    // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(parseXML)
    .then(xml => dispatch(receiveList(id, xml)))
    .catch((err) => dispatch(failList(id,err)));
}

const requestList = (id) => {
  return {
    type: REQUEST_METADATA,
    id
  };
};

const receiveList = (id, xml) => {
  const json = xml2JSON(xml);
  return {
    type: RECEIVE_METADATA,
    id,
    xml,
    json
  };
};

const failList = (id, err) => {
  console.log(err);
  return {
    type: FAIL_METADATA,
    id
  };
};

const parseXML = (xmlStr) => {
  const parser = new DOMParser();
  return parser.parseFromString(xmlStr, "text/xml");
}

export const editData = () => {
  return {type: EDIT_METADATA};
}

export const saveData = (name, editedData) => {
  return {
    type: SAVE_METADATA,
    name,
    editedData
  };
}