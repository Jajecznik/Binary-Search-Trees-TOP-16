class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.#buildTree(array);
    }

    // take an array and turn it into balanced BST
    #buildTree(array) {
        if (array.length === 0) return null;

        let middleIndex = Math.floor(array.length / 2);
        let leftArray = array.slice(0, middleIndex);
        let rightArray = array.slice(middleIndex + 1);

        let root = new Node(array[middleIndex]);
        root.left = this.#buildTree(leftArray);
        root.right = this.#buildTree(rightArray);

        return root;
    }

    // insert new node to tree
    insert(value) {
        this.root = this.#insertNodeAtTheEnd(value, this.root);
    }

    // insert new node at the end of the tree
    #insertNodeAtTheEnd(value, node) {
        if (node === null) {
            let newNode = new Node(value);
            return newNode;
        }
        if (value < node.data) {
            node.left = this.#insertNodeAtTheEnd(value, node.left);
        } else if (value > node.data) {
            node.right = this.#insertNodeAtTheEnd(value, node.right);
        }

        return node;
    }

    // delete node with given value
    deleteItem(value) {
        this.root = this.#deleteNode(value, this.root);
    }

    // delete node from tree
    #deleteNode(value, node) {
        if (node === null) return null;
        if (value < node.data) {
            node.left = this.#deleteNode(value, node.left);
        } else if (value > node.data) {
            node.right = this.#deleteNode(value, node.right);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;
            if (node.left !== null && node.right !== null) {
                node.data = this.#minValue(node.right);
                node.right = this.#deleteNode(node.data, node.right);
            }
        }
        return node;
    }

    // return smallest node in the tree
    #minValue(node) {
        let minV = node.data;
        while (node.left !== null) {
            minV = node.left.data;
            node = node.left;
        }
        return minV;
    }

    // find node with the given value
    find(value) {
        return this.#treeTraverse(value, this.root);
    }

    // traverse the binary search tree
    #treeTraverse(value, node) {
        if (node === null) return null;
        if (value === node.data) return node;
        if (value < node.data) return this.#treeTraverse(value, node.left);
        if (value > node.data) return this.#treeTraverse(value, node.right);
    }

    // visit nodes level by level
    levelOrder(callback) {
        if (this.root === null) return [];

        let result = [];
        let queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (callback) {
                callback(node);
            } else {
                result.push(node.data);
            }

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        return callback ? null : result;
    }

    // visit left subtree -> root -> right subtree
    inOrder(callback) {
        let result = [];

        if (callback) {
            this.#inOrderRec(this.root, null, callback);
        } else {
            this.#inOrderRec(this.root, result, null);
            return result;
        }
    }

    // recursive inorder algorithm
    #inOrderRec(node, result, callback) {
        if (node === null) return;

        this.#inOrderRec(node.left, result, callback);

        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        this.#inOrderRec(node.right, result, callback);
    }

    // visit root -> left subtree -> right subtree
    preOrder(callback) {
        let result = [];

        if (callback) {
            this.#preOrderRec(this.root, null, callback);
        } else {
            this.#preOrderRec(this.root, result, null);
            return result;
        }
    }

    // recursive preorder algorithm
    #preOrderRec(node, result, callback) {
        if (node === null) return;
        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }

        this.#preOrderRec(node.left, result, callback);
        this.#preOrderRec(node.right, result, callback);
    }

    // visit left subtree -> right subtree -> root
    postOrder(callback) {
        let result = [];

        if (callback) {
            this.#postOrderRec(this.root, null, callback);
        } else {
            this.#postOrderRec(this.root, result, null);
            return result;
        }
    }

    // recursive postorder algorithm
    #postOrderRec(node, result, callback) {
        if (node === null) return;

        this.#postOrderRec(node.left, result, callback);
        this.#postOrderRec(node.right, result, callback);

        if (callback) {
            callback(node);
        } else {
            result.push(node.data);
        }
    }

    // return given node's height 
    height(node) {
        if (node === null) return -1;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // return given node's depth
    depth(node) {
        return this.#depthRec(node, this.root, 0);
    }

    // finding node depth recursively 
    #depthRec(node, root, depth) {
        if (root === null) return -1;
        if (node === root.data) return depth;

        let leftDepth = this.#depthRec(node, root.left, depth + 1);
        if (leftDepth >= 0) return leftDepth;

        let rightDepth = this.#depthRec(node, root.right, depth + 1);
        return rightDepth;
    }

    // check if a subtree is balanced
    #isBalancedRec(node) {
        if (node === null) return true;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.#isBalancedRec(node.left) && this.#isBalancedRec(node.right);
    }

    // return true if the tree is balanced, ohterwise return false
    isBalanced() {
        return this.#isBalancedRec(this.root);
    }

    // rebalance unbalanced tree
    rebalance() {
        if (!this.isBalanced()) {
            let nodes = this.inOrder();
            this.root = this.#buildTree(nodes);
        }
    }
}

// print tree
function prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}

// create sorted array of random numbers
function createRandomArray(arrayLength) {
    let array = [];
    while (array.length < arrayLength) {
        const value = Math.floor(Math.random() * 91) + 10;
        array.push(value);
    }

    let uniqueArray = [...new Set(array)].sort((a, b) => a - b);
    return uniqueArray;
}

const arrayLength = 25;
const array = createRandomArray(arrayLength);

let tree = new Tree(array);
prettyPrint(tree.root);
console.log("Is tree balanced:", tree.isBalanced());

console.log("Level order:", tree.levelOrder());
console.log("Preorder:", tree.preOrder());
console.log("Inorder", tree.inOrder());
console.log("Postorder", tree.postOrder());

tree.insert(101);
tree.insert(202);
tree.insert(150);

console.log("Is tree balanced:", tree.isBalanced());
tree.rebalance();
console.log("Is tree balanced:", tree.isBalanced());

console.log("Level order:", tree.levelOrder());
console.log("Preorder:", tree.preOrder());
console.log("Inorder", tree.inOrder());
console.log("Postorder", tree.postOrder());

/*
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let uniqueArray = [...new Set(array)].sort((a, b) => a - b);

let tree = new Tree(uniqueArray);
tree.insert(10);
tree.deleteItem(324);
prettyPrint(tree.root);
console.log(tree.find(67));
console.log(tree.levelOrder());
tree.levelOrder(node => console.log("Node.data: ", node.data));
console.log(tree.inOrder());
tree.inOrder(node => console.log("Node.data: ", node.data));
console.log(tree.preOrder());
tree.preOrder(node => console.log("Node.data: ", node.data));
console.log(tree.postOrder());
tree.postOrder(node => console.log("Node.data: ", node.data));
console.log("Height:", tree.height(tree.root));
console.log("Depth:", tree.depth(tree.root));
prettyPrint(tree.root);
tree.rebalance();
prettyPrint(tree.root);
*/
