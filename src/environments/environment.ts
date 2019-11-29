// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://localhost:4000',
  apiUrl: 'https://brugge-manager.herokuapp.com',
  firebaseConfig: {
    apiKey: "AIzaSyAi2xsjCLF1UDSVzClwoqUWFWqHLeXxuFo",
    authDomain: "brugge-f8811.firebaseapp.com",
    databaseURL: "https://brugge-f8811.firebaseio.com",
    projectId: "brugge-f8811",
    storageBucket: "",
    messagingSenderId: "287785352097",
    appId: "1:287785352097:web:4de8ee41608bfb9fece9e0",
    measurementId: "G-X18QJ9G9QC"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
