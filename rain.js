var Rain = function(ctx, width, height, color) {
  var base = this,
      drops = [];

  var drop = function(x1, y1, x2, y2) {
    var x = x1, y = y1,
        angle,
        brightness,
        speed = 2,
        acceleration = 1,
        targetRadius =1,
        distanceToTarget = 0,
        distanceTraveled = 0,
        coords = [],
        coordinateCount = 2;

    var draw = function() {
      ctx.beginPath();
      ctx.moveTo( coords[ coords.length - 1][ 0 ], coords[ coords.length - 1][ 1 ] );
      ctx.lineTo( x, y );
      ctx.strokeStyle = 'hsl(213, 34%, ' + brightness + '%)';
      ctx.stroke();
      ctx.beginPath();
    };

    var update = function(i) {
      coords.pop();
      coords.unshift( [ x, y ] );

      speed += acceleration;

      var velocityX = Math.cos( angle ) * speed,
          velocityY = Math.sin( angle ) * speed;

      distanceTraveled = distance( x1, y1, x + velocityX, y + velocityY );

      if( distanceTraveled >= distanceToTarget ) {
        drops.splice(i,1);
      } else {
        x += velocityX;
        y += velocityY;
      }
    };

    var distance = function(x1, y1, x2, y2) {
      return Math.sqrt( Math.pow( (x2-x1), 2 ) + Math.pow((y2-y1), 2 ) );
    };

    angle      = Math.atan2(y2 - y1, x1 - x1);
    brightness = rand(33, 50);
    distanceToTarget = distance(x1, y1, x2, y2);
    while(coordinateCount--) {
      coords.push([ x1, y1 ]);
    }

    return {
      namespace: 'drop',
      draw: draw,
      update: update
    }
  };

  var rand = function(min, max) {
    return Math.random() * ( max - min ) + min;
  };

  var run = function(){
    webkitRequestAnimationFrame( run );
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect( 0, 0, width, height );
    ctx.globalCompositeOperation = 'lighter';
    // loop over each drops, draw it, update it
    var i = drops.length;
    while( i-- ) {
      drops[ i ].draw();
      drops[ i ].update( i );
    }
    var sx = rand( 0, width+200 );
    drops.push(new drop(sx, 0, sx-200, height, color));
  };

  return {
    run: run
  };
}
