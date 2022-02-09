export class Configuration {
    // baseUrl: string = "http://localhost:3000/api/";
    baseUrl: string = "https://onlinelocalstoreservice.herokuapp.com/api/";
    userStorageKey="currentUser";
    rememberMeKey="rememberMeData";
    cryptoKey="ilovemydaughterpihu";
    minDesktopSize: number=1024;
    minTabletSize: number = 768;
    minMobileLandscapeSize: number=568;
    minPrice:number=1;
    maxPrice:number=10000;
  }