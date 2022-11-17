// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  ISSUER_URL: "http://10.1.22.72:8081/auth/realms/enat",
  production: false,
  // Url: 'http://localhost:8080/EWBFS-BACKEND-0.0.1-SNAPSHOT'
  Url: "http://localhost:8081",
  HR_HOST: 'http://10.1.22.72:8083/hr',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
