import { groupBy, values } from 'lodash';
import countries from './countries.json';
import cities from './world-cities_json.json';
import Nationalities from './nationalities';

export const COUNTRIES = values(countries.countries);
export const CITIES = groupBy(cities, 'country');
export const NATIONALITIES = Nationalities;

export const WEEKS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
