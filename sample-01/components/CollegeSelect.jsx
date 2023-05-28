import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from 'react-select';

export default function CollegeSelect({colleges, selectedDate, selectedCollege, setSelectedCollege, setSelectedDate}) {
    // only use first 100 colleges
    colleges = colleges.slice(0, 200);



    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        // handleCollegeChange(event.target.value);
    };

    const handleChange = (selectedCollege) => {
        setSelectedCollege(selectedCollege);
    };

  return (
    <>
      <div className="sm:col-span-4">
        <label htmlFor="collegename" className="block text-sm font-medium leading-6 text-gray-900">
          College name
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          </div>
        
            <Select options={colleges} isSearchable={true} value={selectedCollege} onChange={handleChange} placeholder="Search for a college"/>
                         
            { selectedCollege && (
                <div className="p-4 border rounded-lg w-full mt-5">
                    <Image src={selectedCollege.logo} alt="College Logo" width={50} height={50} crossOrigin='anonymous' className="w-20 h-20 mx-auto mb-4"/>
                    {/* {console.log(selectedCollege)} */}
                    <h3 className="text-lg font-semibold">{selectedCollege.label}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                    <p className="text-gray-500 mb-2">Rank: <span className="font-medium">{selectedCollege.rank_display}</span></p>
                    <p className="text-gray-500 mb-2">Score: <span className="font-medium">{selectedCollege.score}</span></p>
                    <p className="text-gray-500 mb-2">Location: <span className="font-medium">{selectedCollege.region}, {selectedCollege.country}</span></p>
                    <p className="text-gray-500 mb-2">Type: <span className="font-medium">{selectedCollege.type}</span></p>
                    <p className="text-gray-500 mb-2">Research Output: <span className="font-medium">{selectedCollege.research_output}</span></p>
                    <p className="text-gray-500 mb-2">Student-Faculty Ratio: <span className="font-medium">{selectedCollege.student_faculty_ratio}</span></p>
                    <p className="text-gray-500 mb-2">International Students: <span className="font-medium">{selectedCollege.international_students}</span></p>
                    <p className="text-gray-500 mb-2">Size: <span className="font-medium">{selectedCollege.size}</span></p>
                    <p className="text-gray-500 mb-2">Faculty Count: <span className="font-medium">{selectedCollege.faculty_count}</span></p>
                    <a href={selectedCollege.link} className="block text-blue-500 hover:underline">More Info</a>
                </div>
                </div>
            )}
            <div className='mt-20'>
                <label htmlFor='date' className='block text-sm font-medium leading-6 text-gray-900'>Deadline date: </label>
                <input type="date" id="date" name="date" value={selectedDate} onChange={handleDateChange} />
            </div>
        </div>
      </div>
    </>
  );
}
