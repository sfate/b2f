"use strict";

window.onload = function() {
  if ('webkitRequestAnimationFrame' in window) {
    var w = 1170,
        h = 690;
    var canvas = document.getElementById('rain');

    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext( '2d' );

    (new Rain(ctx, w, h, 120)).run();
  } else {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }
};

