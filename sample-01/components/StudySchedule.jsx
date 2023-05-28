import { useState } from 'react';

export default function StudySchedule() {
  const [examDate, setExamDate] = useState(new Date());
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [subjects, setSubjects] = useState(['Math', 'Science', 'History']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [schedule, setSchedule] = useState([]);

  function generateSchedule() {
    const daysUntilExam = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));
    const totalHours = hoursPerDay * daysUntilExam;
    const hoursPerSubject = totalHours / subjects.length;
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    const hoursPerBlock = (endHour - startHour) / subjects.length;

    const newSchedule = subjects.map((subject, index) => {
      const start = new Date();
      start.setHours(startHour + index * hoursPerBlock);
      const end = new Date(start.getTime() + hoursPerSubject * 60 * 60 * 1000);
      return { subject, start, end };
    });

    setSchedule(newSchedule);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Study Schedule</h2>
      <label className="block mb-2">
        Exam Date:
        <input type="date" value={examDate.toISOString().substr(0, 10)} onChange={(e) => setExamDate(new Date(e.target.value))} />
      </label>
      <label className="block mb-2">
        Hours of Study per Day:
        <input type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(parseInt(e.target.value))} />
      </label>
      <label className="block mb-2">
        Subjects:
        <input type="text" value={subjects.join(',')} onChange={(e) => setSubjects(e.target.value.split(','))} />
      </label>
      <label className="block mb-2">
        Start Time:
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </label>
      <label className="block mb-2">
        End Time:
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </label>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4" onClick={generateSchedule}>
        Generate Schedule
      </button>
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
  );
}