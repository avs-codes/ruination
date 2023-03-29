let gridTopX;
let gridTopY;
let sideLength = 35;
let fixedLength = 1;
let fillMode = Math.random();
let strokeMode = Math.random();
let hue = Math.random()*360 ;
let useVertDisplace = Math.random();

class Cube {
  constructor(c, r, z, type, weight, timeMod, vertDisplace) {
    this.c = c;
    this.r = r;
    this.z = z;
    this.hue = hue ;
    this.satur = 18;
    if (this.hue > 210 && this.hue < 300) {
      this.satur = 28;
    }
    if (fillMode < 0.33){
    //white mode
      this.light = 90
      if (strokeMode < 0.5) {
        this.weight = 0.2;
        this.strokeColor = [0,0,90]
      } else if (strokeMode <= 1) {
        this.weight = 1;
        this.strokeColor = [0,0,5]
      }
    } else if (fillMode < 0.66) {
    //black mode
      this.light = 7;
      if (strokeMode < 0.5) {
        this.weight = 0.4;
        this.strokeColor = [this.hue,10,60]
      } else if (strokeMode <= 1) {
        this.weight = noise(vertDisplace*220)*1.5-0.75;
        this.strokeColor = [this.hue,10,60]
      }
    } else if (fillMode <= 1) {
    //color mode
      this.light = 52 - (vertDisplace/2.5);
      if (strokeMode < 0.5) {
        this.weight = 3;
        this.strokeColor = 3
      } else if (strokeMode <= 1) {
        this.weight = .2;
        this.strokeColor = [this.hue, 20, 25]
      }
    }
    this.type = type;
  }

  draw(vertDisplace) {
    const x = gridTopX + ((this.c - this.r) * fixedLength * sqrt(3)) / 2;
    const y =
      gridTopY + ((this.c + this.r) * fixedLength) / 2 - fixedLength * this.z;

    const points = [];
    for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
      points.push(
        createVector(x + cos(angle) * sideLength, y + sin(angle) * sideLength)
      );
    }
    strokeWeight(this.weight);
    strokeJoin(ROUND);
    stroke(this.strokeColor);

    if (this.type != "ground") {
      fill(this.hue, this.satur, this.light * 0.4);
      if (strokeMode < 0.5 && this.weight === 3) {
        stroke(this.hue, this.satur, this.light* 0.4);
        fill(this.hue, this.satur, this.light * 0.4, 0.9);
      }
      if (strokeMode < 0.25 && this.weight === 3) {
        stroke(this.hue, this.satur, this.light* 0.4);
        fill(this.hue, this.satur, this.light * 0.4);
      } 
      if (fillMode < 0.33) {
        fill(this.hue, 0, this.light);
      }

      quad(
        x,
        y,
        points[5].x,
        points[5].y,
        points[0].x,
        points[0].y + vertDisplace,
        points[1].x,
        points[1].y + vertDisplace
      );

      fill(this.hue, this.satur, this.light * 0.6);
      if (fillMode < 0.33) {
        fill(this.hue, 0, this.light*.5);
      }
      if (fillMode < 0.33 && strokeMode < 0.5) {
        stroke(this.hue, 0, this.light *.5);
      }
      if (strokeMode < 0.5 && this.weight === 3) {
        stroke(this.hue, this.satur, this.light * 0.6);
        fill(this.hue, this.satur, this.light * 0.6, 0.9)
      }
      if (strokeMode < 0.25 && this.weight === 3) {
        stroke(this.hue, this.satur, this.light * 0.6);
        fill(this.hue, this.satur, this.light * 0.6)
      }
      quad(
        x,
        y,
        points[1].x,
        points[1].y + (vertDisplace  ),
        points[2].x,
        points[2].y + (vertDisplace),
        points[3].x,
        points[3].y
      );
              
      fill(this.hue, this.satur, this.light);
      if (fillMode < 0.33) {
        fill(this.hue, 0, this.light*.8);
      }
      if (fillMode < 0.33 && strokeMode < 0.5) {
        stroke(this.hue, 0, this.light);
      }
      if (strokeMode < 0.5 && this.weight === 3) {
        stroke(this.hue, this.satur, this.light);
        fill(this.hue, this.satur, this.light, 0.9);
      }
      if (strokeMode < 0.25 && this.weight === 3) {
        stroke(this.hue, this.satur, this.light);
        fill(this.hue, this.satur, this.light);
      }
      quad(
          x,
          y,
          points[3].x,
          points[3].y,
          points[4].x,
          points[4].y,
          points[5].x,
          points[5].y
          );
    } else {

        // fill(this.hue, this.satur, this.light);
        
        quad(
          x,
          y,
          points[3].x,
          points[3].y,
          points[4].x,
          points[4].y,
          points[5].x,
          points[5].y
        );
    }
  }

  getSortString() {
    return this.z + "." + this.r + "." + this.c;
  }
}

function setup() {
  createCanvas(1000, 1000);
  pixelDensity(2.0)
  gridTopX = width / 2;
  gridTopY = height / 2;
  noLoop();
  colorMode(HSL);
}

function draw() {
  background(0, 0, 5);
  if (fillMode < 0.33) {
    background(0, 0, 80);
  }
  if (fillMode > 0.66 && fillMode <= 1) {
    background(hue, 10, 52);
    if (hue > 210 && hue < 300) {
      background(hue, 28, 52);
    }
  }
  let startTime
  let endTime
  startTime = performance.now();
  createComposition(10, -10, -10, 10, 20, 2, 0, 0, 0)
  endTime = performance.now();
  console.log("run time: ", endTime - startTime);
}

function createComposition(topX, botX, topY, botY, InputSidelength, recurse, translateX, translateY, translateZ) {
  let compositionDecision = random();
  let vertDispScalar = random() * 32 + 40
  let timeMod = floor(max(random() * 10, random() * 10)) + 20;
  for (let x = topX; x > botX; x--) {
    for (let y = topY; y < botY; y++) {
      sideLength = InputSidelength;
      let currentCube
      let cubeDecision = random();
      let vertDisplace = abs( vertDispMethod(compositionDecision, x, y) * vertDispScalar  )
      if (cubeDecision < 1) {
        currentCube = new Cube(
          0 + (x*sideLength) + (y*sideLength) +translateX, 
          sideLength - translateY*2, 
          0 + (x*sideLength) + vertDisplace +translateZ, 
          "building",
          .4/recurse,
          timeMod,
          vertDisplace
          );
        if ( (x*sideLength) + (y*sideLength) +translateX > -670 && (x*sideLength) + (y*sideLength) +translateX < 610) {
          if (useVertDisplace < 0.5) {
            currentCube.draw(vertDisplace);
          } else if (useVertDisplace <= 1) {
            currentCube.draw(0);
          }
        }
        if (cubeDecision > 0.98 && recurse > 0) {
          let recurseType = random();
          if (recurseType < 0.5) {
            createComposition(
              (topX/(2))+(x*sideLength/2), 
              (botX/(2))+(x*sideLength/2), 
              -60, 
              60, 
              InputSidelength/2,
              recurse-1,
              0,
              vertDisplace,
              0
            )
          } else {
            createComposition(
              60, 
              -60,
              (topY/(2))+(x*sideLength/2), 
              (botY/(2))+(x*sideLength/2), 
              InputSidelength/1.5,
              recurse-1,
              0,
              vertDisplace,
              0
            )
          }
        } 
       
      }
      
    }
  }
}

function vertDispMethod(decision, x, y) {
  
  let xScale = floor(decision * 90 + 2);
  let yScale = floor(decision * 90 + 2);
  
  let xInfluence = pow(x, xScale);
  let yInfluence = pow(y, yScale);
  
  let opResult = chooseOpMode(decision, xInfluence, yInfluence);
  
  return ((noise(opResult ) - 0.5) * 2)
}

function chooseOpMode(decision, xInfluence, yInfluence) {
  
  if (decision < 0.1) {
    return xInfluence/yInfluence;
  } else if (decision <0.2) {
    return xInfluence/pow(2,30)+yInfluence%pow(2,80);
  } else if (decision <0.3) {
    return xInfluence/pow(2,100)-yInfluence/pow(2,100);
  } else if (decision <0.4) {
    return (sin((yInfluence*xInfluence)*pow(2,50)));
  } else if (decision <0.5) {
    return xInfluence%yInfluence/pow(2,160);
    
  } else if (decision <0.6) {
    return (yInfluence%pow(2,280))/(xInfluence);
  } else if (decision <0.7) {
    return (yInfluence/pow(2,280))+(xInfluence%pow(2,240));
  } else if (decision <0.8) {
    return (yInfluence%pow(2,150))-(xInfluence/pow(2,310));
  } else if (decision <0.9) {
    return (sin((xInfluence%yInfluence)*pow(2,-258)));
  } else if (decision <= 1) {
    return (yInfluence/pow(2,250))%(xInfluence/pow(2,350));
  } 

}
















