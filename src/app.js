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
    // renderer.physicallyCorrectLights = true;
    //renderer.toneMapping = THREE.ReinhardToneMapping;

    let mouseCoords = {
        x: 0,
        y: 0
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const cubeWidth = width / 8;
    const cubeHeight = height / 6;
    //console.log(width, height)

    // const downButton = document.querySelector(".js_down-button");
    // const perspectiveButton = document.querySelector(".js_perspective-button");

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

    let perspectiveIsFull = true;
    //scene.rotation.y = 1;

    let perspectiveObj = {
        cameraZ: 800,
        sceneY: 0
    }

    // perspectiveButton.addEventListener("click", () => {
    //     if (!perspectiveIsFull) {
    //         // camera.position.z = 800;
    //         // scene.rotation.y = 0;

    //         gsap.to(perspectiveObj, {
    //             cameraZ: 800,
    //             sceneY: 0,
    //             duration: 1,
    //             ease: "Power3.easeInOut"
    //         })

    //         perspectiveIsFull = true;
    //     } else {
    //         // camera.position.z = 3800;
    //         // scene.rotation.y = 1;

    //         gsap.to(perspectiveObj, {
    //             cameraZ: 3000,
    //             sceneY: 0.7,
    //             duration: 1,
    //             ease: "Power3.easeInOut"
    //         })

    //         perspectiveIsFull = false;
    //     }
    // })



    gsap.to(perspectiveObj, {
        cameraZ: 3000,
        sceneY: 0.7,

        scrollTrigger: {
            trigger: ".section-three",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            //ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 0.4
    })


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
    const intensity = 1.4;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.position.set(100, 100, 400);
    scene.add(ambientLight);

    const colorD = 0xffffFF;
    const intensityD = 0.4;
    const directinoalLight = new THREE.DirectionalLight(color, intensity);
    directinoalLight.position.set(100, 100, 400);
    //scene.add(directinoalLight);



    const baseIntensity2 = 0;
    const light2 = new THREE.PointLight(color, baseIntensity2, 10000);
    light2.castShadow = true;
    //Set up shadow properties for the light
    // light2.shadow.mapSize.width = 2048; // default
    // light2.shadow.mapSize.height = 2048; // default
    // light2.shadow.camera.near = 0.1; // default
    // light2.shadow.camera.far = 5000; // default
    // light2.shadow.bias = 0;
    //console.log(light2);
    //light2.position.set(10, 15, 14);
    scene.add(light2);

    const color3 = 0xffffFF;
    const intensity3 = 1.3;
    const light3 = new THREE.PointLight(color3, intensity3, 10000);
    light3.position.set(300, 440, 190);
    light3.castShadow = true;
    //Set up shadow properties for the light
    // light3.shadow.mapSize.width = 2048; // default
    // light3.shadow.mapSize.height = 2048; // default
    // light3.shadow.camera.near = 0.1; // default
    // light3.shadow.camera.far = 5000; // default
    // light3.shadow.bias = 0;
    scene.add(light3);




    onmousemove = function(e) {
        light2.position.set(e.clientX - width / 2, ((e.clientY - height / 2) * -1), 160);
    }

    onmousedown = function(e) {
        gsap.to(light2, { intensity: 0.7, duration: 0.4, ease: 'Power1.easeInOut' });

    }

    onmouseup = function(e) {
        gsap.to(light2, { intensity: baseIntensity2, duration: 0.4, ease: 'Power1.easeInOut' });
        //light2.intensity = 0.4;
    }

    const planeHeight = height * 5;
    const scrollHeight = height;

    const map = new THREE.TextureLoader(manager).load('assets/img/book/book_map.jpg');
    map.anisotropy = 4;
    map.magFilter = THREE.NearestFilter;
    map.minFilter = THREE.LinearMipMapLinearFilter;
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;

    const texture = new THREE.TextureLoader(manager).load('assets/img/book/book_texture.jpg');
    texture.anisotropy = 4;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const heightMap = new THREE.TextureLoader(manager).load('assets/img/book/book_texture.jpg');
    heightMap.anisotropy = 4;
    heightMap.magFilter = THREE.NearestFilter;
    heightMap.minFilter = THREE.LinearMipMapLinearFilter;
    heightMap.wrapS = THREE.RepeatWrapping;
    heightMap.wrapT = THREE.RepeatWrapping;

    const normalMap = new THREE.TextureLoader(manager).load('assets/img/book/book_norm.jpg');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;

    const geometryPlane = new THREE.PlaneGeometry(width, planeHeight, 500, 1000);
    const materialPlane = new THREE.MeshPhongMaterial({
        color: 0xaaccaa,
        //emissive: 0x100007,
        shininess: 0,
        //transparent: true,
        // opacity: 0.8,

        // depthWrite: true,
        // depthTest: true,
        map: map,
        bumpMap: texture,
        bumpScale: 10,
        displacementMap: heightMap,
        displacementScale: 10,
        //normalMap: normalMap,


    });
    materialPlane.map.minFilter = THREE.LinearFilter;

    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.geometry.computeBoundingBox();

    // var max = plane.geometry.boundingBox.max;
    // var min = plane.geometry.boundingBox.min;
    var max = plane.geometry.boundingBox.max;
    var min = plane.geometry.boundingBox.min;
    var heightG = max.y - min.y;
    var widthG = max.x - min.x;

    const textureSize = 1024;

    map.repeat.set(widthG / textureSize, heightG / textureSize);
    texture.repeat.set(widthG / textureSize, heightG / textureSize);
    heightMap.repeat.set(widthG / textureSize, heightG / textureSize);
    normalMap.repeat.set(widthG / textureSize, heightG / textureSize);

    // map.needsUpdate = true;
    // texture.needsUpdate = true;
    // heightMap.needsUpdate = true;
    // normalMap.needsUpdate = true;

    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 4, 4 );

    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.position.z = -200;
    //plane.position.set(0, planeHeight, 0)
    scene.add(plane);

    let scroll = {
        y: -planeHeight + height * 2
    };
    // downButton.addEventListener("click", () => {
    //     window.scrollTo({ top: height, behavior: 'smooth' });
    // });

    // const axesHelper = new THREE.AxesHelper(500);
    // scene.add(axesHelper);



    gsap.to(scroll, {
        y: scrollHeight,
        scrollTrigger: {
            trigger: ".section-wrapper",
            // start: "top top",
            // end: "bottom bottom",
            scrub: 0.4,
            ease: 'Power1.inOut'

        },
        // ease: "Linear",
        //duration: 0.4
    })


    const boxWidth = cubeWidth;
    const boxHeight = cubeHeight;
    const boxDepth = 100;
    //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const geometry = new THREE.BoxGeometry(200, 200, boxDepth, 600, 600, 300);



    // const material = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     emissive: 0x000002,
    //     shininess: 0.5,
    //     //transparent: true,
    //     // opacity: 0.8,
    //     depthWrite: true,
    //     depthTest: true
    // });


    const cubeMap = new THREE.TextureLoader(manager).load('assets/img/wall_base.jpg');
    cubeMap.wrapS = THREE.RepeatWrapping;
    cubeMap.wrapT = THREE.RepeatWrapping;
    const cubeTexture = new THREE.TextureLoader(manager).load('assets/img/wall_bump.jpg');
    cubeTexture.wrapS = THREE.RepeatWrapping;
    cubeTexture.wrapT = THREE.RepeatWrapping;
    const cubeHeightMap = new THREE.TextureLoader(manager).load('assets/img/wall_height.png');
    cubeHeightMap.wrapS = THREE.RepeatWrapping;
    cubeHeightMap.wrapT = THREE.RepeatWrapping;
    // const cubeNormalMap = new THREE.TextureLoader(manager).load('assets/img/wood_norm.jpg');
    // cubeNormalMap.wrapS = THREE.RepeatWrapping;
    // cubeNormalMap.wrapT = THREE.RepeatWrapping;






    const material = new THREE.MeshPhongMaterial({
        color: 0x777777,
        //emissive: 0x100007,
        shininess: 0,


        depthWrite: true,
        depthTest: true,
        map: cubeMap,
        bumpMap: cubeTexture,
        bumpScale: 13,
        displacementMap: cubeHeightMap,
        displacementScale: 10,
        //normalMap: cubeNormalMap,


    });




    const cube = new THREE.Mesh(geometry, material);

    // cube.geometry.computeBoundingBox();


    // var cubemax = plane.geometry.boundingBox.max;
    // var cubemin = plane.geometry.boundingBox.min;
    // var cubeheightG = cubemax.y - cubemin.y;
    // var cubewidthG = cubemax.x - cubemin.x;

    // const cubeTextureSize = 1300;

    // cubeMap.repeat.set(cubewidthG / cubeTextureSize, cubeheightG / cubeTextureSize);
    // cubeTexture.repeat.set(cubewidthG / cubeTextureSize, cubeheightG / cubeTextureSize);
    // cubeHeightMap.repeat.set(cubewidthG / cubeTextureSize, cubeheightG / cubeTextureSize);
    // cubeNormalMap.repeat.set(cubewidthG / cubeTextureSize, cubeheightG / cubeTextureSize);

    // cubeMap.needsUpdate = true;
    // cubeTexture.needsUpdate = true;
    // cubeHeightMap.needsUpdate = true;

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




    // const material2 = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     emissive: 0x002002,
    //     shininess: 0.5,
    //     transparent: true,
    //     opacity: 0.4,
    //     depthWrite: true,
    //     depthTest: true
    // });

    // const material2 = new THREE.MeshPhongMaterial({
    //     color: 0xffffff,
    //     //emissive: 0x100007,
    //     shininess: 0.2,

    //     // depthWrite: true,
    //     // depthTest: true,
    //     map: loader.load('assets/img/wood-base.jpg'),
    //     bumpMap: loader.load('assets/img/wood-bump.jpg'),
    //     bumpScale: 6,


    // });

    // const cube2 = new THREE.Mesh(geometry, material2);
    // cube2.castShadow = true;
    // cube2.receiveShadow = true;
    // //scene.add(cube2);

    // cube2.position.y = 240;
    // cube2.position.x = 0;
    // cube2.position.z = 0;
    // cube2.rotation.y = -1.1;

    // let cube2Rotation = {
    //     x: 0,
    //     y: 0,
    //     z: 0
    // };



    gsap.to(cubeRotation, {
        y: 6,
        scrollTrigger: {
            trigger: ".section-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            ease: 'Power1.inOut'
                //ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 0.4
    })

    // ScrollTrigger.create({
    //     trigger: sections[1],
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 1,
    //     onEnter: () => {
    //         console.log("section enter");
    //         gsap.to(cubeRotation, {
    //             z: 2,
    //             duration: 1,
    //             ease: "Power3.easeInOut"
    //         })
    //     },
    //     onEnterBack: () => {
    //         gsap.to(cubeRotation, {
    //             z: 3,
    //             y: 0,
    //             duration: 1,
    //             ease: "Power3.easeInOut"
    //         })
    //     },
    //     onLeave: () => {
    //         gsap.to(cubeRotation, {
    //             y: 3,
    //             z: 0,
    //             duration: 1,
    //             ease: "Power3.easeInOut"
    //         })
    //     },
    //     onLeaveBack: () => {
    //         gsap.to(cubeRotation, {
    //             y: 0,
    //             duration: 1,
    //             ease: "Power3.easeInOut"
    //         })
    //     }

    // // onToggle: self => console.log("toggled, isActive:", self.isActive),
    // onUpdate: self => {
    //     scroll.y = planeHeight * self.progress.toFixed(3) / 2.8;
    //     // console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
    // }
    //});


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

        // cube2.rotation.y = cube2Rotation.y;

        cube.rotation.x = cubeRotation.x;
        cube.rotation.y = cubeRotation.y;
        cube.rotation.z = cubeRotation.z;

        plane.position.y = scroll.y;

        camera.position.z = perspectiveObj.cameraZ;
        scene.rotation.y = perspectiveObj.sceneY;

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