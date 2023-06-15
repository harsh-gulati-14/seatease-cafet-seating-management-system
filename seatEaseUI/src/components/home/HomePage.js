import React, {useEffect, useState} from 'react';
import DinnerTable from '../table/DinnerTable';
import {getTable} from '../../api/TableApi'

const HomePage = (props) => {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const getTableData = async () => {
      const data = await getTable();
      setTables(data);
      console.log(data);
    }
    const interval = setInterval(() => {
      getTableData();
    }, 1000);
    return () => clearInterval(interval);

  }, []);
  return (
    <main>
      <div className="container-fluid pt-1">
        <h1 className="display-1 text-black-50 font-weight-bold text-center">SeatEase</h1>
        <div className="row justify-content">
          <div className="card-deck">
            {tables.map(table => (
              <DinnerTable table={table}/>
              // <PersonaCard person={persona} key={persona.id} handleUserSelect={props.handleUserSelect} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
export default HomePage;
