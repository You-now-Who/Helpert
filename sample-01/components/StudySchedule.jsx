import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function StudySchedule() {
    const [examDate, setExamDate] = useState(new Date());
    const [hoursPerDay, setHoursPerDay] = useState(4);
    const [subjects, setSubjects] = useState(['Math', 'Science', 'History']);
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [breakDuration, setBreakDuration] = useState(0);
    const [schedule, setSchedule] = useState([]);
  
    function generateSchedule() {
      const hoursPerSubject = hoursPerDay / subjects.length;
      const startHour = parseInt(startTime.split(':')[0]);
      const totalStudyDuration = hoursPerDay * 60 * 60 * 1000;
      const breakDurationInMinutes = breakDuration * 60 * 1000;
      const totalBreakDuration = breakDurationInMinutes * (subjects.length - 1);
      const hoursPerSubjectWithBreak = (totalStudyDuration - totalBreakDuration) / subjects.length / (60 * 60 * 1000);
      const hoursPerBlock = hoursPerSubjectWithBreak * (60 / hoursPerDay);
  
      const newSchedule = subjects.map((subject, index) => {
        const start = new Date();
        start.setHours(startHour + index * hoursPerBlock + index * breakDurationInMinutes);
        const end = new Date(start.getTime() + hoursPerSubjectWithBreak * 60 * 60 * 1000);
        return { subject, start, end };
      });
  
      setSchedule(newSchedule);
    }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 md:pr-4">
        <h2 className="text-2xl font-bold mb-4">Study Schedule</h2>
        <div className="mb-4">
          <p className="font-bold mb-2">Exam Date:</p>
          <Calendar value={examDate} onChange={setExamDate} />
        </div>
        <label className="block mb-2">
          Hours of Study per Day:
          <input type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(parseInt(e.target.value))} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block mb-2">
          Subjects:
          <input type="text" value={subjects.join(',')} onChange={(e) => setSubjects(e.target.value.split(','))} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block mb-2">
          Start Time:
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block mb-2">
          End Time:
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block mb-2">
          Break Duration (in minutes):
          <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(parseInt(e.target.value))} className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4" onClick={generateSchedule}>
          Generate Schedule
        </button>
      </div>
      <div className="md:w-1/2">
        {schedule.length > 0 && (
          <table className="table-auto border-collapse border border-gray-500">
            <thead>
              <tr>
                <th className="border border-gray-500 px-4 py-2">Subject</th>
                <th className="border border-gray-500 px-4 py-2">Start Time</th>
                <th className="border border-gray-500 px-4 py-2">End Time</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.subject}>
                  <td className="border border-gray-500 px-4 py-2">{item.subject}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.start.toLocaleTimeString()}</td>
                  <td className="border border-gray-500 px-4 py-2">{item.end.toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}