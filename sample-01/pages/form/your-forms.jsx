import { getDatabase, ref, get } from "firebase/database";
import { database } from '../../firebase/clientApp';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import Image from "next/image";

import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function EssayDetails({ essay }) {
  return (
    <>
      {/* Add the prompt */}
      <div className="flex-col">
        <div className="flex row justify-between items-center mt-2 my-3">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <label htmlFor="prompt" className="text-gray-500 mx-2">
                Prompt:{' '}
              </label>
              <input
                type="text"
                id="prompt"
                value={essay.prompt}
                className="mr-2"
              />
            </div>
          </div>
        </div>

        <div className="row my-6">
          {/* Add the Quill editor */}
            <QuillNoSSRWrapper
              theme="snow"
              value={essay.text}
              className="w-96 h-40"
            />
          <div className="flex justify-between items-center mt-20">
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <input
                  type="checkbox"
                  id={`completed-$`}
                  checked={essay.completed}
                  className="mr-2"
                />
                <label
                  htmlFor={`completed-$`}
                  className="text-gray-500"
                >
                  Completed
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TestDetails({test}) {
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
          value={test.name}
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
          value={test.date}
        />
      </div>
      </>
  )
}

function FormDetails({ form }) {
  const [showList, setShowList] = useState(false);

  function handleToggleList() {
    setShowList(!showList);
  }

  return (
    <div className="bg-white px-10 pt-1 pb-10 my-5 rounded-sm drop-shadow-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-3/4 md:w-3/4 lg:w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 mx-auto">{form.college.label}</h2>
        <p className="text-gray-600 mb-4">{form.date}</p>
        <p className="text-gray-600 mb-4">Amount of work: {form.work.length}</p>

        {/* {console.log(form.list_work)} */}

        {Object.values(form.list_work).map((item) => (
  item.type === 'essay' ? (
    // <li key={item.id}>
    <>
      <h1 className="text-3xl font-bold text-gray-900 my-3 mt-20">Essay</h1>
      <EssayDetails essay={item} />
    </>
    
  ) : (
    <>
      <h1 className="text-3xl font-bold text-gray-900 my-3 mt-20">Test</h1>
      <TestDetails test={item} />
    </>
  )
))}

      </div>
    </div>
  );
}


export default function YourForms() {
  const { user, error, isLoading } = useUser();

  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const dbRef = ref(database, 'users/' + user.sub + '/forms');
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setForms(Object.values(snapshot.val()));
        } else {
          setForms([]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchForms();
  }, [user]);

  function handleCardClick(form) {
    setSelectedForm(form);
  }

  function handleBackClick() {
    setSelectedForm(null);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (selectedForm) {
    return (
      <div>
        <button onClick={handleBackClick}>Back</button>
        <FormDetails form={selectedForm} />
      </div>
    );
  }

  return (
    <>
    <h1 className="text-3xl font-bold text-gray-900 my-3">Your Applications</h1>
    <div className="grid grid-cols-1 gap-4 my-10 sm:grid-cols-2 lg:grid-cols-3">
      {forms.map((form) => (
        <a href='#'>
        <div key={form.id} className="bg-white overflow-hidden shadow rounded-lg" onClick={() => handleCardClick(form)}>
          <div className="bg-gray-200 h-48 w-full flex items-center justify-center">
            <Image src={form.college.logo} alt={form.college.label} width={200} height={200} crossOrigin="anonymous"  />
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">{form.college.label}</h3>
            <p className="mt-1 text-sm text-gray-500">{form.date}</p>
          </div>
        </div>
        </a>
      ))}
    </div>
    </>
  );
}