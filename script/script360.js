var isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 0, onMouseDownLon = 0,
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;
btnScene="";
booClick=true;
booBtn=false;
var btnPrev;
var sphereScene;
var isUsrIntrtg = false,isUsrMvg=false, mousex=0, mousey=0,  projector;
var group
var sizeButton=2;
 var textureObject;
var raycaster; // create once
var mouse; // create once
var plane1, plane2,plane3,plane4,plane5,plane6,plane7,plane8,planemenu,point1,point2;
// Define the standard global variables
var container, scene, camera, renderer;
var listener;
var sound, sound1, sound2,sound3,sound4,sound5,sound6, sound7, sound8;
var soundPrev = sound1; 
var soundActual=sound1;
var texturePoint;
var clock = new THREE.Clock();
var video;
var booSound=true;
var booScene=true;
var  control;
var t=new TimelineMax();
var booMenu=true;
var needsResize = true;
var btActualMenu;
var btActualSala;
preloader.style.display = 'none';


var startButton = document.getElementById( 'startButton' );
    startButton.addEventListener( 'click', function () {
        preloader.style.display = 'block';
        init();
        animate(); 
    });

function PlaySound() {
          var sound = document.getElementById("audio");
          sound.play()
      }

////////////////  botoneria  menu ////

var btMenu= document.getElementById( 'btMenu' );  
btMenu.style.display = 'none';

var bts= document.getElementById( 'menu' );  
var btsmenusala= document.getElementById( 'menusala' );  
var btsala1= document.getElementById( 'btsala1' );  
var btsala2= document.getElementById( 'btsala2' );  
var btsala3= document.getElementById( 'btsala3' );  
var btsala4= document.getElementById( 'btsala4' );  

var bt1= document.getElementById( 'bt1' );  
var bt2= document.getElementById( 'bt2' );  
var bt3= document.getElementById( 'bt3' );  
var bt4= document.getElementById( 'bt4' );  
var bt5= document.getElementById( 'bt5' );  

btActualMenu=bt1;
btActualSala=btsala1;

btsala1.style.opacity='0.3';
btActualMenu.style.opacity='0.6';


function muestra_oculta(id){ 
    PlaySound();
    /*
  if (document.getElementById){ //se obtiene el id
      var el = document.getElementById(id); 
      el.style.display = (el.style.display == 'none') ? 'block' : 'none'; 
  }
   */
   bts.style.display = 'block'; 
   btMenu.style.pointerEvents = 'none';
  if(booMenu){ 
      //abre  
       if((btnScene=='btn5') || (btnScene=='btn6') ||  (btnScene=='btn7') ||  (btnScene=='btn8') ||  (btnScene=='btn9')  ){
                btsmenusala.style.display = 'none';
            }
      
        booMenu=false;
        t.to(menu, 0.5, { alpha:1,  onComplete:endAnimeMenu,  onCompleteParams:[id], ease: Power2.easeInOut})
       .play()
   }else  { 
       //cierra
             
       if((btnScene=='btn5') || (btnScene=='btn6') ||  (btnScene=='btn7') ||  (btnScene=='btn8') ||  (btnScene=='btn9')  ){
                btsmenusala.style.display = 'block';
            }

       booMenu=true;
       t.to(menu, 0.5, { alpha:0, onComplete:endAnimeMenu,  onCompleteParams:[id], ease: Power2.easeInOut})
       .play()

   }
    
}

function endAnimeMenu(btmenu) {    
  
    btMenu.style.pointerEvents = 'auto';
   console.log("fin") 
    if(booMenu){      
         //bts.style.display ='none';
         bts.style.pointerEvents = 'none';
    }else{
       
        //bts.style.display = 'block'  ; 
         bts.style.pointerEvents = 'auto';
    } 
    
}

////////////////////

function init() {

    
  var d = document.getElementById ("play");
  if (d) {d.parentNode.removeChild (d); }     
    
  // Scene
  scene = new THREE.Scene();
  group = new THREE.Group();

  // Camera
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var viewAngle = 75;
  var nearDistance = 0.1;
  var farDistance = 1000;
        
  camera = new THREE.PerspectiveCamera(viewAngle, screenWidth / screenHeight, nearDistance, farDistance);
  scene.add(camera);
  camera.position.set(0, 0, 7);
  camera.lookAt(scene.position);
  
  raycaster = new THREE.Raycaster(); // create once
  mouse = new THREE.Vector2(); // create once
    
  document.addEventListener( 'mouseup', onDctMseUp, false );   
  window.addEventListener( 'resize', onWindowResize, false );
  

    
  window.addEventListener("orientationchange", onWindowResize, false );    
  //EventBus.addEventListener("callback_event", callback);
  EventBus.addEventListener("custom_event", clickTouch);
 
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
   renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(screenWidth, screenHeight, false);
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);

 /////// manager carga de imagenes
    
  loadManager3 = new THREE.LoadingManager();
  loaderTexture = new THREE.TextureLoader(loadManager3);
   
      // loader manager
  loadManager3.onProgress = function(url, itemsLoaded, itemsTotal) {
    //console.log('loading texture ' + url + ' ' + (itemsLoaded / itemsTotal * 100) + '%');
  };
    
  loadManager3.onError = function(url) {
    console.log('Error loading texture: ' + url);
  };

   
  //////////// //audio fondo    
    var listeneraudio = new THREE.AudioListener();
    //camera.add( listeneraudio ); 
    
    //sound = new THREE.Audio( listeneraudio ); 
    sound = new THREE.PositionalAudio( listeneraudio );
    var audioLoader = new THREE.AudioLoader();    
    
    audioLoader.load( 'audio/daydream_bliss.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setRefDistance( 20 );
        sound.setLoop( true );
        sound.setVolume( 0.3 );
        sound.play();
    });   
  
  var source = listeneraudio.context.createBufferSource();
  source.connect(listeneraudio.context.destination);
  source.start();


    //////////////////// carga de texturas
    
    
  textureObject = [  
   //new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg', onLoadScene ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_1.jpg' ),
   new THREE.TextureLoader(loadManager3).load( 'img/s_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_3.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_4.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s_5.jpg'), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_1.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_2.jpg' ), 
   new THREE.TextureLoader(loadManager3).load( 'img/s5_3.jpg' )  

  ];
    
   
  //loadManager3.onLoad = (buffer) => {  
  loadManager3.onLoad = function() {  
    
    btMenu.style.display = 'block';
    console.log("cargo textura")       
    materialsObject = [
      new THREE.MeshBasicMaterial({map: textureObject[0]}),
      new THREE.MeshBasicMaterial({map: textureObject[1]}),
      new THREE.MeshBasicMaterial({map: textureObject[2]}),
      new THREE.MeshBasicMaterial({map: textureObject[3]}),
      new THREE.MeshBasicMaterial({map: textureObject[4]}),
      new THREE.MeshBasicMaterial({map: textureObject[5]}),
      new THREE.MeshBasicMaterial({map: textureObject[6]}),
      new THREE.MeshBasicMaterial({map: textureObject[7]}),  
    ];
     
      onWindowResize();     
      preloader.style.display = 'none';
    
      
      
      
    //// esfera para los escenarios /////  
    var geometrySphere = new THREE.SphereGeometry( 500, 60, 40 );
    geometrySphere.scale( - 1, 1, 1 );      
   /* var materialSphere = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'img/s_1_opt.jpg' )       
    } );  
    */            
    //sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphereScene = new THREE.Mesh( geometrySphere, materialsObject [0]);       
    sphereScene.position.x = 0;
    sphereScene.position.y = 0;
    sphereScene.position.z = 0;    
    sphereScene.rotation.y = (0.5 * Math.PI);
    sphereScene.name='sphereScene';
      sphereScene.scale.set(0.1,0.1,0.1)    
    scene.add( sphereScene );
    
        
    /////////  audio robot 1
    var listAudioRobot1 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound1 = new THREE.PositionalAudio( listAudioRobot1 );    
    var audioLoader1 = new THREE.AudioLoader(); 
      
    audioLoader1.load( 'audio/robot1.mp3', function( buffer ) {
        sound1.setBuffer( buffer );
         sound1.setRefDistance( 20 );
        //sound1.setLoop( true );
        sound1.setVolume( 1 );
        soundActual=sound1;
          setTimeout(playSound, 1500);
       
    });
  
    var source1 = listAudioRobot1.context.createBufferSource();
    source1.connect(listAudioRobot1.context.destination);
    source1.start(); 
      
        
    /////////  audio robot 2
    var listAudioRobot2 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound2= new THREE.PositionalAudio( listAudioRobot2 );    
    var audioLoader2 = new THREE.AudioLoader(); 
      
    audioLoader2.load( 'audio/robot2.mp3', function( buffer ) {
        sound2.setBuffer( buffer );
         sound2.setRefDistance( 20 );        
        sound2.setVolume( 1 );       
    });
  
    var source2 = listAudioRobot2.context.createBufferSource();
    source2.connect(listAudioRobot2.context.destination);
    source2.start();  
      
    /////////  audio robot 3
    var listAudioRobot3 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound3= new THREE.PositionalAudio( listAudioRobot3 );    
    var audioLoader3 = new THREE.AudioLoader(); 
      
    audioLoader3.load( 'audio/robot3.mp3', function( buffer ) {
        sound3.setBuffer( buffer );
         sound3.setRefDistance( 20 );        
        sound3.setVolume( 1 );       
    });
  
    var source3 = listAudioRobot3.context.createBufferSource();
    source3.connect(listAudioRobot3.context.destination);
    source3.start();   
      
    /////////  audio robot 4
    var listAudioRobot4 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound4= new THREE.PositionalAudio( listAudioRobot4 );    
    var audioLoader4 = new THREE.AudioLoader(); 
      
    audioLoader4.load( 'audio/robot4.mp3', function( buffer ) {
        sound4.setBuffer( buffer );
         sound4.setRefDistance( 20 );        
        sound4.setVolume( 1 );       
    });
  
    var source4 = listAudioRobot4.context.createBufferSource();
    source4.connect(listAudioRobot4.context.destination);
    source4.start();   
     
    
    /////////  audio robot 3
    var listAudioRobot5 = new THREE.AudioListener();
    //camera.add( listAudioRobot1 ); 
    sound5= new THREE.PositionalAudio( listAudioRobot5 );    
    var audioLoader5 = new THREE.AudioLoader(); 
      
    audioLoader5.load( 'audio/robot5.mp3', function( buffer ) {
        sound5.setBuffer( buffer );
         sound5.setRefDistance( 20 );        
        sound5.setVolume( 1 );       
    });
  
    var source5 = listAudioRobot5.context.createBufferSource();
    source5.connect(listAudioRobot5.context.destination);
    source5.start();   
      
    ////////////////////////
   
 
  
  }; 
    
       
function onLoad(texture) {
      
    var geometry = new THREE.PlaneGeometry(2, 2, 0);
    var material = new THREE.MeshBasicMaterial({
      map: texture
    });
    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
   // render();
  }

  // Rendering function
  
    /*
  var render = function() {
    renderer.render(scene, camera);
  };
    */    
    
  control = new THREE.OrbitControls(camera, renderer.domElement)
};



function goButton( btn )
{
   bts.style.pointerEvents = 'none';    
   muestra_oculta('menu');    
   console.log("apreto boton: "+btn)
   booClick=true;
  
    
   sphereScene.scale.set(0.1,0.1,0.1);
   TweenMax.to( sphereScene.scale, 1, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        onComplete:endAnimeSphere,
        onCompleteParams:[btn],
        ease: Power2.easeInOut
    } );
          
};


function goButtonSala( btn )
{
     PlaySound();
    btsmenusala.style.display = 'none';
    
    sphereScene.scale.set(0.1,0.1,0.1);
    TweenMax.to( sphereScene.scale, 1, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        onComplete:endAnimeSphere,
        onCompleteParams:[btn],
        ease: Power2.easeInOut
    } );
          
};


function onDctMseUp( event )
{
	isUsrIntrtg = false;	
	var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );  
	isUsrMvg=false;
}

function clickTouch(event, pX, pY)
{    
    var vector = new THREE.Vector3( mousex, mousey,0.5 );		
    mouse.x = ( pX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( pY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera ); 
	isUsrMvg=false
}

function endAnimeSphere(nameButton) {   
    control.reset();
    camera.position.set(0, 0, 5);
    camera.updateProjectionMatrix();
    control.update();
     clickScene(nameButton);
     sphereScene.scale.set(0.1,0.1,0.1);  
    if(nameButton != 'point1'){
       booBtn=false;   
    } 
 }   

function animar() {    
    if(booBtn){ 
            TweenMax.to( group.position, 0.6, {
                x: 0,
                y: 1,
                z: 0,
                onComplete:endonAnimeMenu,
                ease: Power2.easeInOut
            } );
 
    }else{
         console.log(" desaparecer menu");
           TweenMax.to( group.position, 0.6, {
                x: 0,
                y: -0.5,
                z: 0,
                onComplete:endoffAnimeMenu,
                ease: Power2.easeInOut
            } );
        
        } 
}    
function endoffAnimeMenu() {    
}

function endonAnimeMenu() { 
    
}


function playSound() {
    soundActual.play();    
}

function clickScene( nameBoton){   
    //console.log("carga 1")
    var nbt;
    
    if(booClick){
       // console.log("carga 2")
        btnScene=nameBoton;  
        
        
            btsmenusala.style.display = 'none';
       
        if((soundActual != undefined)  && (nameBoton != 'btn6') && (nameBoton != 'btn7') && (nameBoton != 'btn8') && (nameBoton != 'btn9')){     
           soundActual.play();
            soundActual.stop();
        }
        
        btActualMenu.style.opacity='1'   ;
        
        
        if(nameBoton!='btn5' ||   nameBoton!='btn4'  || nameBoton!='btn3' ||  nameBoton!='btn2' ||  nameBoton!='btn1'){ 
            btActualSala.style.opacity='1'   ;
         }
        if(nameBoton=='btn5'){
        btsala1.style.opacity='0.3';
           }
        
        booScene=false;
                  
        switch ( nameBoton ) {
			case 'btn1':			
                 sphereScene.rotation.y = (0.5 * Math.PI);          
                nbt=0;
                bt1.style.opacity='0.6';   
                soundPrev=sound1;
                soundActual=sound1;
                setTimeout(playSound, 1500);
                btActualMenu=bt1;
				break;
                

			case 'btn2':
				   sphereScene.rotation.y = (0.6 * Math.PI);
                nbt=1;
                  bt2.style.opacity='0.6';   
                 soundPrev=sound2;                
                  soundActual=sound2;
                setTimeout(playSound, 1500);
               btActualMenu=bt2;
				break;

			case 'btn3':
			      sphereScene.rotation.y = (0.15 * Math.PI);
                nbt=2;
                bt3.style.opacity='0.6';   
                soundPrev=sound3;      
                soundActual=sound3;
                 setTimeout(playSound, 1500);
               btActualMenu=bt3;
				break;

			case 'btn4':
			    sphereScene.rotation.y = (0.8 * Math.PI);
                nbt=3;
                bt4.style.opacity='0.6';   
                 soundPrev=sound4;      
                  soundActual=sound4;
                setTimeout(playSound, 1500);
              btActualMenu=bt4
				break;
            
            case 'btn5':
                
			  sphereScene.rotation.y = (1.6 * Math.PI);  
                nbt=4;
                bt5.style.opacity='0.6';  
                btsala1.style.opacity='0.3';
                
                soundPrev=sound5;      
                 soundActual=sound5;
                setTimeout(playSound, 1500);
                booScene=true;
                btActualMenu=bt5
                //setTimeout(scene5_1, 6000);
                btsmenusala.style.display = 'block';
				break;
                
             case 'btn6':
                btsala1.style.opacity='0.3';
                btActualSala=btsala1;
                 btsmenusala.style.display = 'block';
			  sphereScene.rotation.y = (1.6 * Math.PI);  
                nbt=4;
               break;
            
                
                
            case 'btn7':
                 btsala2.style.opacity='0.3';
                btActualSala=btsala2;
                btsmenusala.style.display = 'block';
			    sphereScene.rotation.y = (0.5 * Math.PI);     
                nbt=5;
				break;
            
            case 'btn8':
                 btsala3.style.opacity='0.3';
                btActualSala=btsala3;
                btsmenusala.style.display = 'block';
			 sphereScene.rotation.y = (1.6 * Math.PI); 
                nbt=6;               
               
				break;
            
            case 'btn9':
                 btsala4.style.opacity='0.3';
                btActualSala=btsala4;
                btsmenusala.style.display = 'block';
			 sphereScene.rotation.y = (1.6 * Math.PI); 
                nbt=7;                          
				break;                         
		} 
        
      materialsObject[0].map = textureObject[nbt];
    }   
    
}



function scene5_1() { 
    if(booScene){ 
         control.reset();
        camera.position.set(0, 0, 5);
        camera.updateProjectionMatrix();
        control.update();
        
        sphereScene.rotation.y = (0.5 * Math.PI);   
        materialsObject[0].map = textureObject[5];
        setTimeout(scene5_2, 6000);
    }
}

function scene5_2() {    
    if(booScene){ 
         control.reset();
        camera.position.set(0, 0, 5);
        camera.updateProjectionMatrix();
        control.update();
        
        sphereScene.rotation.y = (1.6 * Math.PI); 
        materialsObject[0].map = textureObject[6];
        setTimeout(scene5_3, 6000);
    }
}

function scene5_3() {    
    if(booScene){ 
         control.reset();
        camera.position.set(0, 0, 5);
        camera.updateProjectionMatrix();
        control.update();
        sphereScene.rotation.y = (1.6 * Math.PI); 
        materialsObject[0].map = textureObject[7];
    }
}


function onLoadScene(texture) {    
       switch ( btnScene ) {
			case 'btn1':              
               sphereScene.rotation.y = (0.5 * Math.PI);            
				break;

			case 'btn2':				
                 sphereScene.rotation.y = (0.6 * Math.PI);
				break;

			case 'btn3':			    
                 sphereScene.rotation.y = (0.15 * Math.PI);
				break;

			case 'btn4':			    
                sphereScene.rotation.y = (0.8 * Math.PI);
				break;
            
            case 'btn5':
		       sphereScene.rotation.y = (1.6 * Math.PI);              
				break;
            
            case 'btn6':
			 sphereScene.rotation.y = (0.5 * Math.PI);     
				break;
            
            case 'btn7':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
				break;
            
            case 'btn8':
			 sphereScene.rotation.y = (1.6 * Math.PI); 
				break;

		}
    
        materials[0].map = texture;
      
        booClick=true;
  }

function scalebtsSalas() { 
    
      
  
}

function onWindowResize() {
  // alert(window.innerWidth+" - "+ window.innerHeight+ "VS" +  window.outerHeight +"-"+ window.outerHeight)
    needsResize = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    
    
    
 if (Math.abs(window.orientation) === 90) {
      console.log("--------> horizontal");
      btMenu.style.top= '80%';
      bts.style.fontSize= '12px';
      bts.style.top='40%';
      scalebtsSalas() 
    } else {
        
        if (isMobile.apple.device || isMobile.android.device ) {
            console.log("--------> vertical");
        }
           
        btMenu.style.top= '79%';  
    }
    
    
    if (window.matchMedia("(orientation: portrait)").matches) {
    /// portrait codigo
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
     
    }
    
}


function update() {
   // console.log("---->update")

}


function updateViewport() {
   // renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
   
}


function animate() {
    
    if ( needsResize ) {
        needsResize = false;
        updateViewport();
    }     
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
    update();
     
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}