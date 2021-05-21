import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';



function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const fov = 60;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = -120;
    camera.position.x = -120;
    camera.position.y = 70;

    const boxGap = 1.6;

    let cubes = [];

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.target.set(0, -10, 0);
    controls.update();

    const gui = new dat.GUI();

    const scene = new THREE.Scene();

    {
        const color = 0xaaaaFF;
        const intensity = 7;
        const lightDirectional = new THREE.PointLight(color, intensity, 1000);
        lightDirectional.position.set(-140, 180, -140);
        scene.add(lightDirectional);
    }

    {
        const color = 0xaa55FF;
        const intensity = 4;
        const light = new THREE.PointLight(color, intensity, 100);
        light.position.set(10, 15, 14);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light2 = new THREE.PointLight(color, intensity, 100);
        light2.position.set(-5, 5, 4);
        scene.add(light2);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light3 = new THREE.PointLight(color, intensity, 100);
        light3.position.set(11, 5, -8);
        scene.add(light3);
    }


    {
        const color = 0xFFFFFF;
        const intensity = 4;
        const light5 = new THREE.PointLight(color, intensity, 100);
        light5.position.set(60, 80, 50);
        scene.add(light5);
    }

    const PointLight4 = new THREE.PointLight(0x00ee00, 1, 100);
    PointLight4.position.set(4, -2, 10);
    scene.add(PointLight4);

    const boxWidth = 4;
    const boxHeight = 4;
    const boxDepth = 4;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    class ColorGUIHelper {
        constructor(object, prop) {
            this.object = object;
            this.prop = prop;
        }
        get value() {
            return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
            this.object[this.prop].set(hexString);
        }
    }

    const material = new THREE.MeshPhongMaterial({
        color: 0x334455,
        transparent: true,
        opacity: 0.2,
        depthWrite: true,
        depthTest: true
    });

    function makeInstance(geometry, x, y, z) {

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        cubes.push(cube);



        return cube;
    }

    const folder = gui.addFolder(`Cubes`);
    folder.addColor(new ColorGUIHelper(material, 'color'), 'value')
        .name('color')
        // .onChange(requestRenderIfNotRequested);
        // folder.add(cube.scale, 'x', 3.2, 1.5)
        //     .name('scale x')
        //     .onChange(requestRenderIfNotRequested);
        // folder.add(cube.scale, 'y', .1, 1.5)
        //     .name('scale y')
        //     .onChange(requestRenderIfNotRequested);
    folder.open();

    function makeArray() {
        let squareEdge = 16;
        for (let i = -8; i < squareEdge / 2; i++) {
            for (let j = -8; j < squareEdge / 2; j++) {
                for (let k = -8; k < squareEdge / 2; k++) {
                    makeInstance(geometry, (i * boxWidth * boxGap), (j * boxHeight * boxGap), (k * boxDepth * boxGap));
                }
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

        scene.rotation.y += 0.001;

        for (let index = 0; index < cubes.length; index++) {
            cubes[index].rotation.z += 0.01;
            cubes[index].rotation.y += 0.01;
            cubes[index].rotation.x += 0.01;
            //cubes[index].material.opacity = Math.sin(1 * index);

        }


        controls.update();
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