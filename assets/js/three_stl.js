import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'
import { STLLoader } from 'https://unpkg.com/three@0.121.1/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js'

var Player = function () {
  var container
  var camera, scene, renderer, control
  var aspect = 4 / 3

  return {
    init: init,
    animate: animate
  }

  function _loadSTL (url) {
    var loader = new STLLoader()
    return loader.loadAsync(url)
  }

  function _createMaterial () {
    return new Promise(function (resolve, reject) {
      var material = new THREE.MeshPhongMaterial({ color: 0x0275d8, specular: 0x010101, shininess: 200 })
      resolve(material)
    })
  }

  function _createMesh (url) {
    var promises = [
      _loadSTL(url),
      _createMaterial()
    ]
    return Promise.all(promises).then((result) => {
      var geometry = result[0]
      var material = result[1]
      var mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.set(0, 0, 0)
      mesh.scale.set(1, 1, 1)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.rotation.set(-Math.PI / 2, 0, 0)
      mesh.geometry.center()
      return mesh
    })
  }

  function _getBindingBoxSize (mesh) {
    const box = new THREE.Box3().setFromObject(mesh)
    var boxSize = new THREE.Vector3()
    box.getSize(boxSize)
    return boxSize
  }

  // create the container that holds the scene in `document`
  function _createContainer (id) {
    return new Promise(function (resolve, reject) {
      var container = document.getElementById(id)
      container.appendChild(document.createElement('div'))
      resolve(container)
    })
  }

  function _createGround (boxSize) {
    const vector = boxSize
    const groundSize = Math.max(vector.x, vector.z) * 4
    var ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(groundSize, groundSize),
      new THREE.MeshPhongMaterial({ color: 0x444444, specular: 0x505050 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = 0
    ground.receiveShadow = true
    return ground
  }

  // add a grid that fits to the given ground
  function _createGrid (boxSize) {
    var size = Math.max(boxSize.x, boxSize.z) * 4
    return new THREE.GridHelper(size, size / 10)
  }

  /* create orbit controls */
  function _createControl (camera, renderer) {
    return new OrbitControls(camera, renderer.domElement)
  }
  // create a camera that locates at same distance and angle from the object
  function _createCamera (boxSize) {
    var aspect = 4 / 3
    var camera = new THREE.PerspectiveCamera(35, aspect, 1, 1000)

    // depends on the size of the object
    var max = Math.max(boxSize.x, boxSize.z)
    var x = max * 2
    var y = max * 3
    var z = max * 2
    camera.position.set(x, y, z)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    return camera
  }
  // create light
  function _createLights () {
    return new THREE.HemisphereLight(0x443333, 0x111122, 5)
  }

  function _createDirectionalLight () {
    var spotLight = new THREE.DirectionalLight(0xffffff, 0.2)
    spotLight.castShadow = true
    spotLight.position.set( 2000, 1000, 200 );
    return spotLight
  }

  // create an WebGL renderer
  function _createRenderer () {
    return new THREE.WebGLRenderer({ antialias: true })
  }

  function _createScene (url) {
    return new Promise(function (resolve, reject) {
      _createMesh(url).then(function (mesh) {
        var size = _getBindingBoxSize(mesh)
        mesh.position.y += size.y / 2
        var ground = _createGround(size)
        mesh.castShadow = false
        var grid = _createGrid(size)
        camera = _createCamera(size)
        var light = _createLights()
        var spotLight = _createDirectionalLight()
        renderer = _createRenderer()
        renderer.shadowMap.enabled = true
        control = _createControl(camera, renderer)
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x292b2c)
        scene.add(ground)
        scene.add(grid)
        scene.add(camera)
        scene.add(light)
        scene.add(spotLight)
        scene.add(mesh)
        resolve(scene)
      })
    })
  }

  function _init (args) {
    var id = args.canvas_id
    var url = args.url
    var promises = [
      _createContainer(id),
      _createScene(url)
    ]
    return Promise.all(promises).then((result) => {
      container = result[0]
      scene = result[1]

      /* calculate the height from width of container.
         *
         * when initially loaded, container is empty. it has width, but height is
         * zero.
         */
      renderer.setSize(container.offsetWidth, container.offsetWidth / aspect)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.outputEncoding = THREE.sRGBEncoding
      renderer.shadowMap.enabled = true

      /* finally, add the domElement of WebGL to the container */
      container.appendChild(renderer.domElement)

      /* add a listener to resize the container when window is resized */
      window.addEventListener('resize', _updateSceneOnWindowResize, false)
    })
  }

  function _updateSceneOnWindowResize () {
    camera.updateProjectionMatrix()
    control.update()
    renderer.setSize(container.offsetWidth, container.offsetWidth / aspect)
  }

  function init (args) {
    const promises = [
      _init(args)
    ]
    return Promise.all(promises).then(result => {
      return console.log('initialized')
    })
  }

  function animate () {
    window.requestAnimationFrame(animate)
    if (typeof (camera) !== 'undefined' && typeof (scene) !== 'undefined' && typeof (renderer) !== 'undefined') {
      camera.lookAt(new THREE.Vector3(0, 0, 0))
      renderer.render(scene, camera)
    }
  }
}

export { Player }

// vim: shiftwidth=2 tabstop=2
