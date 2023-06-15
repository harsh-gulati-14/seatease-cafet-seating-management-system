import React  from 'react';
import "../../styles/dinnerTable.scss"

const DinnerTable = ({
  table = {
    id: 1,
    name: 'unknown',
    totalSeats: 6,
    occupied: 4,
    status: 'Vacant'
  },
}) => {
  const occupiedTable=[...Array(table.occupied)].map((e, i) =>
    <div className="redPlate">
    <div className="knife"></div>
    <div className="fork"></div>
  </div>);
  const freeSeats=[...Array(table.total_seats-table.occupied)].map((e, i) =>
    <div className="greenPlate">
      <div className="knife"></div>
      <div className="fork"></div>
    </div>);
  return (
    <main>
      <div>
        <div id="table-wrapper">
          <div className="mr-4 justify-content-center">
            {/*<div className="chair chair-lg"></div>*/}
            {/*<div className="chair left"></div>*/}
            {/*<div className="chair left"></div>*/}
            {/*<div className="chair right"></div>*/}
            {/*<div className="chair right"></div>*/}
            {/*<div className="chair chair-lg "></div>*/}
            <div className="the-table">

              {occupiedTable}
              {freeSeats}
            </div>
            <h1 id="tableName">{table.table_name}</h1>
          </div>
          <h1 id="tableTime">Last Occupied: {table.lastOccupied}</h1>
        </div>
      </div>
    </main>
  );
};
export default DinnerTable;
