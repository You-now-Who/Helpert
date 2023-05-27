import React from 'react';
import Image from 'next/image';

const College = ({ colleges }) => {
  const topColleges = colleges.slice(0, 100);

  return (
    <>
      <div class="flex flex-col ml-10">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4">Rank</th>
              <th scope="col" class="px-6 py-4">Name</th>
              <th scope="col" class="px-6 py-4">Score</th>
              <th scope="col" class="px-6 py-4">Location</th>
              <th scope="col" class="px-6 py-4">Type</th>
              <th scope="col" class="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
          {topColleges.map((college, index) => (
          <>
          {console.log(college)}
          <tr
          class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-gray-200">
          <td class="whitespace-nowrap px-6 py-4 text-gray-800">{college.rank_display}</td>
          <td class="whitespace-nowrap px-6 py-4 font-medium text-gray-600">{college.university}</td>
          <td class="whitespace-nowrap px-6 py-4">{college.score}</td>
          <td class="whitespace-nowrap px-6 py-4 text-gray-700 italic">{college.city}, {college.country}</td>
          <td class="whitespace-nowrap px-6 py-4">{college.type}</td>
          <td class="whitespace-nowrap px-6 py-4">
            <Image src={college.logo} width={50} height={50} alt="logo" crossOrigin='anonymous'></Image>
          </td>
        </tr></>
        ))}            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      {/* <div className="grid grid-cols-4 gap-4">
        
      </div> */}
    </>
  );
};

export default College;
