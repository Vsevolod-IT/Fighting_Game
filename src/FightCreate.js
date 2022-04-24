
export default class Sprite {
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
    c.fillRect(this.position.x, this.position.y, this.width, 150)

    //attack
    if (this.isAttacking){
      c.fillStyle = 'green'
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
  }

  update(){
    this.draw();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x
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
