import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

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


    const fov = 60;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5000;
    //const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 10000);
    camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 0;

    const boxGap = 1.6;

    let cubes = [];

    const loader = new THREE.TextureLoader();



    const scene = new THREE.Scene();


    const color = 0xddddFF;
    const intensity = 0.4;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.position.set(100, 100, 100);
    scene.add(ambientLight);



    const intensity2 = 0.4;
    const light2 = new THREE.PointLight(color, intensity2, 10000);
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
        light2.position.set(e.clientX - width / 2, ((e.clientY - height / 2) * -1), 120);
    }

    onmousedown = function(e) {
        // light2.intensity = 1.4;
        gsap.to(light2, { intensity: 1, duration: 0.4, ease: 'Power1.easeInOut' });
        // gsap.to(cubes, {
        //     duration: 1,
        //     position: { setZ: -10 },
        //     ease: "power1.inOut",
        //     stagger: {
        //         grid: [7, 7],
        //         from: "center",
        //         amount: 1.5
        //     }
        // });
    }

    onmouseup = function(e) {
        gsap.to(light2, { intensity: 0.4, duration: 0.4, ease: 'Power1.easeInOut' });
        //light2.intensity = 0.4;
    }

    const planeHeight = height * 4;

    const geometryPlane = new THREE.PlaneGeometry(width, planeHeight, 32);
    const materialPlane = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000002,
        shininess: 0,
        //transparent: true,
        // opacity: 0.8,
        depthWrite: true,
        depthTest: true,
        map: loader.load('assets/img/bg-texture.jpg'),
    });

    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);

    let scroll = {
        y: 0
    };
    downButton.addEventListener("click", () => {
        window.scrollTo({ top: height, behavior: 'smooth' });
    });

    // ScrollTrigger.create({
    //     trigger: ".section-wrapper",
    //     start: "top top",
    //     end: "bottom bottom",
    //     scrub: 1,

    //     // onToggle: self => console.log("toggled, isActive:", self.isActive),
    //     onUpdate: self => {
    //         scroll.y = planeHeight * self.progress.toFixed(3) / 2.8;
    //         // console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
    //     }
    // });

    gsap.to(scroll, {
        y: planeHeight / 2.8,
        scrollTrigger: {
            trigger: ".section-wrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 0.4
    })


    const boxWidth = cubeWidth;
    const boxHeight = cubeHeight;
    const boxDepth = 40;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);



    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0x000002,
        shininess: 0,
        //transparent: true,
        // opacity: 0.8,
        depthWrite: true,
        depthTest: true
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
                let z = i + j % 2 ? -10 : 0;
                let alpha = i + j % 2 ? 1 : 0.8;
                let make = i + j % 2 ? false : true;
                makeInstance(geometry, (i * cubeWidth), (j * cubeHeight), z, alpha, make);
            }
        }
    }

    makeArray();


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

    console.log(cubes[0]);

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


        plane.position.y = scroll.y;

        // controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();

    function requestRenderIfNotRequested() {
        if (!renderRequested) {
            renderRequested = true;
            requestAnimationFrame(render);
        }
    }

    //controls.addEventListener('change', requestRenderIfNotRequested);
    //window.addEventListener('resize', requestRenderIfNotRequested);
}

main();