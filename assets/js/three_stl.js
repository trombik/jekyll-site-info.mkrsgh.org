import * as THREE from 'https://unpkg.com/three@0.121.1/build/three.module.js'
import { STLLoader } from 'https://unpkg.com/three@0.121.1/examples/jsm/loaders/STLLoader.js'
import { OrbitControls } from 'https://unpkg.com/three@0.121.1/examples/jsm/controls/OrbitControls.js'

var Player = function() {
  var private_member, another_private_member
  var container
  var camera, cameraTarget, scene, renderer, control
  var canvas, boxSize
  var aspect = 4 / 3

  return {
    init: init,
    animate: animate,
  }

  function init(args) {
    /* create the container that holds the scene */
    container = document.createElement('div')

    /* append the container to the given canvas */
    canvas = document.getElementById(args.canvas_id)
    canvas.appendChild(container)

    /* create a scene */
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x292b2c)

    /* load the STL file from URL */
    var loader = new STLLoader()
    loader.load(args.url, function (geometry) {
      /* called when onLoad event */
      var material = new THREE.MeshPhongMaterial({ color: 0x0275d8, specular: 0x010101, shininess: 200})
      var mesh = new THREE.Mesh(geometry, material)

      mesh.rotation.set(0, 0, 0)
      mesh.scale.set(1, 1, 1)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.rotation.set( - Math.PI / 2, 0, 0 );
      mesh.geometry.center()

      /* create a bounding box of the object in the STL */
      var box = new THREE.Box3().setFromObject(mesh)
      boxSize = new THREE.Vector3()
      box.getSize(boxSize)

      mesh.position.set(0, boxSize.y / 2, 0)
      box = new THREE.Box3().setFromObject(mesh)

      /* create a ground */
      var plane_size;
      plane_size = Math.max(boxSize.x, boxSize.z) * 4
      var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(plane_size, plane_size),
        new THREE.MeshPhongMaterial({ color: 0x444444, specular: 0x505050 })
      )
      plane.rotation.x = -Math.PI / 2
      plane.position.y = 0
      plane.receiveShadow = true
      scene.add(plane)

      /* add a grid */
      var gridHelper = new THREE.GridHelper(plane_size, (plane_size / 10) - 1);
      scene.add(gridHelper)

      /* create a camera */
      camera = new THREE.PerspectiveCamera(35, aspect, 1, 10000)

      /* create the camera only when loading finishes because camera position
       * depends on the size of the object */
      var x = Math.max(boxSize.x, boxSize.z) * 3
      var y = x
      var z = x
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
    scene.add(new THREE.HemisphereLight(0x443333, 0x111122, 5))
    _addShadowedLight(0.5, 1, -1, 0xffaa00, 1)

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

    /* finally, add the domElement of WebGL to the container */
    container.appendChild(renderer.domElement)

    /* add a listener to resize the canvas when window is resized */
    window.addEventListener('resize', _onWindowResize, false)
  }

  function animate () {
    window.requestAnimationFrame(animate)
    _render()
  }

  function _render () {
    if (typeof camera !== 'undefined') {
      camera.lookAt(cameraTarget)
      renderer.render(scene, camera)
    }
  }

  function _doPrivateThings() {
  }

  function _addShadowedLight (x, y, z, color, intensity) {
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

  function _onWindowResize () {
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    control.update()
    renderer.setSize(canvas.offsetWidth, canvas.offsetWidth / aspect)
  }
}

export { Player }
// vim: shiftwidth=2 tabstop=2
