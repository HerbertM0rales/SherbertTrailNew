import { Component } from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Environment,
  GoogleMapOptions,
  MyLocationOptions,
  MarkerIcon,
} from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {
  map: GoogleMap;

  constructor(private platform: Platform, public geolocation: Geolocation) { }


  options: MyLocationOptions = {
    enableHighAccuracy: true
  };
  icon_truck: MarkerIcon = {
    url: ' https://i.ibb.co/99X19gx/Group-8-2.png',
    size: {
      width: 32,
      height: 24
    }
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
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDIi6uK4S1yM7zxDPVfEDFMUOw0hWt-Yl8',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDIi6uK4S1yM7zxDPVfEDFMUOw0hWt-Yl8'
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      const googleMapOptions: GoogleMapOptions = {
        controls: {
          'compass': true,},
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 18,
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
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#e8848e"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]
      };
     

      this.map = GoogleMaps.create('map_canvas', googleMapOptions);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

      // this.map.animateCamera({
      //   target: location.latLng,
      //   zoom: 17,
      //   tilt: 25,
      // });
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
    let marker2: Marker = this.map.addMarkerSync({
      title: 'this is truck driver',
      snippet: '',
      icon: 'https://i.ibb.co/d6CybXF/Group-8-6.png',
      position: {
        lat: 34.02417366297443,
        lng: -118.2873374654963
      },
      animation: GoogleMapsAnimation.BOUNCE
    });

      let marker: Marker = this.map.addMarkerSync({
        title: 'this is our location',
         snippet: '',
         icon: 'https://i.ibb.co/sRMKQt3/Untitled-2.png',
         position: {lat: data.coords.latitude,
                             lng: data.coords.longitude},
         animation: GoogleMapsAnimation.BOUNCE
       });
      });


      

  }
}
