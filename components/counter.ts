/// <reference path="../typings/deku/deku.d.ts" />

import Deku = require('deku');
import PropLike = Deku.PropLike;
import Spec = Deku.Spec;
var e = Deku.element;

export interface P extends PropLike {
  count: number;
}

export interface S {
  sum: number;
}

export var spec: Spec<P, S> = {
  name: "Counter",
  
  render: (c, setS) => {
    var currentCount = c.props.count;
    var currentAcc   = c.state.sum + currentCount;
    return e("div", {}, [currentCount.toString() + " / " + currentAcc.toString()]);
  },
  
  shouldUpdate: (c, nextP, nextS) => {
    return (c.props.count !== nextP.count);  
  },
  
  initialState: () => { return { sum: 0 } },
  defaultProps: { count: 0 },
  
  beforeMount: function(c) {
    console.log("Before Mount: ");
    console.log(c);
  },
  
  afterMount: (c, el, setS) => {
    console.log("After Mount: ");
    console.log(c);
    console.log(el);
  },
  
  beforeUpdate: (c, nextP, nextS) => {
    console.log("Before Update: ");
    console.log(c);
    console.log(nextP);
    console.log(nextS);
  },
  
  beforeRender: (c) => {
    console.log("Before Render: ");
    console.log(c);
  },
  
  afterRender: (c, el) => {
    console.log("After Render: ");
    console.log(c);
    console.log(el);
  },
  
  afterUpdate: (c, prevP, prevS, setS) => {
    console.log("After Update: ");
    console.log(c);
    console.log(prevP);
    var newS = { sum: c.state.sum + c.props.count }; 
    setS(newS);
    console.log(prevS);
    console.log(newS);
  }
}