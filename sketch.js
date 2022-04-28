let vs = []
function setup() {
  createCanvas(600, 600);
  v = new Vehicle(300,300);
}

function draw() {
  
  background('red');

  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(10,10);
    this.acceleration = createVector(0,0);
    this.l = 20.0;
    this.maxspeed = 5;
    this.maxforce = 0.2;
    this.wanderTheta = PI/8;
  }
  
  wander(){
    let projVector = this.velocity.copy(); 
    projVector.setMag(100);     
    let projPoint = projVector.add(this.location);
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);

    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.3 , 0.3);
    
    let debug = true;
    if(debug){
      push()
    }
  }
  
   seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta+20)
      //tangan kiri
  strokeWeight(1)
  fill(68,253,197)
  ellipse(75,80,13,16)
  ellipse(68,85,10,14)
  ellipse(64,90,9,13)
  ellipse(60,94,7,10)
  fill(243,193,27)
  strokeWeight(2)
  ellipse(57,98,8,8)
  //tangan kanan
  strokeWeight(1)
  fill(68,253,197)
  ellipse(125,80,13,16)
  ellipse(132,85,10,14)
  ellipse(136,90,9,13)
  ellipse(140,94,7,10)
  fill(243,193,27)
  strokeWeight(2)
  ellipse(143,98,8,8)

  //badan 
  strokeWeight(1)
  fill(68,253,197)
  rect(75,75,50,60);
  fill(143,252,219)
  rect(78,77,44,40)
  fill(243,193,27)
  rect(82,85,35,25, radians(300), radians(300))
  fill(243,193,27)
  ellipse(85,125,10,10)
  ellipse(115,125,10,10)
  fill(0,0,0)
  rect(94,122,12,3, radians(100))
  rect(94,127,12,3, radians(100))

  //kaki kiri
  strokeWeight(1)
  fill(68,253,197)
  rect(77,135,20,5,radians(200))
  rect(77,140,20,5,radians(200))
  rect(77,145,20,5,radians(200))
  fill(243,193,27)
  strokeWeight(2)
  arc(97,160,60,25,radians(180),radians(270))
  //kaki kanan
  strokeWeight(1)
  fill(68,253,197)
  rect(103,135,20,5,radians(200))
  rect(103,140,20,5,radians(200))
  rect(103,145,20,5,radians(200))
  fill(243,193,27)
  strokeWeight(2)
  arc(103,160,60,25,radians(270), radians(360))

  //leher
  strokeWeight(1)
  fill(243,193,27)
  rect(85,70,30,5)
  rect(87,65,26,5)

  //kepala
  strokeWeight(1)
  fill(68,253,197)
  rect(68,25,65,40, radians(150), radians(150))
    
  //telinga
  strokeWeight(2)
  fill(243,193,27)
  rect(63,35,5,15, radians(200), radians(300))
  rect(133,35,5,15, radians(200), radians(300))

  //mulut
  strokeWeight(1)
  fill(255,0,0)
  arc(100,55,20,10,radians(0), radians(180))

    
//mata mata    
    fill('white')
  strokeWeight(1)
  fill(246,241,169)
  ellipse(160,40,13,13)
  fill(246,241,169)
  ellipse(200,40,13,13)
  strokeWeight(7)
  point(162,40)
  point(197,40)
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}