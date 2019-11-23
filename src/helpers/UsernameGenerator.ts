import { sample, capitalize } from 'lodash';

export class UsernameGenerator {

  public static names:string[] = [
    'hunter',
    'killer',
    'bounty',
    'space',
    'pirate',
    'maurader',
    'drifter',
    'star',
    'destroyer',
    'laser',
    'astro',
    'cruiser',
    'pod',
    'racer',
    'planet',
    'eater',
    'ship',
    'avenger',
    'crusher',
    'galaxy',
    'atom',
    'neutron',
    'solar',
    'lunar',
    'discovery',
    'serpent',
    'blade',
    'sword',
    'trident',
    'watcher',
    'assassin',
    'spy',
    'detector',
    'exec',
    'campaign',
    'steering',
    'faith',
    'divider',
    'team',
    'flame',
    'bomb',
    'explosion',
    'electron',
    'radius',
    'titan',
    'rupture',
    'debris',
    'mission',
    'hot',
    'cold',
    'ice',
    'fire',
    'earth',
    'sun',
    'moon',
    'saturn',
    'executor',
    'execusioner'
  ];

  public static getUsername() {
    let first = capitalize(sample(UsernameGenerator.names));

    return first + (Math.round(Math.random() * 9999999));
  }

  public static getShipname() {
    let first = capitalize(sample(UsernameGenerator.names));
    let second =  capitalize(sample(UsernameGenerator.names));
    while(first == second) {
      second =  capitalize(sample(UsernameGenerator.names));
    }
    return first + second;
  }

}
