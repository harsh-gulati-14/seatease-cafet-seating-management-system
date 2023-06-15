import React, {useState} from 'react';

import Placeholder from '../utils/Placeholder';
import ClosePersona from '../persona/ClosePersona';

const PersonaCard = ({
  person = {
    id: 1,
    name: 'unknown',
    username: 'a123456'
  }, handleUserSelect
}) => {
  const options = {
    width: 500,
    height: 300,
    text: person.name,
    fontSize: '20'
  }
  const handleUpdateModal = () => {
    setIsUpdateModal(false);
  }
  const [isUpdateModal,setIsUpdateModal]=useState(false);
  const triggerModal=e => {
    e.preventDefault();
    setIsUpdateModal(true);
  }

  return (
    <div>
      <div className="card btn" onClick={() => handleUserSelect(person)}>
        <img className="card-img-top"
          src={`${process.env.PUBLIC_URL}/images/${person.username}.png`}
          alt={person.name} onError={(e) => {
          (e.target).src = Placeholder(options);
        }}/>
        <div className="card-body">
          <h4>{person.name}</h4>
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-danger ml-xl-5" onClick={triggerModal}>Close {person.name} </button>
        {isUpdateModal && <ClosePersona person={person} handleUpdateModal={handleUpdateModal} />}
      </div>
    </div>
  );
}
export default PersonaCard;
