import '/style.css';
import * as THREE from './node_modules/three/build/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const audio = new Audio("blackHoleSun.mp3")
// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Sun




const sunGeometry = new THREE.SphereGeometry(6, 32, 32);

const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sunNormalTexture = new THREE.TextureLoader().load('normalSun.jpg');
const sunMaterial = new THREE.MeshPhongMaterial({
  map: sunTexture,
  displacementMap: sunNormalTexture,
  displacementScale: 0.004,
  displacementBias: 0.03
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial)






scene.add(sun);

// Set the object as the input listener for the renderer
renderer.domElement.addEventListener('click', onMouseClick);

function onMouseClick(event) {
  // Convert the mouse coordinates to 3D space
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  // Create a raycaster to intersect the object
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Get the intersected objects
  var intersects = raycaster.intersectObjects([sun]);

  if (intersects.length > 0) {
    // The object was clicked
    audio.currentTime = 0;
    audio.play();
  }
}

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 10, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers



// const controls = new OrbitControls(camera, renderer.domElement);


const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshBasicMaterial({  color: 0xffffff });

const stars= [];

for (let i = 0; i < 200; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);
  star.position.set(
    Math.random() * 100 - 60,
    Math.random() * 100 - 60,
    Math.random() * 100 - 60
  );
  stars.push(star)
  scene.add(star);
}





// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const selfieTexture = new THREE.TextureLoader().load('HeadShot1.jpg');

const selfie = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: selfieTexture }));

scene.add(selfie);


// earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
 
  })
);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normalMoon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(.2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

moon.position.set(earth.position, 0, 0);
moon.rotation.y = Math.PI / 2;
earth.add(moon);

earth.position.set(2, 0, 0);
earth.rotation.y = Math.PI / 1;

selfie.position.z = -5;
selfie.position.x = 4.8;
scene.add(earth);
// Scroll Animation

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;


  selfie.rotation.y += 0.05;
  selfie.rotation.z += 0.05;


  camera.position.z = t * -0.01;

  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();




// Animation Loop

function animate() {
  requestAnimationFrame(animate);



 earth.position.x = Math.cos(Date.now() * 0.001) * 20;
 earth.position.z = Math.sin(Date.now() * 0.001) * 20;
 earth.rotation.y += 0.005;

 moon.position.x = Math.cos(Date.now() * 0.001) * 2;
 moon.position.z =  Math.sin(Date.now() * 0.001)* 2;
 moon.rotation.y += 0.01;

  sun.rotation.y += 0.0005;

  
  
  
  
  
  
  // controls.update();

  renderer.render(scene, camera);
}






//twinkle
function animate2() {
  let twinkleCount = 0;
  for (let i = 0; i < stars.length; i++) {
    const object = stars[i];
    object.rotation.x += 0.6;
    object.rotation.y += 0.6;
    // if (twinkleCount < 3 && Math.random() < 0.5) {
    //   stars[10].traverse((node) => {
    //     if (node.isMesh) {
    //       node.material.transparent = true;
    //       node.material.opacity = Math.random();
    //       twinkleCount++;
    //     }
    //   });
    // }
  }
  requestAnimationFrame(animate2);

}




animate2()




animate();