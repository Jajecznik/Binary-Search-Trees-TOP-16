# Binary-Search-Trees-TOP-16

Implementation of a Binary Search Tree. The tree's methods allow users to add or delete nodes, traverse the tree in a specific order, and rebalance the tree if it becomes unbalanced.

## Assignment

1. Build a `Node` class/factory. It should have an attribute for the data it stores as well as its left and right children.
2. Build a `Tree` class/factory which accepts an array when initialized. The `Tree` class should have a `root` attribute, which uses the return value of `buildTree` which you’ll write next.
3. Write a `buildTree(array)` function that takes an array of data (e.g., `[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]`) and turns it into a balanced binary tree full of `Node` objects appropriately placed (don’t forget to sort and remove duplicates!). The `buildTree` function should return the level-0 root node.

**Tip:** If you would like to visualize your binary search tree, here is a `prettyPrint()` function that will `console.log` your tree in a structured format. This function will expect to receive the root of your tree as the value for the `node` parameter.

```
const prettyPrint = (node, prefix = "", isLeft = true) => {
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
};
```

4. Write `insert(value)` and `deleteItem(value)` functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on [inserting](https://www.geeksforgeeks.org/insertion-in-binary-search-tree/?ref=lbp) and [deleting](https://www.geeksforgeeks.org/deletion-in-binary-search-tree/), or this [video on BST inserting/removing](https://www.youtube.com/watch?v=wcIRPqTR3Kc&ab_channel=colleenlewis) with several visual examples.

> [!NOTE]
> You may be tempted to implement these methods using the original input array used to build the tree, but it’s important for the efficiency of these operations that you don’t do this. If we refer back to the [Big O Cheatsheet](https://www.bigocheatsheet.com/), we’ll see that binary search trees can insert/delete in `O(log n)` time, which is a significant performance boost over arrays for the same operations. To get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

5. Write a `find(value)` function that returns the node with the given value.
6. Write a `levelOrder(callback)` function that accepts an optional callback function as its parameter. `levelOrder` should traverse the tree in breadth-first level order and provide each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. `levelOrder` may be implemented using either iteration or recursion (try implementing both!). The method should return an array of values if no callback is given as an argument. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list ([video on level order traversal](https://www.youtube.com/watch?v=86g8jAQug04&ab_channel=mycodeschool)).
7. Write `inOrder(callback)`, `preOrder(callback)`, and `postOrder(callback)` functions that also accept an optional callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided callback. The functions should return an array of values if no callback is given as an argument.
8. Write a `height(node)` function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
9. Write a `depth(node)` function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
10. Write an `isBalanced` function that checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
11. Write a `rebalance` function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the `buildTree` function.

### Tie it all together

Write a driver script that does the following:

1. Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
2. Confirm that the tree is balanced by calling `isBalanced`.
3. Print out all elements in level, pre, post, and in order.
4. Unbalance the tree by adding several numbers > 100.
5. Confirm that the tree is unbalanced by calling `isBalanced`.
6. Balance the tree by calling `rebalance`.
7. Confirm that the tree is balanced by calling `isBalanced`.
8. Print out all elements in level, pre, post, and in order.