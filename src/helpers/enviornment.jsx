let APIURL = '';

switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
  case 'botanical-app-client.herokuapp.com':
    APIURL = 'https://botanical-app.herokuapp.com'

} 
export default APIURL;