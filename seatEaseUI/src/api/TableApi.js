import {defaultOptions} from './helper/RequestHelper';
import {apiVersion} from './helper/ApiHelper';

export function getTable() {
  const url = `/api/${apiVersion}/personas/active`;
  return fetch(url, defaultOptions)
    .then(response => {
      if (response.status === 200) {
        return [{
            table_name: 'Choix_1',
            total_seats: 6,
            occupied: 2,
            station: 'Vacant',
          lastOccupied:'3 Seconds Ago'},
          {
            table_name: 'Choix_1',
            total_seats: 6,
            occupied: 2,
            station: 'Vacant',
          lastOccupied:'4 Seconds Ago'},{
            table_name: 'Choix_1',
            total_seats: 6,
            occupied: 2,
            station: 'Vacant'
            ,lastOccupied:'5 Seconds Ago'}
        ];
      } else {
        console.error(`Response Error: ${response.status}`);
      }
    }).catch(e => console.error(`Error: ${JSON.stringify(e)}`));
}

