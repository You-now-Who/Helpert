import React from 'react';

export default function Test({ id, work, setWork }) {
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));

  const handleNameChange = (event) => {
    setName(event.target.value);
    setWork((prevWork) => ({
      ...prevWork,
      [id]: { name: event.target.value, date, type: 'test'  },
    }));
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setWork((prevWork) => ({
      ...prevWork,
      [id]: { name, date: event.target.value, type: 'test' },
    }));
  };

  return (
    <>
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor="test_name" className="block text-sm font-medium text-gray-700">
          Test Name
        </label>
        <input
          type="text"
          name="test_name"
          id="test_name"
          autoComplete="given-name"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div className="">
        <label htmlFor="test_date" className="block text-sm font-medium leading-6 text-gray-900">
          Test date:{' '}
        </label>
        <input
          type="date"
          id="test_date"
          name="test_date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
    </>
  );
}