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
                "color": "#f5f5e9"
              }
            ]
          },
          {
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#da9a9a"
              },
              {
                "weight": 1
              }
            ]
          },
          {
            "elementType": "labels",
            "stylers": [
              {
                "color": "#d2bad2"
              },
              {
                "weight": 0.5
              }
            ]
          },
          {
            "elementType": "labels.text",
            "stylers": [
              {
                "color": "#85c9e2"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#bee0df"
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

 let marker3: Marker = this.map.addMarkerSync({
  title: 'Leons Ice cream truck!',
  snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan. ',
  icon: 'https://i.ibb.co/HqF3PMr/Group-8-16.png',
  position: {
    lat: 34.02417366297443,
    lng: -118.293818
  },
});
let marker4: Marker = this.map.addMarkerSync({
  title: 'Irvins Ice Cream Truck!',
  snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan.',
  icon: 'https://i.ibb.co/HqF3PMr/Group-8-16.png',
  position: {
    lat: 34.023842,
    lng: -118.293827
  },
});
let marker5: Marker = this.map.addMarkerSync({
  title: ' Herberts Ice Cream Truck!',
  snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan.',
  icon: 'https://i.ibb.co/HqF3PMr/Group-8-16.png',
  position: {
    lat: 34.028431,
    lng: -118.286344
  },
});
let marker6: Marker = this.map.addMarkerSync({
  title: 'Eliseos Ice Cream Truck!',
  snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan.',
  icon: 'https://i.ibb.co/HqF3PMr/Group-8-16.png',
  position: {
    lat: 34.023910,
    lng: -118.279940
  },
});


    let marker2: Marker = this.map.addMarkerSync({
      title: 'Some persons ice cream truck!',
      snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu leo in neque pellentesque accumsan.',
      icon: 'https://i.ibb.co/HqF3PMr/Group-8-16.png',
      position: {
        lat: 34.02417366297443,
        lng: -118.2873374654963
      },
      animation: GoogleMapsAnimation.BOUNCE
    });

      let marker: Marker = this.map.addMarkerSync({
        title: 'Customer!',
         snippet: '',
         icon: 'https://i.ibb.co/sRMKQt3/Untitled-2.png',
         position: {lat: data.coords.latitude,
                             lng: data.coords.longitude},
         animation: GoogleMapsAnimation.BOUNCE
       });
      });


      

  }
}
