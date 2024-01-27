import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
 
 let index = 0;
 let scene,camera,renderer,controls,enviroment,phone,loader;
 init();

 function init(){

 scene = new THREE.Scene();

//CAMERA 
 camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,-8,10);
camera.lookAt(new THREE.Vector3(0,-8,0));


//RENDERER 
 renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
document.querySelector('#model-container').append( renderer.domElement );


//CONTROLS
 controls = new OrbitControls(camera,renderer.domElement);

//BACKGROUND TEXTURES
const cubeTextures =[
	'px.jpg',
	'nx.jpg',
	'py.jpg',
	'ny.jpg',
	'pz.jpg',
	'nz.jpg'
]

 enviroment = new THREE.CubeTextureLoader().load(cubeTextures);
scene.background = enviroment;

//3D MODEL LOAD
 loader = new GLTFLoader(); 
loader.load('BikeModel.glb', ( gltf ) =>{
	phone = gltf.scene;
if(phone){
	phone.position.set(0,-8,0);
	phone.castShadow = true;
	phone.receiveShadow = true;
	phone.scale.set(1,1,1);
	
}	
scene.add(phone);
render();
} );

 }
//LIGHT SOURCES
const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,8,0)

light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 100;
scene.add(light);


let isUserInteracting = false;

document.addEventListener('mousemove', () => {
    isUserInteracting = true;

    // Reset the timer when there is user interaction
    clearTimeout(idleTimer);
    idleTimer = setTimeout(resetModel, 2000); // Reset after 3 seconds of inactivity
});

function resetModel() {
    isUserInteracting = false;

    // Reset camera position
   camera.position.set(0,-8,10);
camera.lookAt(new THREE.Vector3(0,-8,10));

   phone.position.set(0,-8,0);
   phone.castShadow = true;
	phone.receiveShadow = true; // Adjust as needed
}

let idleTimer;

//ANIMATION
const animate =()=>{

	if (!isUserInteracting) {
        // If no user interaction, reset the model after 3 seconds
        clearTimeout(idleTimer);
        idleTimer = setTimeout(resetModel, 2000);
    }
  
requestAnimationFrame(animate);
controls.update();
controls.enablePan = false;
			controls.enableDamping = true;
renderer.render(scene,camera);
};


//RESPONSIVE
window.addEventListener('resize', ()=>{
	camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();
	
	});

	animate();


    function render() {

        renderer.render( scene, camera );

    }

	//TEXT CIRCLING
	new CircleType(document.getElementById('circle-it'))
  .radius(104);


//DISPLAY IMAGES
  displayimages();
 
function displayimages(){
    let i;
	
    const images=document.querySelector("#right").querySelectorAll("img")
    for(i=0;i<images.length;i++){
        images[i].style.display="none";
        
    }
	
    index++;
    if ( index > images.length){
        index=1;
    }
    images[index - 1].style.display="block";
    setTimeout (displayimages , 2000);
}




//GSAP
document.addEventListener('DOMContentLoaded', ()=>{
gsap.timeline()
.from("#circle-it",{
    opacity:0,
    duration:1,
    ease:"power2.inOut"
})
.to("#circle-it",{
    rotation:360,
    duration:1,
    ease:"power2.inOut"
})
.to("#circle-it",{
    opacity:0,
    duration:1,
    ease:"power2.inOut"
})
.to("#circle-it",{
    rotation:0,
    opacity:1,
    duration:1,
    ease:"power2.inOut"
});
});