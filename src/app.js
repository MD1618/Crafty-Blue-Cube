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
    //renderer.toneMapping = THREE.ReinhardToneMapping;

    let mouseCoords = {
        x: 0,
        y: 0
    }

    const width = canvas.clientWidth;
    const sectionWrapperHeight = document.querySelector(".section-wrapper");
    const height = sectionWrapperHeight.clientHeight;
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
        sceneY: 0,
        sceneX: 0
    };




    // gsap.to(perspectiveObj, {
    //     cameraZ: 3000,
    //     sceneY: 0.7,

    //     scrollTrigger: {
    //         trigger: ".section-cta",
    //         start: `50% 50%`,
    //         end: "300%",
    //         scrub: 1,
    //         pin: true
    //             //ease: 'Linear'

    //     },
    //     // ease: "Linear",
    //     //duration: 2
    // })


    gsap.to(".headings", {
        opacity: 0,
        ease: 'linear',
        scrollTrigger: {
            trigger: ".headings",
            start: `top 0%`,
            end: "+=40%",
            scrub: 0,
        },
    })

    // gsap.to(".heading-one", {
    //     opacity: 0,
    //     scrollTrigger: {
    //         start: `top 0%`,
    //         end: "bottom 60%",
    //         scrub: 1,
    //     },
    // })

    // gsap.to(".heading-two", {
    //     opacity: 0,
    //     scrollTrigger: {
    //         start: `top 0%`,
    //         end: "bottom 60%",
    //         scrub: 1,

    //     },
    // })

    gsap.from(".section-logos img", {
        opacity: 0,
        y: "+=200",
        scrollTrigger: {
            trigger: ".section-logos",
            start: `60% 50%`,
            end: "300%",
            scrub: 1,
            pin: true
                //ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 2
    })

    gsap.from(".features", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".features",
            start: `top 80%`,
            end: "50% 50%",
            scrub: 1,
            //pin: true
            //ease: 'Linear'

        },
        //duration: 2
    })

    gsap.to(".feature-left", {
        opacity: 0,
        x: "-=250",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".features",
            start: `10% 0%`,
            end: "bottom 0%",
            scrub: 1,
            //pin: true
            //ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 2

    })

    gsap.to(".feature-right", {
        opacity: 0,
        x: "+=250",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".features",
            start: `10% 0%`,
            end: "bottom 0%",
            scrub: 1,
            //pin: true
            //ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 2
    })

    gsap.from(".testimonial-blockquote", {
        opacity: 0,
        x: "+=100",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".testimonial",
            start: `top bottom`,
            end: "50% 50%",
            scrub: 1.3,
            //pin: true
            //ease: 'Linear'

        },
        // ease: "Linear",
        //duration: 2
    })

    let pinCta = gsap.timeline();
    pinCta.to(perspectiveObj, {
        cameraZ: 4000,
        sceneY: 0.7,
        sceneX: 240,
        duration: 0.8,
        ease: 'power3.inOut'
    }, 0.5);
    pinCta.from('.section-cta-item', {
        scale: 0.4,
        opacity: 0,
        stagger: 0.1,
        duration: 0.2

    }, 0);
    pinCta.from('.section-cta-button', {
        y: '+=100',
        opacity: 0,
        stagger: 0.1,
        duration: 0.2

    }, 0.9);
    pinCta.to('.canvas-main', {
        opacity: 0,
        duration: 0.5

    }, 0.8);

    pinCta.to('.section-cta-heading', {
        color: '#fff',
        duration: 0.5

    }, 0.7);

    pinCta.to('.section-cta-text', {
        color: '#fff',
        duration: 0.5

    }, 0.7);


    ScrollTrigger.create({
        trigger: ".section-cta",
        start: `50% 50%`,
        end: "500%",
        scrub: 1,
        pin: true,
        animation: pinCta
    });







    const color = 0xffffFF;
    const intensity = 1.4;
    const ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.position.set(100, 100, 400);

    scene.add(ambientLight);


    const color3 = 0xffffFF;
    const intensity3 = 0.8;
    const light3 = new THREE.PointLight(color3, intensity3, 10000);
    light3.position.set(550, 0, 90);
    light3.castShadow = true;
    //Set up shadow properties for the light
    light3.shadow.mapSize.width = 1024;
    light3.shadow.mapSize.height = 1024;
    // light3.shadow.camera.near = 0.1;
    // light3.shadow.camera.far = 5000;
    // light3.shadow.bias = 0;
    scene.add(light3);

    const color2 = 0xffffFF;
    const intensity2 = 0.7;
    const light2 = new THREE.PointLight(color2, intensity2, 3000);
    light2.position.set(550, 500, 190);
    // light2.castShadow = true;
    //Set up shadow properties for the light
    // light2.shadow.mapSize.width = 1024;
    // light2.shadow.mapSize.height = 1024;
    // light2.shadow.camera.near = 0.1;
    // light2.shadow.camera.far = 5000;
    // light2.shadow.bias = 0;
    scene.add(light2);




    // onmousemove = function(e) {
    //     light2.position.set(e.clientX - width / 2, ((e.clientY - height / 2) * -1), 160);
    // }

    // onmousedown = function(e) {
    //     gsap.to(light2, { intensity: 0.7, duration: 0.4, ease: 'Power1.easeInOut' });

    // }

    // onmouseup = function(e) {
    //     gsap.to(light2, { intensity: baseIntensity2, duration: 0.4, ease: 'Power1.easeInOut' });
    //     //light2.intensity = 0.4;
    // }

    const planeHeight = height * 5;
    const scrollHeight = height;



    const geometryPlane = new THREE.PlaneGeometry(width, planeHeight, 10, 10);
    const materialPlane = new THREE.MeshPhongMaterial({
        color: 0x457b9d,
        //emissive: 0x100007,
        shininess: 0.2,
        //transparent: true,
        // opacity: 0.8,

        // depthWrite: true,
        // depthTest: true,

        //normalMap: normalMap,


    });
    // materialPlane.map.minFilter = THREE.LinearFilter;

    const plane = new THREE.Mesh(geometryPlane, materialPlane);
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


    const boxDepth = 100;
    //const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const geometry = new THREE.BoxGeometry(200, 200, boxDepth, 10, 10, 10);

    const material = new THREE.MeshPhongMaterial({
        color: 0x558bad,
        //emissive: 0x100007,
        shininess: 0.8,

        depthWrite: true,
        depthTest: true,

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


        cube.rotation.x = cubeRotation.x;
        cube.rotation.y = cubeRotation.y;
        cube.rotation.z = cubeRotation.z;

        plane.position.y = scroll.y;
        light3.position.y = scroll.y - 900;

        camera.position.z = perspectiveObj.cameraZ;
        scene.rotation.y = perspectiveObj.sceneY;
        scene.position.x = perspectiveObj.sceneX;

        // controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();


}

main();