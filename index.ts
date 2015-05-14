/// <reference path="typings/deku/deku.d.ts" />

import Deku = require('deku');
import Counter = require('./components/counter');
var e = Deku.element;

// Initialize tree
var tree = Deku.tree(e(Counter.spec, {}));

window.onload = (ev) => {
  var root = document.getElementById("root");
  var n = 1;
  
  // Event loop
  function loop(i: number): void {
    if (i <= 10) {
      tree.mount(e(Counter.spec, { count: n }));
      n += 1;    
      setTimeout(loop, 1000, i + 1);      
    }
  }
  
  // Mount the tree and start the loop
  Deku.render(tree, root);
  loop(0);
}