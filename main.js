import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// Create A Scene and add camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000)

const renderer = new THREE.WebGL1Renderer({
    canvas:document.querySelector('#threedcanvas')
})


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)



// New Object and add it to scene
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347})
const torus = new THREE.Mesh(geometry,material)
scene.add(torus)


// LIghts
const pointlight = new THREE.PointLight(0xffff00)
pointlight.position.set(25,25,5)

const ambientlight = new THREE.AmbientLight(0xffffff)

scene.add(pointlight, ambientlight)


// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)




function addstar(){
    const geometry = new THREE.SphereGeometry(.25)
    const material = new THREE.MeshStandardMaterial({color:0xffffff})
    const star = new THREE.Mesh(geometry,material)

    const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z)
    scene.add(star)
}

Array(200).fill().forEach(addstar)



// Background
const backgroundtexture = new THREE.TextureLoader().load('assests/images/sky-2.jpg')
scene.background = backgroundtexture;

// Continous Frame
function animate(){
    requestAnimationFrame(animate)

    torus.rotation.x += 0.04;
    torus.rotation.y += 0.05;
    torus.rotation.z += 0.01;

    controls.update()

    renderer.render(scene, camera)
}
animate()