export const treeWalk = (node, map) => {
  let childArray = [];

  if (node.hasChildNodes()) {
    iterator(node.children, (child) => {
      childArray.push(treeWalk(child, map));
    })
  }

  return map(node, childArray);
}

export const iterator = (iterateable, map) => {
  if(iterateable.length === undefined){
    map(iterateable);
    return;
  }

  for (let i = 0; i < iterateable.length; i++) {
    map(iterateable[i]);
  }
}

const createFunc = (fn, item) => isFunction(item) ? () => fn(item()) : () => fn(item);

const spreadFunc = (input, fn) => {
    let funArr = []
    iterator(input, item => funArr.push(createFunc(fn, item)));
    return funArr;
};

const spreadFilter = (input, pred) => {
  let funArr = []
  iterator(input, item => {
    let result = item;

    if(isFunction(item)){
      result = item();
    }

    if(pred(result)){
      funArr.push(result)
    }
  });
  return funArr;
};

export const stream = (input) => {
  return {
    map: (fn) => stream(spreadFunc(input, fn)),
    filter: (pred) => stream(spreadFilter(input, pred)),
    forEach: (fn) => {
      iterator(input, item => createFunc(fn, item)())
    },
    reduce: (fn, obj) => {
      iterator(input, item => isFunction(item) ? fn(item(), obj) : fn(item, obj))
      return obj;
    }
  }
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}