"use strict";

window.onload = function() {
  var w = 1170,
      h = 690;
  var canvas = document.getElementById('rain');

  canvas.width = w;
  canvas.height = h;
  var ctx = canvas.getContext( '2d' );

  (new Rain(ctx, w, h, 120)).run();
};

