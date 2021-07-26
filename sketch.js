const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var myEngine, myWorld;
var ball1, ground, rope1, ball2, rope2;

function setup() {
  createCanvas(400,400);

  myEngine = Engine.create();

  myWorld = myEngine.world;
/*
  var render = Render.create({

      element: document.body,
      engine: myEngine,
      options: {
        width: 400,
        height: 400,
        wireframes: false
      }
  });

  Render.run(render);
*/
  var ball_options = {

    restitution: 0.9
  };

  ball1 = Bodies.circle(200, 150, 10, ball_options);
  World.add(myWorld, ball1);
  ball2 = Bodies.circle(200, 250, 10, ball_options)
  World.add(myWorld, ball2)
  //creating an object out of the class
  ground = new Ground(200,380, 400, 20);


  //create constraint body

  rope1 = Constraint.create({

    pointA: {x:200, y:20},
    bodyB: ball1,
    //pointB value is a default value on the body (not on the canvas). Also known as offset.
    pointB: {x:0, y:0},
    length: 100,
    stiffness: 0.1
  });

  World.add(myWorld, rope1);
  
  rope2 = Constraint.create({

   bodyA:ball1,
   pointA: {x: 0, y:0},
   bodyB:ball2,
   pointB: {x:0, y:0},
   length: 100,
   stiffness:0.1

  });

  World.add(myWorld, rope2);

  ellipseMode(RADIUS);
  rectMode(CENTER);
  
}

function draw() 
{
  background("lavender");

  Engine.update(myEngine);
  ground.display();
  ellipse(ball1.position.x, ball1.position.y, 10);
  ellipse(ball2.position.x, ball2.position.y, 10);

  push();
  stroke("orange");
  strokeWeight(3);
  line(rope1.pointA.x, rope1.pointA.y, ball1.position.x, ball1.position.y);
  line(ball1.position.x, ball1.position.y, ball2.position.x, ball2.position.y);
  pop();
}

function keyPressed()
{

  if(keyCode === RIGHT_ARROW)
  {
     Matter.Body.applyForce(ball1, {x: 0, y:0}, {x:0.05, y:0})
  }
}
