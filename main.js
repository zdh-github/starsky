const THREE = window.THREE || {};
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 100;

function generateRandomColor() {
    const chars = '0123456789ABCDEF';
    const hex = ['#'];
    for (let i = 0; i < 6; i += 1) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        hex.push(char);
    }
    return hex.join('');
}

function generateRandomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomX() {
    return generateRandomNumber(
        -width / 10,
        width / 10,
    );
}

function generateRandomY() {
    return generateRandomNumber(
        -height / 10,
        height / 10,
    );
}

const rainList = [];

function generateRain() {
    const x = generateRandomX();
    const y = generateRandomY();
    const max = Math.max(Math.abs(0 - x), Math.abs(0 - y));
    const geometry = new THREE.IcosahedronGeometry((100 - max) / 250, 2);
    const metaital = new THREE.MeshBasicMaterial({ color: generateRandomColor() });
    const mesh = new THREE.Mesh(geometry, metaital);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = -100;
    mesh.initX = x;
    mesh.initY = y;
    scene.add(mesh);
    rainList.push(mesh);
}

function render() {
    rainList.forEach((item, index) => {
        item.position.z += 1;
        if (item.position.z > 100) {
            scene.getObjectByProperty('uuid', item.uuid).geometry.dispose();
            scene.getObjectByProperty('uuid', item.uuid).material.dispose();
            scene.remove(scene.getObjectByProperty('uuid', item.uuid));
            rainList.splice(index, 1);
        }
    });
    renderer.render(scene, camera);
    controls.update();
    window.requestAnimationFrame(render);
    generateRain();
    generateRain();
}
render();
