import {treeWalk, iterator} from '../helperTools.js'

export const xml2JSON = (xml) => {
  return treeWalk(xml, (node, children) => {
    let nodeJson = {};

    if (node.attributes && node.attributes.length > 0) {
      nodeJson["attr"] = {};

      iterator(node.attributes, (attr) => {
        if (!attr.name.startsWith("xmlns:") && !attr.name.startsWith("xsi:")) {
          nodeJson.attr[attr.name] = attr.value;
        }
      })
    }

    if (node.firstChild && node.firstChild.nodeType === node.TEXT_NODE) {
      let textContent = node.firstChild.textContent;
      if (textContent.trim() !== '') {
        nodeJson["textContent"] = node.textContent;
      }
    }

    iterator(children, (child) => {
      if (nodeJson[child.tagName] === undefined) {
        nodeJson[child.tagName] = child.json;
      } else if (nodeJson[child.tagName] instanceof Array) {
        nodeJson[child.tagName].push(child.json);
      } else {
        nodeJson[child.tagName] = [nodeJson[child.tagName], child.json];
      }
    })


    return {
      tagName: node.tagName,
      json: nodeJson
    }
  }).json;
}

