import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import * as dat from 'dat.gui';
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { CubeRefractionMapping } from 'three';

gsap.registerPlugin(ScrollTrigger);


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    let mouseCoords = {
        x: 0,
        y: 0
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const cubeWidth = width / 6;
    const cubeHeight = height / 6;
    //console.log(width, height)

    const downButton = document.querySelector(".js_down-button");
    const sections = document.querySelectorAll(".section-full-height");



    const fov = 50;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    //const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 10000);
    camera.position.z = 800;
    //camera.position.z = 3800;
    camera.position.x = 0;
    camera.position.y = 0;

    const boxGap = 1.6;

    let cubes = [];

    const loader = new THREE.TextureLoader();



    const scene = new THREE.Scene();


    //scene.rotation.y = 1;


    const manager = new THREE.LoadingManager();
    manager.onStart = function(url, itemsLoaded, itemsTotal) {

        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    };

    manager.onLoad = function() {

        console.log('Loading complete!');

    };


    manager.onProgress = function(url, itemsLoaded, itemsTotal) {

        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

    };

    manager.onError = function(url) {

        console.log('There was an error loading ' + url);

    };




    const color = 0xffffFF;
    const intensity = 0.4;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.position.set(100, 100, 400);
    scene.add(ambientLight);

    const colorD = 0xffffFF;
    const intensityD = 0.4;
    const directinoalLight = new THREE.DirectionalLight(color, intensity);
    directinoalLight.position.set(100, 100, 400);
    scene.add(directinoalLight);



    const baseIntensity2 = 0.1;
    const light2 = new THREE.PointLight(color, baseIntensity2, 10000);
    light2.castShadow = true;
    //Set up shadow properties for the light
    light2.shadow.mapSize.width = 2048; // default
    light2.shadow.mapSize.height = 2048; // default
    light2.shadow.camera.near = 0.1; // default
    light2.shadow.camera.far = 5000; // default
    light2.shadow.bias = 0;
    console.log(light2);
    //light2.position.set(10, 15, 14);
    scene.add(light2);




    onmousemove = function(e) {
        light2.position.set(e.clientX - width / 2, ((e.clientY - height / 2) * -1), 160);
    }

    onmousedown = function(e) {
        gsap.to(light2, { intensity: 0.4, duration: 0.4, ease: 'Power1.easeInOut' });

    }

    onmouseup = function(e) {
        gsap.to(light2, { intensity: baseIntensity2, duration: 0.4, ease: 'Power1.easeInOut' });
        //light2.intensity = 0.4;
    }

    const planeHeight = height * 3;
    const scrollHeight = planeHeight / 3;

    const geometryPlane = new THREE.PlaneGeometry(width, planeHeight, 32);
    const materialPlane = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        //emissive: 0x100007,
        shininess: 0.2,
        //transparent: true,
        // opacity: 0.8,
        // depthWrite: true,
        // depthTest: true,
        map: new THREE.TextureLoader(manager).load('assets/img/bg-texture-3.jpg'),
        bumpMap: new THREE.TextureLoader(manager).load('assets/img/bg-texture-displacementmap-3.jpg'),
        bumpScale: 6,


    });

    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 4, 4 );

    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.position.z = -200;
    //plane.position.set(0, planeHeight, 0)
    scene.add(plane);

    let scroll = {
        y: -planeHeight + height
    };
    downButton.addEventListener("click", () => {
        window.scrollTo({ top: height, behavior: 'smooth' });
    });

    // const axesHelper = new THREE.AxesHelper(500);
    // scene.add(axesHelper);



    gsap.to(scroll, {
        y: scrollHeight,
        scrollTrigger: {
            trigger: ".section-wrapper",
            // start: "top top",
            // end: "bottom bottom",
            scrub: true,
            ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 0.4
    })


    const boxWidth = cubeWidth;
    const boxHeight = cubeHeight;
    const boxDepth = 40;
    //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const geometry = new THREE.BoxGeometry(300, 300, boxDepth);



    // const material = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     emissive: 0x000002,
    //     shininess: 0.5,
    //     //transparent: true,
    //     // opacity: 0.8,
    //     depthWrite: true,
    //     depthTest: true
    // });




    const map = new THREE.TextureLoader(manager).load('assets/img/wood-base.jpg');
    const texture = new THREE.TextureLoader(manager).load('assets/img/wood-bump.jpg');



    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        //emissive: 0x100007,
        shininess: 0.2,

        // depthWrite: true,
        // depthTest: true,
        map: map,
        //bumpMap: loader.load('assets/img/wood-bump.jpg'),
        //bumpScale: 26,
        displacementMap: texture,
        displacementScale: 26,
        //normalMap: loader.load('assets/img/wood-normal.jpg'),


    });




    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    //cube.material.flatShading = true;
    //cube.material.opacity = a;
    scene.add(cube);

    cube.position.y = 0;
    cube.position.x = 0;
    cube.position.z = 0;

    let cubeRotation = {
        x: 0,
        y: 0,
        z: 0
    };


    const color3 = 0xddddFF;
    const intensity3 = 2;
    const light3 = new THREE.PointLight(color3, intensity3, 10000);
    light3.position.set(0, 240, 40);
    //scene.add(light3);

    // const material2 = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     emissive: 0x002002,
    //     shininess: 0.5,
    //     transparent: true,
    //     opacity: 0.4,
    //     depthWrite: true,
    //     depthTest: true
    // });

    const material2 = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        //emissive: 0x100007,
        shininess: 0.2,

        // depthWrite: true,
        // depthTest: true,
        map: loader.load('assets/img/wood-base.jpg'),
        bumpMap: loader.load('assets/img/wood-bump.jpg'),
        bumpScale: 6,


    });

    const cube2 = new THREE.Mesh(geometry, material2);
    cube2.castShadow = true;
    cube2.receiveShadow = true;
    //scene.add(cube2);

    cube2.position.y = 240;
    cube2.position.x = 0;
    cube2.position.z = 0;
    cube2.rotation.y = -1.1;

    let cube2Rotation = {
        x: 0,
        y: 0,
        z: 0
    };


    ScrollTrigger.create({
        trigger: sections[1],
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onEnter: () => {
            console.log("section enter");
            gsap.to(cubeRotation, {
                z: 2,
                duration: 1,
                ease: "Power3.easeInOut"
            })
        },
        onEnterBack: () => {
            gsap.to(cubeRotation, {
                z: 3,
                y: 0,
                duration: 1,
                ease: "Power3.easeInOut"
            })
        },
        onLeave: () => {
            gsap.to(cubeRotation, {
                y: 3,
                z: 0,
                duration: 1,
                ease: "Power3.easeInOut"
            })
        },
        onLeaveBack: () => {
            gsap.to(cubeRotation, {
                y: 0,
                duration: 1,
                ease: "Power3.easeInOut"
            })
        }

        // // onToggle: self => console.log("toggled, isActive:", self.isActive),
        // onUpdate: self => {
        //     scroll.y = planeHeight * self.progress.toFixed(3) / 2.8;
        //     // console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        // }
    });


    function makeInstance(geometry, x, y, z, a, make) {

        if (make) {
            const cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true;
            cube.receiveShadow = true;
            //cube.material.flatShading = true;
            //cube.material.opacity = a;
            scene.add(cube);

            cube.position.x = x;
            cube.position.y = y;
            cube.position.z = z;

            cubes.push(cube);

            //console.log(cubes[0]);

            return cube;
        }
    }



    function makeArray() {
        let squareCount = 6;
        for (let i = squareCount / -2; i < (squareCount / 2) + 1; i++) {
            for (let j = squareCount / -2; j < (squareCount / 2) + 1; j++) {
                let z = i + j % 2 ? -40 : 40;
                let alpha = i + j % 2 ? 1 : 0.8;
                let make = i + j % 2 ? false : true;
                makeInstance(geometry, (i * cubeWidth), (j * cubeHeight), z, alpha, make);
            }
        }
    }

    //makeArray();


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    let renderRequested = false;


    function render() {
        renderRequested = undefined;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        //scene.rotation.y += 0.001;

        // for (let index = 0; index < cubes.length; index++) {
        //     cubes[index].rotation.z += 0.01;
        //     cubes[index].rotation.y += 0.01;
        //     cubes[index].rotation.x += 0.01;
        //     //cubes[index].material.opacity = Math.sin(1 * index);

        // }

        cube.rotation.x = cubeRotation.x;
        cube.rotation.y = cubeRotation.y;
        cube.rotation.z = cubeRotation.z;

        plane.position.y = scroll.y;

        // controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();

    // function requestRenderIfNotRequested() {
    //     if (!renderRequested) {
    //         renderRequested = true;
    //         requestAnimationFrame(render);
    //     }
    // }

    // //controls.addEventListener('change', requestRenderIfNotRequested);
    // window.addEventListener('resize', () => {
    //     const canvas = renderer.domElement;
    //     camera.aspect = canvas.clientWidth / canvas.clientHeight;
    //     camera.updateProjectionMatrix();
    // });
}

main();