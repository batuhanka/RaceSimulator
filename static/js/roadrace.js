var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.01, 200 );
camera.position.set( 0, 8, 16 );
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x11ff33, 1 );	
var container = document.createElement( 'div' );
document.body.appendChild( container );
container.appendChild( renderer.domElement ); 
controls = new THREE.OrbitControls( camera, renderer.domElement );
var clock = new THREE.Clock( );
var light = new THREE.AmbientLight( 0xffffff ); 
scene.add( light );

var gridHelper = new THREE.GridHelper( 30, 30 );
scene.add( gridHelper );

var curvePoints =  [
 -6, 0, 10,
 -1, 0, 10,
  3, 0,  4,
  6, 0,  1,
 11, 0,  2,
 13, 0,  6,
  9, 1,  9,
  4, 1,  7,
  1, 1,  1,
  0, 1, -5,
  2, 0, -9,
  8, 0,-10,
 13, 0, -5,
 14, 1,  2,
 10, 3,  7,
  2, 1,  8,
 -4, 3,  7,
 -8, 1,  1,
 -9, 1, -4,
 -6, 1, -9,
  0, 1,-10,
  7, 1, -7,
  5, 2,  0,
  0, 2,  2,
 -5, 1,  0,
 -7, 2, -5,
 -8, 2, -9,
-11, 2, -10,
-14, 1, -7,
-13, 1, -2,
-14, 0,  3,
-11, 0, 10,
 -6, 0, 10
];
var lengthSegments = 1000;
var trackDistances = [ -0.31, -0.3, -0.01, 0.01, 0.3, 0.31 ];

var gRoad = new THREE.BufferGeometry( );
gRoad.createRoad = THREEg.createRoad;
gRoad.createRoad( curvePoints, lengthSegments, trackDistances );
//gRoad.createRoad( ); // all parameters default

tex = new THREE.TextureLoader().load( 'CentralMarking.png' );
tex.wrapS = THREE.RepeatWrapping;
//tex.wrapT = THREE.RepeatWrapping;
tex.repeat.set( lengthSegments * 2 );

var material = [
	
	new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide  } ),
	new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide  } ),
	new THREE.MeshBasicMaterial( { map: tex, side: THREE.DoubleSide } ),
	new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide} ),
	new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide} ),
	
];

var mesh = new THREE.Mesh( gRoad, material );
scene.add( mesh );

var h = 0.08;
var redCar = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 0.1, h * 1.9 , 0.3 ),
		new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, wireframe: true } )
	);	
scene.add( redCar );
var redCarIdx = 0;
var redCarX, redCarY, redCarZ;

var blueCar = new THREE.Mesh(
		new THREE.BoxBufferGeometry( 0.12, h * 1.9, 0.4 ),
		new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide, wireframe: true  } )
	);	
scene.add( blueCar );
var blueCarIdx = gRoad.points.length - 1;
var blueCarX, blueCarY, blueCarZ;

var gTngt = new THREE.BufferGeometry( ); // tangent
gTngt.positions = new Float32Array( 6 );
gTngt.addAttribute( 'position', new THREE.BufferAttribute( gTngt.positions, 3 ).setDynamic( true ) );
lineTngt = new THREE.Line( gTngt, new THREE.LineBasicMaterial( { color: 0x00ffff, side: THREE.DoubleSide } ) );
scene.add( lineTngt );

var gNorm = new THREE.BufferGeometry( ); // normal
gNorm.positions = new Float32Array( 6 );
gNorm.addAttribute( 'position', new THREE.BufferAttribute( gNorm.positions, 3 ).setDynamic( true ) );
lineNorm = new THREE.Line( gNorm, new THREE.LineBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } ) );
scene.add( lineNorm );

var gBino = new THREE.BufferGeometry( ); // binormal
gBino.positions = new Float32Array( 6 );
gBino.addAttribute( 'position', new THREE.BufferAttribute( gBino.positions, 3 ).setDynamic( true ) );
lineBino = new THREE.Line( gBino, new THREE.LineBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide } ) );
scene.add( lineBino );

var sysIdx = 8;

var t1 = 0;
var t2;

animate();

//............................

function animate( ) {
		
	t2 = clock.getElapsedTime ( ); 
	requestAnimationFrame( animate );	
	renderer.render( scene, camera );
	
	if ( t2 - t1 > 0.04 ) {
		
		redCarX = gRoad.points[ redCarIdx ].x + gRoad.n[ redCarIdx ].x * trackDistances[ 4 ] * 0.6; 
		redCarY = gRoad.points[ redCarIdx ].y + h;
		redCarZ = gRoad.points[ redCarIdx ].z + gRoad.n[ redCarIdx ].z * trackDistances[ 4 ] * 0.6;
		
		redCar.position.set( redCarX, redCarY, redCarZ );
		
		redCar.rotation.y = 1.57 + Math.atan2( -gRoad.t[ redCarIdx ].z, gRoad.t[ redCarIdx ].x );
		// other: take tangent, binormal for calculation
		
		redCarIdx ++;
		
		if ( redCarIdx === gRoad.points.length  ) redCarIdx = 0;
		
		blueCarX = gRoad.points[ blueCarIdx ].x + gRoad.n[ blueCarIdx ].x * trackDistances[ 1 ] * 0.6; 
		blueCarY = gRoad.points[ blueCarIdx ].y + h;
		blueCarZ = gRoad.points[ blueCarIdx ].z + gRoad.n[ blueCarIdx ].z * trackDistances[ 1 ] * 0.6;
		
		blueCar.position.set( blueCarX, blueCarY, blueCarZ );
		
		blueCar.rotation.y = 1.57 + Math.atan2( -gRoad.t[ blueCarIdx ].z, gRoad.t[ blueCarIdx ].x );
		// other: take tangent, binormal for calculation
		
		blueCarIdx --;
		
		if ( blueCarIdx === -1  ) blueCarIdx = gRoad.points.length - 1;
				
		gTngt.positions[ 0 ] = gRoad.points[ sysIdx ].x;  // tangent
		gTngt.positions[ 1 ] = gRoad.points[ sysIdx ].y;
		gTngt.positions[ 2 ] = gRoad.points[ sysIdx ].z;
		
		gTngt.positions[ 3 ] = gRoad.points[ sysIdx ].x + gRoad.t[ sysIdx ].x;
		gTngt.positions[ 4 ] = gRoad.points[ sysIdx ].y + gRoad.t[ sysIdx ].y;
		gTngt.positions[ 5 ] = gRoad.points[ sysIdx ].z + gRoad.t[ sysIdx ].z;
		
		gTngt.attributes.position.needsUpdate = true;		
				
		gNorm.positions[ 0 ] = gRoad.points[ sysIdx ].x; // normal
		gNorm.positions[ 1 ] = gRoad.points[ sysIdx ].y;
		gNorm.positions[ 2 ] = gRoad.points[ sysIdx ].z;
		
		gNorm.positions[ 3 ] = gRoad.points[ sysIdx ].x + gRoad.n[ sysIdx ].x;
		gNorm.positions[ 4 ] = gRoad.points[ sysIdx ].y + gRoad.n[ sysIdx ].y;
		gNorm.positions[ 5 ] = gRoad.points[ sysIdx ].z + gRoad.n[ sysIdx ].z;
		
		gNorm.attributes.position.needsUpdate = true;
		
		gBino.positions[ 0 ] = gRoad.points[ sysIdx ].x; // binormal
		gBino.positions[ 1 ] = gRoad.points[ sysIdx ].y;
		gBino.positions[ 2 ] = gRoad.points[ sysIdx ].z;
		
		gBino.positions[ 3 ] = gRoad.points[ sysIdx ].x + gRoad.b[ sysIdx ].x;
		gBino.positions[ 4 ] = gRoad.points[ sysIdx ].y + gRoad.b[ sysIdx ].y;
		gBino.positions[ 5 ] = gRoad.points[ sysIdx ].z + gRoad.b[ sysIdx ].z;
		
		gBino.attributes.position.needsUpdate = true;
			
		sysIdx ++;	
		if ( sysIdx === gRoad.points.length  ) sysIdx = 0
		
		t1 = t2;
		
	}
	
	controls.update();
		
}























// =================================
// BEE HORSE MOVING 
// ====================================================================


import * as THREE from "{% static 'three.js-master/build/three.module.js' %}";
import { OrbitControls } from "{% static 'three.js-master/examples/jsm/controls/OrbitControls.js' %}";
import { Flow } from "{% static 'three.js-master/examples/jsm/modifiers/CurveModifier.js' %}";
import { GLTFLoader } from "{% static 'three.js-master/examples/jsm/loaders/GLTFLoader.js'  %}";

const renderer = new THREE.WebGLRenderer( {antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( devicePixelRatio );
document.body.appendChild(renderer.domElement); 
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( -2.5, 2, 0 );
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x11aa11);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set( 0, 20, 15 );
scene.add( directionalLight );

new OrbitControls( camera, renderer.domElement );

let newPosition, tangent, radians; 
let fraction = 0;

let normal = new THREE.Vector3( 0, 1, 0 ); // up
let axis = new THREE.Vector3( );

const somePoints = [

	new THREE.Vector3(  1,   0, -1 ),
	new THREE.Vector3(  1, 0.6,  1 ),
	new THREE.Vector3( -1,   0,  1 ),
	new THREE.Vector3( -1, 0.2, -1 ),
	
];

const curve = new THREE.CatmullRomCurve3( somePoints );	
curve.closed = true;

const points = curve.getPoints( 60 );
const line = new THREE.LineLoop( new THREE.BufferGeometry( ).setFromPoints( points ), new THREE.LineBasicMaterial( { color: 0xffffaa } ) );
scene.add( line );

const material = new THREE.MeshNormalMaterial( { wireframe: true } );
const box = new THREE.BoxGeometry( 0.05, 0.4, 0.2 );
 
const char = new THREE.Mesh( box, material );
scene.add( char );

const modelBee = new THREE.Object3D( );

const loader = new GLTFLoader( ).load("{% static 'three.js-master/examples/models/gltf/Horse.glb' %}", processBee );

modelBee.scale.set( 0.005, 0.005, 0.005 ); // because gltf.scene is very big
modelBee.rotation.y = Math.PI / 2;
modelBee.rotation.z = -Math.PI / 2;
char.add( modelBee );
 
let direction = new THREE.Vector3( 0, 1, 0 );

animate();

function animate() {

	fraction += 0.001;
	
	if ( fraction > 1 ) {
	
		fraction = 0;
		//normal.set( 0, 1, 0 );
		
	}
	
	char.position.copy( curve.getPoint( fraction ) );
	 	
	tangent = curve.getTangent( fraction );
	axis.crossVectors( normal, tangent ).normalize( );

	//radians = Math.acos( normal.dot( tangent ) );	
	//char.quaternion.setFromAxisAngle( axis, radians );
	
	char.quaternion.setFromAxisAngle( axis, Math.PI / 2 );
	
	//normal.crossVectors( tangent, axis );
	
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
};

function processBee( gltf ) { // Kelli Ray  (CC-BY) Poly by Googl
	
	const box = new THREE.Box3( ).setFromObject( gltf.scene );
	const c = box.getCenter( new THREE.Vector3( ) );
	const size = box.getSize( new THREE.Vector3( ) );
	gltf.scene.position.set( -c.x, size.y / 2 - c.y, -c.z ); // center the gltf scene
	modelBee.add( gltf.scene );
	
}