import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'
import { STLLoader } from 'https://unpkg.com/three@0.121.1/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js'

var container
var camera, cameraTarget, scene, renderer, control
var canvas, boxSize
var aspect = 4 / 3

function init (args) {
  /* create the container that holds the scene */
  container = document.createElement('div')

  /* append the container to the given canvas */
  canvas = document.getElementById(args.canvas_id)
  canvas.appendChild(container)

  /* create a scene */
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x72645b)
  // scene.fog = new THREE.Fog(0x72645b, 2, 15)

  /* create a ground */
  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(40, 40),
    new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
  )
  plane.rotation.x = -Math.PI / 2
  plane.position.y = -0.5
  scene.add(plane)
  plane.receiveShadow = true

  /* load the STL file from URL */
  var loader = new STLLoader()
  loader.load(args.url, function (geometry) {
    /* called when onLoad event */
    var material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 })
    var mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(0, 0, 0)
    mesh.rotation.set(0, -Math.PI / 2, 0)
    mesh.scale.set(1, 1, 1)
    mesh.castShadow = true
    mesh.receiveShadow = true

    /* create a bounding box of the object in the STL */
    var box = new THREE.Box3().setFromObject(mesh)
    boxSize = new THREE.Vector3()
    box.getSize(boxSize)

    console.log(boxSize)

    /* create a camera */
    camera = new THREE.PerspectiveCamera(35, aspect, 1, 10000)

    /* create the camera only when loading finishes because camera position
     * depends on the size of the object */
    var x = 1
    var y = boxSize.y
    var z = boxSize.z * 2
    camera.position.set(x, y, z)
    cameraTarget = new THREE.Vector3(0, 0, 0)

    /* create orbit controls */
    control = new OrbitControls(camera, renderer.domElement)

    scene.add(mesh)
  }, undefined, function (err) {
    /* called when onError event */
    console.error(err)
  })

  /* create lights */
  scene.add(new THREE.HemisphereLight(0x443333, 0x111122))
  addShadowedLight(1, 1, 1, 0xffffff, 1.35)
  addShadowedLight(0.5, 1, -1, 0xffaa00, 1)

  /* create a renderer */
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)

  /* calculate the height from width of canvas.
     *
     * when initially loaded, canvas is empty. it has width, but height is
     * zero.
     */
  renderer.setSize(canvas.offsetWidth, canvas.offsetWidth / aspect)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.shadowMap.enabled = true

  /* add a grid */
  var gridHelper = new THREE.GridHelper()
  gridHelper.position.y = -0.5
  scene.add(gridHelper)

  /* finally, add the domElement of WebGL to the container */
  container.appendChild(renderer.domElement)

  /* add a listener to resize the canvas when window is resized */
  window.addEventListener('resize', onWindowResize, false)
}

function addShadowedLight (x, y, z, color, intensity) {
  var directionalLight = new THREE.DirectionalLight(color, intensity)
  directionalLight.position.set(x, y, z)
  scene.add(directionalLight)
  directionalLight.castShadow = true

  var d = 1
  directionalLight.shadow.camera.left = -d
  directionalLight.shadow.camera.right = d
  directionalLight.shadow.camera.top = d
  directionalLight.shadow.camera.bottom = -d

  directionalLight.shadow.camera.near = 1
  directionalLight.shadow.camera.far = 4

  directionalLight.shadow.bias = -0.002
}

function onWindowResize () {
  camera.aspect = aspect
  camera.updateProjectionMatrix()
  control.update()
  renderer.setSize(canvas.offsetWidth, canvas.offsetWidth / aspect)
}

function animate () {
  window.requestAnimationFrame(animate)
  render()
}

function render () {
  if (typeof camera !== 'undefined') {
    camera.lookAt(cameraTarget)
    renderer.render(scene, camera)
  }
}

export { init, animate }
// vim: shiftwidth=2 tabstop=2
