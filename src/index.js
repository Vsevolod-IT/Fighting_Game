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
    this.lastKey;
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


const keys = {
  a: {
    presed: false,
  },
  d: {
    presed: false,
  },
  w: {
    presed: false,
  },
  ArrowLeft: {
    presed: false,
  },
  ArrowRight: {
    presed: false,
  },
}

let lastKey;

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

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if(keys.a.presed && lastKey === 'a'){
    player.velocity.x = -1;
  } else if(keys.d.presed && lastKey === 'd'){
    player.velocity.x = 1;
  }



  if(keys.ArrowLeft.presed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -1;
  } else if(keys.ArrowRight.presed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x = 1;
  }
}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.presed = true;
      lastKey = 'd';
      break
    case 'a':
      keys.a.presed = true;
      lastKey = 'a';
      break
    case 'w':
      player.velocity.y = -10;
      break


    case 'ArrowRight':
      keys.ArrowRight.presed = true;
      enemy.lastKey = 'ArrowRight';
      break
    case 'ArrowLeft' :
      keys.ArrowLeft.presed = true;
      enemy.lastKey = 'ArrowLeft';
      break
    case 'ArrowUp':
      enemy.velocity.y = -10;
      break

  }
})

window.addEventListener('keyup', (event) => {
  console.log(event.key)
  switch (event.key) {
    case 'd':
      keys.d.presed = false;
      break
    case 'a':
      keys.a.presed = false;
      break


    case 'ArrowRight':
      keys.ArrowRight.presed = false;
      break
    case 'ArrowLeft':
      keys.ArrowLeft.presed = false;
      break
  }
})
