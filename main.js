import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let index = 0;
let scene, camera, renderer, controls, environment, phone, loader;

init();

function init() {
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -8, 10);
    camera.lookAt(new THREE.Vector3(0, -8, 0));

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.querySelector('#model-container').append(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Background Textures
    const cubeTextures = [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ];
    environment = new THREE.CubeTextureLoader().load(cubeTextures);
    scene.background = environment;

    // Load 3D Model
    loader = new GLTFLoader();
    loader.load('BikeModel.glb', (gltf) => {
        phone = gltf.scene;
        if (phone) {
            phone.position.set(0, -8, 0);
            phone.castShadow = true;
            phone.receiveShadow = true;
            phone.scale.set(1, 1, 1);
        }
        scene.add(phone);
        render();
    });

    // Light Sources
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 8, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 100;
    scene.add(light);

    // Event Listeners
    let idleTimer;
    document.addEventListener('mousemove', () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(resetModel, 2000);
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    });

    animate();
}

function resetModel() {
    camera.position.set(0, -8, 10);
    camera.lookAt(new THREE.Vector3(0, -8, 10));
    phone.position.set(0, -8, 0);
    phone.castShadow = true;
    phone.receiveShadow = true;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function render() {
    renderer.render(scene, camera);
}

function displayImages() {
    const images = document.querySelector("#right").querySelectorAll("img");
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    index++;
    if (index > images.length) {
        index = 1;
    }
    images[index - 1].style.display = "block";
    setTimeout(displayImages, 2000);
}

displayImages();
