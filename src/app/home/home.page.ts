import { Component } from '@angular/core';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  Environment,
  GoogleMapOptions,
  MyLocationOptions,
  LatLng,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {
  marker6 :Marker;
  htmlInfoWindow = new HtmlInfoWindow();

  latLng: LatLng;

  heatmap;
  map: GoogleMap;
  maps: GoogleMaps;
  marker2: Marker;
  locationHolder = {
    lat: 34.02417366297443,
    lng: -118.2873374654963
  };

  constructor(private platform: Platform, public geolocation: Geolocation) { }

  locationArray = [{
    lat: 10,
    lng: 10,
  }];
  options: MyLocationOptions = {
    enableHighAccuracy: true
    
  };

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDgH97l52_Bcms2ViKaye0B_tsNFbZr0Wk',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDgH97l52_Bcms2ViKaye0B_tsNFbZr0Wk'
    });
   
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.locationArray[0].lat = resp.coords.latitude;
      this.locationArray[0].lng = resp.coords.longitude;


      const googleMapOptions: GoogleMapOptions = {
        controls: {
          'compass': true,},
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 15,
          tilt: 30
        },
        gestures: {
          scroll: true,
          tilt: true,
          zoom: true,
          rotate: true
          
          
        },
        styles: [
          {
            "elementType": "geometry.fill",
            "stylers": [
              {
                 "weight": 5
              }
            ]
          },
          {
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#fbe3ed"
              },
              {
                "weight": 5
              }
            ]
          }
         ]
      };
     

      this.map = GoogleMaps.create('map_canvas', googleMapOptions);
     }).catch((error) => {
       console.log('Error getting location', error);
     }).then(()=>{
      this.marker2 = this.map.addMarkerSync({
        title: 'Some persons ice cream truck!',
        snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan.',
        icon: 'https://i.ibb.co/KXzBdqq/Group-10-2-2.png',
        position: {
          lat: 34.02417366297443,
          lng: -118.2873374654963
        },
      
      });
      
    
      this.marker6 = this.map.addMarkerSync({
        title: 'Eliseos Ice Cream Truck!',
        snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan.',
        icon: 'https://i.ibb.co/KXzBdqq/Group-10-2-2.png',
        position: {
          lat: 34.023910,
          lng: -118.279940
          
        },
        
      });
     
     
    
      this.changeMarkerPos();


      
     })
     
     
     

      // this.map.animateCamera({
      //   target: location.latLng,
      //   zoom: 17,
      //   tilt: 25,
      // });



  
        
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude




   
 

      
      
     
      

  }

  

   changeMarkerPos(){

    let frame: HTMLElement = document.createElement('div');
    frame.innerHTML = [
      '<h3>Hearst Castle</h3>',
      '<h1>hello</h1>'
    ].join("");
    this.htmlInfoWindow.setContent(frame, {
      width: "100px",
      height: "150px", 
    });
  
    this.marker6.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.marker6.hideInfoWindow();
      this.htmlInfoWindow.open(this.marker6);
    });
    
    

   this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event)=>{
     let clickCoords : LatLng = event[0];
     console.log(clickCoords.lat, clickCoords.lng);

     if( clickCoords.lat < this.locationArray[0].lat){
      let j;
      for(let i=this.locationArray[0].lat; i > clickCoords.lat; i=i-.00001){
        for(let j=0; j<100; j++){
          for(let u=0; u<10; u++){}
        }
        let newPosition : LatLng = new LatLng( i, this.locationArray[0].lng );
        this.marker2.setPosition(newPosition);
        j = i;
    }

    this.locationArray[0].lat = j;
    }

    else if( clickCoords.lat > this.locationArray[0].lat){
      let j;
      console.log('it got to longitude')
      for(let i=this.locationArray[0].lat; i < clickCoords.lat; i=i+.00001){
        for(let j=0; j<100; j++){
          for(let u=0; u<10; u++){}
        }
        let newPosition : LatLng = new LatLng( i, this.locationArray[0].lng );
        this.marker2.setPosition(newPosition);
        j = i;

    }
    this.locationArray[0].lat = j;
  }
 

  if( clickCoords.lng < this.locationArray[0].lng){
    let j;
    console.log('it got to longitude')
    for(let i=this.locationArray[0].lng; i > clickCoords.lng; i=i-.00001){
      for(let j=0; j<100; j++){
        for(let u=0; u<10; u++){}
      }
      let newPosition : LatLng = new LatLng( this.locationArray[0].lat, i);
      this.marker2.setPosition(newPosition);
      j = i;

  }
  this.locationArray[0].lng = j;

}

  else if( clickCoords.lng > this.locationArray[0].lng){
    let j;
    for(let i=this.locationArray[0].lng; i < clickCoords.lng; i=i+.00001){
      for(let j=0; j<100; j++){
        for(let u=0; u<10; u++){}
      }
      let newPosition : LatLng = new LatLng( this.locationArray[0].lat, i);
      this.marker2.setPosition(newPosition);
      j= i;

  }
  this.locationArray[0].lng = j;
}


  console.log(this.marker2.getPosition());
  

    });
}


}





