import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 
 
 let index = 0;
 let isUserInteracting = false;
 let idleTimer;
 let scene,camera,renderer,controls,enviroment,bike,loader;
 
//GSAP
const t1 = gsap.timeline();
t1
   .from('#lowest',{
       opacity:0,
       delay:1,
   onStart:function(){
       $('#lowest').textillate({
            in: {
                effect: 'fadeInUp',
                callback:function() {
                   $('#lowest').textillate('out')
                }
               },
           out:{ effect:'fadeOutUp'}
           });
   }
})

.from('#lower',{
   opacity:0,
   delay:1,
   onStart:function(){
      
       $('#lower').textillate({
            in: {
                effect: 'fadeInUp',
                callback:function() {
                   $('#lower').textillate('out')
                }
               },
           out:{ effect:'fadeOutUp'}
           });
   }
})
.from(' #middle',{
   opacity:0,
   delay:1,
   onStart:function(){
      
       $('#middle').textillate({
            in: {
                effect: 'fadeInUp',
                callback:function() {
                   $('#middle').textillate('out')
                }
               },
           out:{ effect:'fadeOutUp'}
           });
   }
})
.from(' #higest',{
   opacity:0,
   delay:1,
   onStart:function(){
      
       $('#higest').textillate({
            in: {
                effect: 'fadeInUp',
                callback:function() {
                   $('#higest').textillate('out')
                }
               },
           out:{ effect:'fadeOutUp'}
           });
   }
})
.from(' #heading',{
   opacity:0,
   y:-30,
   duration:1

})
.to('.mainscreen',{
   top:'-100%',
   delay:1,
   duration:1.2,
   ease:"Power4.easeOut"
})


.from('.topnav',{
   opacity:0,
  y:20,
   duration:1
})
.from('#Head',{
   opacity:0,
   x:-20,
  duration:0.5
})
.from('.up',{
   opacity:0,
   x:-30,
   duration:0.5
})
.from('#tog',{
   opacity:0,
   y:-20,
   duration:0.5
})
.from('#model-container img',{
   opacity:0,
   scale:1.5,
   duration:1
})

.to('#Emtb',{
   x:10,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#Emtb",
   scroller:"body",
 
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#h-4',{
   x:-10,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#h-4",
   scroller:"body",
  
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#h-2',{
   x:10,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#h-2",
   scroller:"body",
  
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#P-1',{
   x:-30,
   opacity:1,

   scrollTrigger:{
   trigger:"#P-1",
   scroller:"body",
 
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#b-1',{
   y:30,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#b-1",
   scroller:"body",
   
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})

.to('#right',{
   scale:1.2,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#right",
   scroller:"body",
  
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})

.to('#H',{
   x:-40,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#H",
   scroller:"body",
 
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})

.to('#h-3',{
   x:40,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#h-3",
   scroller:"body",
 
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#p-2',{
   y:30,
   opacity:1,
   duration:0.5,

   scrollTrigger:{
   trigger:"#p-2",
   scroller:"body",
  
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#h4',{
   y:50,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#h4",
   scroller:"body",
   
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})

.to('.H-2',{
   x:-40,
   opacity:1,
   duration:2,

   scrollTrigger:{
   trigger:".H-2",
   scroller:"body",
   
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})

.to('.H-1',{
   x:40,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:".H-1",
   scroller:"body",

   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})
.to('#svgs',{
   x:30,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:"#svgs",
   scroller:"body",
  
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})

.to('.PP',{
   y:50,
   opacity:1,
   duration:1,

   scrollTrigger:{
   trigger:".PP",
   scroller:"body",
  
   start:"top 80%",
   end:"bottom 10%",
   scrub:2
   }

})


 function init(){

 scene = new THREE.Scene();

//CAMERA 
 camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,-8,10);
camera.lookAt(new THREE.Vector3(0,-8,0));


//RENDERER 
 renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
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
	bike = gltf.scene;
if(bike){
	bike.position.set(0,-8,0);
	bike.castShadow = true;
	bike.receiveShadow = true;
	bike.scale.set(1,1,1);
	
}	
scene.add(bike);
render();
} );

 };

 init();

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


document.addEventListener('mousemove', () => {
    isUserInteracting = true;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(resetModel, 2000); 
});

function resetModel() {
    isUserInteracting = false;
   camera.position.set(0,-8,10);
camera.lookAt(new THREE.Vector3(0,-8,10));

   bike.position.set(0,-8,0);
   bike.castShadow = true;
	bike.receiveShadow = true; 
}



//ANIMATION
const animate =()=>{
	if (!isUserInteracting) {
        // If no user interaction, reset the model after 2 seconds
        clearTimeout(idleTimer);
        idleTimer = setTimeout(resetModel, 2000);
    }
  
requestAnimationFrame(animate);
controls.update();
renderer.render(scene,camera);
};

animate();

//RESPONSIVE
window.addEventListener('resize', ()=>{
	camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				render();
	
	});

    function render() {
        renderer.render( scene, camera );
    }

	

//DISPLAY IMAGES

 
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

displayimages();
 


