import { useState, useEffect } from 'react';
import { database } from '../../firebase/clientApp';


import { useUser } from '@auth0/nextjs-auth0/client';

import CollegeSelect from '../../components/CollegeSelect';
import ApplicationWork from '../../components/ApplicationWork';

import { getDatabase, ref, set, push, child, get } from "firebase/database";

import { useRouter } from 'next/router';

export default function Example() {

  const router = useRouter();

  const [colleges, setColleges] = useState([]);

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  
  const [applicationWork, setApplicationWork] = useState([]);
  const [formValues, setFormValues] = useState({
    college: '',
    work: [],
  });

  const [work, setWork] = useState([]);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const fetchColleges = async (filters) => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`/api/colleges`);
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };

    // Example usage: Fetch colleges when component mounts
    fetchColleges({ country: 'USA', city: 'New York', type: 'Public' });
  }, []);

  const handleWorkChange = (newWork) => {
    setApplicationWork(newWork);
    setFormValues((prevFormValues) => ({
        ...prevFormValues,
        work: newWork,
    }));
    };

  const handleSave = () => {
    // const userId = firebase.auth().currentUser.uid;

    const formValues = {
        college: selectedCollege,
        date: selectedDate,
        work: applicationWork,
        list_work: work,
        
    }

    const dbRef = ref(database, 'users/' + user.sub + '/forms');

    console.log(formValues)

    push(dbRef, formValues);

    

    // const newFormRef = database.ref(`users/${user.sub}/forms`).push();
    // newFormRef.set(formValues);
    console.log('Saved!');

    router.push('/');
  };

  return (
    <div className=" bg-white px-10 pt-1 pb-10 my-5 rounded-sm drop-shadow-lg">
      <form className="mx-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-bold leading-7 text-gray-900 my-10">New Application</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <CollegeSelect colleges={colleges}  setSelectedCollege={setSelectedCollege} selectedCollege={selectedCollege} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add work</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Add all the parts of the application that you want to prepare for
            </p>

            <ApplicationWork applicationWork={applicationWork} onChange={handleWorkChange} setApplicationWork={setApplicationWork} work={work} setWork={setWork}/>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}