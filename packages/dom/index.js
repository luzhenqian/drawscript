(function (global) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const start = () => {
    ctx.beginPath();
  }

  const rect = (...points) => {
    points.forEach(([x, y], i) => {
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    })
  }

  const color = (color) => {
    ctx.fillStyle = color
  }

  const end = () => {
    ctx.fill();
    ctx.fillStyle = ''
  }

  global.__ds__ = {
    start, rect, color, end
  }
}
)(window)