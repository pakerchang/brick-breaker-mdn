## Event Control

```
// src/event
  actions    // for keyboard event
  collide    // detection ball collide actions
  draws      // generate and update web canvas
  killBricks // eliminate canvas bricks
```

## BricksBreaker.vue

```js
  // declare a canvas tag, and set id for 'myCanvas', height, width.
  // import event modules { initGame }
  <canvas id="myCanvas" width="480" height="320">
```

## Dev

```zsh
  yarn install
  yarn dev
```
