import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

 
 let index = 0;
const scene = new THREE.Scene();

//CAMERA 
const camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,-8,10);
camera.lookAt(new THREE.Vector3(0,-8,0));


//RENDERER 
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
document.querySelector('#model-container').append( renderer.domElement );
renderer.render(scene,camera);

//CONTROLS
const controls = new OrbitControls(camera,renderer.domElement);


//BACKGROUND TEXTURES
const cubeTextures =[
	'Assests/px.jpg',
	'./Assests/nx.jpg',
	'./Assests/py.jpg',
	'./Assests/ny.jpg',
	'./Assests/pz.jpg',
	'./Assests/nz.jpg'
]

const enviroment = new THREE.CubeTextureLoader().load(cubeTextures);
scene.background = enviroment;



//3D MODEL LOAD
const loader = new GLTFLoader();
let phone;
loader.load('./Assests/bicycle_m..glb', ( gltf ) =>{
	phone = gltf.scene;
if(phone){
	phone.position.set(0,-8,0);
	phone.castShadow = true;
	phone.receiveShadow = true;
	phone.scale.set(1,1,1);
	
}	scene.add(phone);
} );

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
camera.lookAt(new THREE.Vector3(0,-8,0));
    
   phone.position.set(0,-8,0); // Adjust as needed
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
renderer.render(scene,camera);
};


//RESPONSIVE
window.addEventListener('resize', ()=>{
	const newwidth = window.innerWidth;
	const newheight = window.innerHeight;
	
	camera.aspect = newwidth/newheight;
	camera.updateProjectionMatrix();
	renderer.setSize(newwidth,newheight);
	renderer.render(scene,camera);
	
	});

	animate();


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


// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
  
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth',
//       initialDate: '2023-11-07',
//       headerToolbar: {
//         left: 'prev,next today',
//         center: 'title',
//         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//       },
//       events: [
//         {
//           title: 'All Day Event',
//           start: '2023-11-01'
//         },
//         {
//           title: 'Long Event',
//           start: '2023-11-07',
//           end: '2023-11-10'
//         },
//         {
//           groupId: '999',
//           title: 'Repeating Event',
//           start: '2023-11-09T16:00:00'
//         },
//         {
//           groupId: '999',
//           title: 'Repeating Event',
//           start: '2023-11-16T16:00:00'
//         },
//         {
//           title: 'Conference',
//           start: '2023-11-11',
//           end: '2023-11-13'
//         },
//         {
//           title: 'Meeting',
//           start: '2023-11-12T10:30:00',
//           end: '2023-11-12T12:30:00'
//         },
//         {
//           title: 'Lunch',
//           start: '2023-11-12T12:00:00'
//         },
//         {
//           title: 'Meeting',
//           start: '2023-11-12T14:30:00'
//         },
//         {
//           title: 'Birthday Party',
//           start: '2023-11-13T07:00:00'
//         },
//         {
//           title: 'Click for Google',
//           url: 'https://google.com/',
//           start: '2023-11-28'
//         }
//       ]
//     });
  
//     calendar.render();
//   });

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
