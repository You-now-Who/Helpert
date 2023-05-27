import { useState, useEffect } from 'react';
import College from '../components/College';

const CollegesPage = () => {
  const [colleges, setColleges] = useState([]);

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

  return (
    <div>
      <h1>Table</h1>

        {/* {console.log(colleges)} */}
        <College colleges={colleges}/>

    </div>
  );
};

export default CollegesPage;
