const routePrefix = window.APP_CONFIG["postRoutePrefix"] || "/article"
export function extractPostKeyFromRoutePath(routePath) {
  let extractKeyReg = new RegExp("^" + routePrefix, "g");
  return routePath.replace(extractKeyReg, "").replace(/(^\/)|(\/$)/g, "");
}

export function searchPost(postTrees, key) {
    function searchTree(treeNode) {
        if (treeNode.key == key) {
            return treeNode;
        }
        if (treeNode.isGroup) {
            for (let child of treeNode.childs) {
                let r = searchTree(child)
                if (r != null)
                    return r
            }
        }
        return null;
    }
    for (let rootNode of postTrees) {
        let r = searchTree(rootNode)
        if (r)
            return r;
    }
}

export function recursivePostTrees(postTrees, callback) {
    function recursiveTree(treeNode) {
        let canStop;
        if (treeNode.isGroup) {
            canStop = callback(treeNode)
            if (canStop) {
                return true;
            }

            for (let child of treeNode.childs) {
                canStop = recursiveTree(child)
                if (canStop)
                    return true;
            }
        } else {
            canStop = callback(treeNode)
            if (canStop)
                return true;
        }
        return false;
    }

    for (let rootNode of postTrees) {
        let r = recursiveTree(rootNode)
        if (r)
            return r;
    }
}
