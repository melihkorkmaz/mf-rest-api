const config = {
  version: 'v1',
  // database : {
  //     conn : "mongodb://menufielddbadmin:menufieldkork4891@ds151801-a0.mlab.com:51801,ds151801-a1.mlab.com:51801/menufield_live?replicaSet=rs-ds151801",
  //     auth_db : "menufield_live"
  // },
  // database: {
  //   conn: 'mongodb://localhost:27017/menufield_local',
  //   auth_db: 'menufield_local',
  // },
  database : {
    conn : 'mongodb://menufield:menufield@ds261247.mlab.com:61247/menufield-test',
    auth_db : 'menufield-test'
  },
  secret: 'menufield_2017',
  authSecret: 'bfQZIagD7eCkc3-d2Pei6KUqoaQwg_LkN7TsZC5Hd-Jn5NdqKyb3SVsJwNumkyOW',
};


export default config;
