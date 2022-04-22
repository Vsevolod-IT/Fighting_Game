const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')


canvas.width = 1024;
canvas.height = 576;

const gravity = 0.2;

c.fillRect(0, 0, canvas.width, canvas.height)


class Sprite {
  constructor({position, velocity}){
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  draw(){
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, 50, 150)
  }

  update(){
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
    } else {
        this.velocity.y += gravity;
    }
  }
}


const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  }
})


const enemy = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  }
})


function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      player.velocity.x = 1;
      break
    case 'a':
      player.velocity.x = -1;
      break
  }
})

window.addEventListener('keyup', (event) => {
  console.log(event.key)
  switch (event.key) {
    case 'd':
      player.velocity.x = 0;
      break
    case 'a':
      player.velocity.x = 0;
      break
  }
})