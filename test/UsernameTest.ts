import {UsernameGenerator} from '../src/helpers/UsernameGenerator';

for(let i = 0; i < 5; i++) {
  console.log('Example username: ' + UsernameGenerator.getUsername());
}

for(let i = 0; i < 10; i++) {
  console.log('ShipName: ' + UsernameGenerator.getShipname());
}
