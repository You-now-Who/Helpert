
import React, { useState } from 'react';

import Essay from '../components/applicationTypes/Essay';
import Test from '../components/applicationTypes/Test';

const types = ["Essay", "Test"]
export default function ApplicationWork({applicationWork, setApplicationWork, work, setWork}) {
  
  const [selectedType, setSelectedType] = useState('Essay');

  

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleAddInput = () => {
    setApplicationWork([...applicationWork, {type: selectedType, uid: Math.floor(Math.random() * 100000000000000)}])
    console.log(applicationWork)
  };

  let inputs = [];

  for (let i = 0; i < applicationWork.length; i++) {
    console.log(applicationWork[i])
    inputs.push(
        <>
        <h1 className='mt-10 font-medium'>{applicationWork[i].type} {i+1}</h1>
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {
                applicationWork[i].type === "Essay" ?
                <>
                <Essay id={applicationWork[i].uid} work={work} setWork={setWork} />
                </>
                :
                applicationWork[i].type === "Test" ?
                <>
                <Test id={applicationWork[i].uid} work={work} setWork={setWork}/>
                </>
                // :
                // applicationWork[i].type === "Transcript" ?
                // <>
                // </>
                // :
                // applicationWork[i].type === "Portfolio" ?
                // <>
                // </>
                // :
                // applicationWork[i].type === "Recommendation letters" ?
                // <>
                // </>
                // :
                // applicationWork[i].type === "Other" ?
                // <>
                // </>
                :
                <>
                </>

            }
        
            
          </div>

      </>
    ); 
  }

  const handleInputChange = (id, value) => {
    const updatedWork = applicationWork.map((work) => {
      if (work.uid === id) {
        return { ...work, value: value, essayText: value }; // Update the value property and add the essayText property
      }
      return work;
    });
    setApplicationWork(updatedWork);
  };
  

  return (
    <>
        <select className="block w-full mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
        value={selectedType}
        onChange={handleTypeChange}>
            {types.map((type) => (
                <option value={type}>{type}</option>
            ))}
        </select>


        <button type="button" onClick={handleAddInput} className='ring-1 ring-gray-300 shadow-sm mt-5 py-1.5 px-4'>
            Add 
        </button>

        {inputs}
        {/* <button type="submit">Submit</button> */}
    </>
  );
};