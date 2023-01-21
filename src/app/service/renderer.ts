import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';

/*
import { Sea } from './sea';
import { Sky } from './sky';
import { Terrain } from './terrain';
import * as TILES from './tiles/import'
*/
export class Renderer {
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
	private controls!: MapControls;
	private timestamp!: number;
/*
	private sky: Sky;
	private terrain: Terrain;
*/
    private ms_Cube!: THREE.Mesh;
	//private ms_Points: THREE.Points;
	//private ms_object: any;

//	private tilelayer: TILES.TileLayer;

	constructor() {
		this.init();
	}

	private init() {
		this.createRenderer();
		this.createCamera();
		this.createControls();
		this.createScene();
		this.createLight();

		this.timestamp = 0;
	}

	private createRenderer() {
		this.renderer = new THREE.WebGLRenderer({ alpha: true /* transparency to show the background */, antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.setPixelRatio(window.devicePixelRatio);
	}

	private createCamera() {
		this.camera = new THREE.PerspectiveCamera( 55.0, 1, 0.01, 2000000 );
		this.camera.position.set( 0, 100, 100 );
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	}

	private createControls() {
		this.controls = new MapControls( this.camera, this.renderer.domElement );
		this.controls.target.set( 0, 0, 0 );
		this.controls.minDistance = 20;
		this.controls.maxDistance = 10000.0;
		this.controls.minPolarAngle = 0;
		this.controls.maxPolarAngle = Math.PI * 0.48;
	}

	private createLight() {
		let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
		let ambientLight = new THREE.AmbientLight(0xdc8874, .5);
		let shadowLight = new THREE.DirectionalLight(0xffffff, .9); //THREE.DirectionalLight( 0xffff55, 1 );
		shadowLight.position.set(150, 350, 350);
		shadowLight.castShadow = true;
		shadowLight.shadow.camera.left = -400;
		shadowLight.shadow.camera.right = 400;
		shadowLight.shadow.camera.top = 400;
		shadowLight.shadow.camera.bottom = -400;
		shadowLight.shadow.camera.near = 1;
		shadowLight.shadow.camera.far = 1000;
		shadowLight.shadow.mapSize.width = 4096;
		shadowLight.shadow.mapSize.height = 4096;

		let ch = new THREE.CameraHelper(shadowLight.shadow.camera);

		this.scene.add(ch);
		this.scene.add(hemisphereLight);
		this.scene.add(shadowLight);
		this.scene.add(ambientLight);
	}

	private createScene() {
		this.scene = new THREE.Scene();
		// Helper
		this.scene.add( new THREE.GridHelper(100, 5) );
		this.scene.add( new THREE.AxesHelper(100) );

		// Objects
		let geometry, material;

		geometry = new THREE.BoxGeometry( 10, 10, 10 );
		material = new THREE.MeshLambertMaterial( { color: 0x404040, wireframe: false } );
		this.ms_Cube = new THREE.Mesh( geometry, material );
		this.ms_Cube.position.set( 0, 20, 0 );
		this.ms_Cube.rotation.set( 0, 0, 0 );
		this.ms_Cube.castShadow = true;
		this.scene.add( this.ms_Cube );	

		//this.terrain = new Terrain(1024, 1024);
		//this.scene.add(this.terrain.Mesh);

		//this.createSea();

		//this.sky = new Sky();
		//this.scene.add(this.sky.Mesh);

		//this.tilelayer = new TILES.TileLayer('assets/example/tileset.json')
	};

	private createSea() {
		/*
		let sea = new Sea(128, 128);
		sea.mesh.position.y = -600;
		this.scene.add(sea.mesh);

		this.ms_object = sea;
		*/
	}

    private update(deltatime: number) {
		//this.ms_object.MoveWaves(10);

		this.controls.update();
		this.ms_Cube.rotation.x += 0.01;
		this.ms_Cube.rotation.y += 0.02;

		/*
		if (this.ms_Points) {
			this.ms_Points.rotation.x += 0.01;
			this.ms_Points.rotation.y += 0.02;		
		}

		this.sky.update(deltatime);
		*/
	}

    private render() {
        this.renderer.render(this.scene, this.camera);
    }

    public SetContainer(container: HTMLElement) {
		this.Resize( container.offsetWidth, container.offsetHeight );
        container.appendChild(this.renderer.domElement);
    }

    public Resize(inWidth: number, inHeight: number) {
		this.camera.aspect =  inWidth / inHeight;
		this.camera.updateProjectionMatrix();

        this.renderer.setSize( inWidth, inHeight );
    }

    public MainLoop(timestamp: number) {
    	if (!this.timestamp) this.timestamp = timestamp;
    	let deltatime = timestamp - this.timestamp;
    	this.timestamp = timestamp;

        this.update(deltatime);
        this.render();

        window.requestAnimationFrame(_ => this.MainLoop(_));
    }

    public addStars(starsCount: number) {
    	/*
        const stars = new THREE.Geometry();
        const starMaterial = new THREE.PointsMaterial({color: 0x0f0f0f});

        for (let i = 0; i < starsCount; i++) {
            let x = Math.random() * 2000 - 1000;
            let y = Math.random() * 2000 - 1000;
            let z = Math.random() * 2000 - 1000;

            let star = new THREE.Vector3(x, y, z);

            stars.vertices.push(star);
        }

		let pointCloud = new THREE.Points(stars, starMaterial);
		this.ms_Points= pointCloud;
		this.scene.add(pointCloud);
		*/
    }    
};