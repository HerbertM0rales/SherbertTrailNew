import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

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
import { Platform, } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Button } from 'protractor';
import { DEFAULT_PACKAGE_URL_PROVIDER } from '@angular/platform-browser-dynamic/src/compiler_factory';
import { DrawerState } from 'ion-bottom-drawer';
import { Stats } from 'fs';



@Component({

  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {
  public truck = {
    name: '',
    desc: ['','', ''],
    time: '',
    ContactInfo:'',
    Status:''
  }
  marker6: Marker;
  public state = DrawerState.Bottom;

  latLng: LatLng;

  heatmap;
  map: GoogleMap;
  maps: GoogleMaps;
  marker2: Marker;
  locationHolder = {
    lat: 34.02417366297443,
    lng: -118.2873374654963
  };

  constructor(public zone: NgZone, private platform: Platform, public geolocation: Geolocation, private router: Router) { }

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

  async loadMap() {

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
          'compass': true,
        },
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
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#e0fae4"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#fde2f7"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#fde2f7"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
          
          /*{
            "elementType": "geometry.fill",
            "stylers": [
              {
                "weight": 100
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
                "weight": 100
              }
            ]
          }
          */
        ]
      };


      this.map = GoogleMaps.create('map_canvas', googleMapOptions);

      this.marker2 = this.map.addMarkerSync({
        icon: {
          url: 'https://i.ibb.co/WBT84Vj/Group-74-7.png',
          size: {
            width: 70,
            height: 85
          }

        },
        position: {
          lat: 34.02417366297443,
          lng: -118.2873374654963
        },
      });

      this.marker2.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        console.log('clicked');
        this.openDrawer(2);
      })

      this.marker6 = this.map.addMarkerSync({
        icon: {
          url: 'https://i.ibb.co/WBT84Vj/Group-74-7.png',
          size: {
            width: 70,
            height: 85
          }
        },
        position: {
          lat: 34.023910,
          lng: -118.279940

        },
      });
      this.marker6 = this.map.addMarkerSync({
        icon: {
          url: 'https://i.ibb.co/WD3zL5F/Group-58-1.png',
          size: {
            width: 42.27,
            height: 57.07
          }
        },
        position: {
          lat: 34.019939,
          lng: -118.28641

        },
      });
      this.marker6.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        console.log('clicked');
        this.openDrawer(6);
      })

      //this.changeMarkerPos();

    }).catch((error) => {
      console.log('Error getting location', error);
    })
  }


  openDrawer(id){
    this.zone.run(() => {
      this.state = DrawerState.Docked;


      if(id === 6){
        this.truck.name = "FunTime Ice Cream";
        this.truck.desc[0] = "Family owned truck service specializing in";
        this.truck.desc[1]= "shortcake and tamarind ice cream.";
        this.truck.time = "Alumni Park - 3:00 PM - 4:00 PM";
        this.truck.ContactInfo = "TruckDriver@gmail.com";
        this.truck.Status = "Active"
      }else if(id === 2){
        this.truck.name = "Frozen Ice Cream";
        this.truck.desc[0]= "Family owned truck service specializing  in shortcake and tamarind ice cream.";
        this.truck.time = "9:00AM-4:30PM";
        this.truck.ContactInfo = "AwsomeDriver@gmail.com";
        this.truck.Status = "offline"
      }
    })

    console.log(this.state);
  }

  async changeMarkerPos() {

    this.marker6.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {


      setTimeout(() => {
        document.getElementById('truck').addEventListener('click', () => {
          this.navigate('second/truck');
          console.log('click');
        })
      }, 1000)
    });



    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {
      let clickCoords: LatLng = event[0];
      console.log(clickCoords.lat, clickCoords.lng);

      if (clickCoords.lat < this.locationArray[0].lat) {
        let j;
        for (let i = this.locationArray[0].lat; i > clickCoords.lat; i = i - .00001) {
          for (let j = 0; j < 100; j++) {
            for (let u = 0; u < 10; u++) { }
          }
          let newPosition: LatLng = new LatLng(i, this.locationArray[0].lng);
          this.marker2.setPosition(newPosition);
          j = i;
        }

        this.locationArray[0].lat = j;
      }

      else if (clickCoords.lat > this.locationArray[0].lat) {
        let j;
        console.log('it got to longitude')
        for (let i = this.locationArray[0].lat; i < clickCoords.lat; i = i + .00001) {
          for (let j = 0; j < 100; j++) {
            for (let u = 0; u < 10; u++) { }
          }
          let newPosition: LatLng = new LatLng(i, this.locationArray[0].lng);
          this.marker2.setPosition(newPosition);
          j = i;

        }
        this.locationArray[0].lat = j;
      }


      if (clickCoords.lng < this.locationArray[0].lng) {
        let j;
        console.log('it got to longitude')
        for (let i = this.locationArray[0].lng; i > clickCoords.lng; i = i - .00001) {
          for (let j = 0; j < 100; j++) {
            for (let u = 0; u < 10; u++) { }
          }
          let newPosition: LatLng = new LatLng(this.locationArray[0].lat, i);
          this.marker2.setPosition(newPosition);
          j = i;

        }
        this.locationArray[0].lng = j;

      }

      else if (clickCoords.lng > this.locationArray[0].lng) {
        let j;
        for (let i = this.locationArray[0].lng; i < clickCoords.lng; i = i + .00001) {
          for (let j = 0; j < 100; j++) {
            for (let u = 0; u < 10; u++) { }
          }
          let newPosition: LatLng = new LatLng(this.locationArray[0].lat, i);
          this.marker2.setPosition(newPosition);
          j = i;

        }
        this.locationArray[0].lng = j;
      }


      console.log(this.marker2.getPosition());


    });
  }

  navigate(url) {
    this.router.navigate([url]);
  }

}





