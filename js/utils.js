// function parse2D(data) {}

Array.prototype.parse2D = function () {
  const rows = [];
  // Each row is 16 cells
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }

  return rows;
};

Array.prototype.createObjectsFrom2D = function () {
  const objects = [];
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 292) {
        console.log("found a wall");
        // Push a new collision into collsion block array
        objects.push(
          // 64 width and height of a box/block
          new CollisionBlock({ position: { x: x * 64, y: y * 64 } })
        );
      }
    });
  });

  return objects;
};
