// import {Sprite} from './FightCreate.js';


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')


canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7;

c.fillRect(0, 0, canvas.width, canvas.height)


class Sprite {
  constructor({position, velocity, color = 'red', offset}){
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 50,
    }
    this.color = color
    this.isAttacking
  }

  draw(){
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    //attack
    if (this.isAttacking){
      c.fillStyle = 'green'
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update(){
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if(this.position.y + this.height + this.velocity.y >= canvas.height){
      this.velocity.y = 0;
    } else {
        this.velocity.y += gravity;
    }
  }

  attack(){
    this.isAttacking = true
    setTimeout(()=>{
      this.isAttacking = false
    }, 100)
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


const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
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
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0,
  }
})


function rectangularCollision({rectangl1, rectangl2}){
 return (
      rectangl1.attackBox.position.x + rectangl1.attackBox.width >= rectangl2.position.x &&
      rectangl1.attackBox.position.x <= rectangl2.position.x + rectangl2.width &&
      rectangl1.attackBox.position.y + rectangl1.attackBox.height >= rectangl2.position.y &&
      rectangl1.attackBox.position.y <= rectangl2.position.y + rectangl2.height
  )
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0,0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;


  // player move (speed)
  if(keys.a.presed && player.lastKey === 'a'){
    player.velocity.x = -5;
  } else if(keys.d.presed && player.lastKey === 'd'){
    player.velocity.x = 5;
  }



  // enemy move (speed)
  if(keys.ArrowLeft.presed && enemy.lastKey === 'ArrowLeft'){
    enemy.velocity.x = -5;
  } else if(keys.ArrowRight.presed && enemy.lastKey === 'ArrowRight'){
    enemy.velocity.x =5;
  }


  // detect touch
  if( rectangularCollision({rectangl1: player, rectangl2: enemy}) &&
      player.isAttacking
    ) {
    player.isAttacking = false
    console.log('touch')
  }

  if( rectangularCollision({rectangl1: enemy, rectangl2: player}) &&
      enemy.isAttacking
    ) {
    enemy.isAttacking = false
    console.log('touch')
  }


}

animate();

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.presed = true;
      player.lastKey = 'd';
      break
    case 'a':
      keys.a.presed = true;
      player.lastKey = 'a';
      break
    case 'w':
      player.velocity.y = -20;
      break
    case ' ':
      player.attack();
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
      enemy.velocity.y = -20;
      break
    case 'ArrowDown':
      enemy.isAttacking = true;
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
