import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';

import { useUser } from '@auth0/nextjs-auth0/client';

import { database } from '../firebase/clientApp';
import { getDatabase, ref, set, child, get } from "firebase/database";


export default function Index() {

  const { user, error, isLoading } = useUser();
  
  // console.log(database);

  if (user !== undefined){
    
    const db = database;
    // console.log(user.sub);
    const dbRef = ref(db, 'users/' + user.sub);

    get(child(dbRef, 'name')).then((snapshot) => {

      if (snapshot.exists()) {
        console.log(snapshot.val());
      } 
      
      else {
        console.log("No data available");
        set(ref(db, 'users/' + user.sub), {
          email: user.name,
          name: user.nickname,
                  });
      }

    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
    <div className="flex flex-col min-h-screen w-screen overflow-hidden">
    <section className="bg-white ">
        <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="place-self-center mr-auto lg:col-span-7">
                <h1 className="mb-4 max-w-2xl text-4xl font-bold leading-none md:text-5xl xl:text-6xl ">Simplifying College Applications</h1>
                <p className="mb-6 max-w-2xl text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">From selecting the right colleges to submitting applications, Helpert is here to assist highschool students in streamlining their college application process.</p>
                <a href="#" className="inline-flex justify-center items-center py-3 px-5 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ">
                    Get started
                    <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
                <a href="/test" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100">
                    View colleges
                </a> 
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="https://images.pexels.com/photos/16926382/pexels-photo-16926382/free-photo-of-wood-house-table-architecture.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="mockup" className="rounded-3xl border-gray-600"/>
            </div>                
        </div>
    </section>

    <section className="bg-gray-200">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="mb-8 max-w-screen-md lg:mb-16">
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 ">Designed for higschoolers. By highschoolers</h2>
                <p className="text-gray-500 sm:text-xl ">Here at Helpert, we focus on providing technology solutions to help high school students apply to college and achieve their educational goals.</p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-1.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13zm.5-7.5V5a.5.5 0 00-1 0v5a.5.5 0 00.252.433l3 1.5a.5.5 0 00.496-.866l-2.5-1.25z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold ">Deadlines </h3>
                    <p className="text-gray-500 ">Never miss a single college deadline again with constant reminders to keep you on track</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12">
                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold ">Explore</h3>
                    <p className="text-gray-500 ">Finding the perfect college that fits your unique needs and goals can be a daunting task, but Helpert is here to simplify the process</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " viewBox="0 0 20 20" fill="currentColor">
                          {/* <path fillRule="evenodd" d="M14.293 3.293a1 1 0 00-1.414 0L4 12.586V16h3.414l9.293-9.293a1 1 0 000-1.414l-2-2zM5 15v-2.586l8.293-8.293 2.586 2.586L7.586 15H5z" clipRule="evenodd"/> */}
                          <path fillRule="evenodd" d="M13.293 4.707a1 1 0 010 1.414l-8 8a1 1 0 01-.39.242l-3 1a1 1 0 01-1.242-1.242l1-3a1 1 0 01.242-.39l8-8a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold ">Test Preparation</h3>
                    <p className="text-gray-500 ">Access comprehensive study materials, practice tests, and personalized study plans to help you prepare for standardized tests. Track your progress and identify areas for improvement.</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14 3h-3V2a2 2 0 00-2-2H6a2 2 0 00-2 2v1H1a1 1 0 00-1 1v14a2 2 0 002 2h14a2 2 0 002-2V4a1 1 0 00-1-1zM8 2a1 1 0 011-1h2a1 1 0 011 1v1H8V2zm8 16a1 1 0 01-1 1H5a1 1 0 01-1-1V6h12v12z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M7 6a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zM7 9a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1zM7 12a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zM7 15a1 1 0 011-1h6a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold ">Application Tracker</h3>
                    <p className="text-gray-500 ">Keep track of all your college applications in one place with Helpert's Application Tracker, ensuring you never miss a deadline or forget an important detail.</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold ">Study Scheduler</h3>
                    <p className="text-gray-500 ">To keep you on point with your study, Helpert designs a personalized schedule for yourself and reminds you to practice.</p>
                </div>
                <div>
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 " viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M17 2H3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2zM3 4h14v9H3V4zm0 11v1a1 1 0 001 1h2.5a1 1 0 001-1v-1a1 1 0 00-1-1H4a1 1 0 00-1 1zm7 0v1a1 1 0 001 1h2.5a1 1 0 001-1v-1a1 1 0 00-1-1H11a1 1 0 00-1 1z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold ">Essay help</h3>
                    <p className="text-gray-500 ">Essays are an important part of many colleges. Helpert provides you with tools to give your essays and writing that extra boost.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light text-gray-500 sm:text-lg ">
                <h2 className="mb-4 text-4xl font-extrabold text-gray-900 ">Deciding a college is hard.</h2>
                <p className="mb-4">Not to worry, we are here to help. Our platform provides a range of tools and resources to help students make informed decisions about their college choices. Helpert can help students prepare for standardized tests and identify areas for improvement. Our Application Tracker feature allows students to keep track of all their college applications.</p>
                {/* <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p> */}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <img className="w-full rounded-lg" src="https://images.pexels.com/photos/1850021/pexels-photo-1850021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 1"/>
                <img className="mt-4 w-full rounded-lg lg:mt-10" src="https://images.pexels.com/photos/3186386/pexels-photo-3186386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="office content 2"/>
            </div>
        </div>
    </section>

 

    </div>
    <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>

    </>
  );
}
