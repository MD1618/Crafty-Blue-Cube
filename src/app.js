import * as THREE from 'three';
// console.log(THREE);
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    const fov = 60;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = -100;
    camera.position.x = -100;
    camera.position.y = 70;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.target.set(0, -10, 0);
    controls.update();

    // const gui = new GUI();

    const scene = new THREE.Scene();

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const lightDirectional = new THREE.DirectionalLight(color, intensity);
        lightDirectional.position.set(100, 0, -100);
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
        const intensity = 2;
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

    const boxWidth = 3;
    const boxHeight = 4;
    const boxDepth = 5;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // class ColorGUIHelper {
    //     constructor(object, prop) {
    //         this.object = object;
    //         this.prop = prop;
    //     }
    //     get value() {
    //         return `#${this.object[this.prop].getHexString()}`;
    //     }
    //     set value(hexString) {
    //         this.object[this.prop].set(hexString);
    //     }
    // }

    function makeInstance(geometry, color, x, y, z) {
        const material = new THREE.MeshPhongMaterial({
            color,
            transparent: true,
            opacity: 0.3,
            depthWrite: true,
            depthTest: true
        });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        // const folder = gui.addFolder(`Cube${x}-${y}`);
        // folder.addColor(new ColorGUIHelper(material, 'color'), 'value')
        //     .name('color')
        //     .onChange(requestRenderIfNotRequested);
        // folder.add(cube.scale, 'x', 3.2, 1.5)
        //     .name('scale x')
        //     .onChange(requestRenderIfNotRequested);
        // folder.add(cube.scale, 'y', .1, 1.5)
        //     .name('scale y')
        //     .onChange(requestRenderIfNotRequested);
        // folder.open();

        return cube;
    }

    function makeArray() {
        let squareEdge = 16;
        for (let i = -8; i < squareEdge / 2; i++) {
            for (let j = -8; j < squareEdge / 2; j++) {

                for (let k = -8; k < squareEdge / 2; k++) {
                    makeInstance(geometry, 0x334455, (i * boxWidth * 2), (j * boxHeight * 1.2), (k * boxDepth * 1.2));
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

    function render() {
        renderRequested = undefined;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        scene.rotation.y += 0.01;

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
    window.addEventListener('resize', requestRenderIfNotRequested);
}

main();