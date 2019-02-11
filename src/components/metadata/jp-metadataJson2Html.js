import {stream} from "../../helperTools";

export const MCRMetaLangText = "MCRMetaLangText";

export const transformMetadata = (metadata) => {
  const className = metadata.attr.class;
  if(metadataHandler[className]){
    return metadataHandler[className](metadata);
  } else {
    console.log("Not supported class " + className);
  }

  return [];
}

const mcrMetaLangTextHandler = (metaLangTextObj) => {
  let result = [];
  Object.keys(metaLangTextObj)
    .filter(key => key !== 'attr')
    .map(key => metaLangTextObj[key])
    .forEach(val => stream(val)
        .filter(e => e.attr.inherited === '0')
        .map(e => e.textContent)
        .reduce((txt, arr) => arr.push(txt), result)
    );

  return result;
}

const metadataHandler = {
  [MCRMetaLangText]: mcrMetaLangTextHandler
}