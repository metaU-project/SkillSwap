import { getSessions } from '../../utils/sessionFetch';
import { useEffect, useState } from 'react';
import './UserSessions.css';
import { FiCalendar } from 'react-icons/fi';
const UserSessions = ({ selectedDate }) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions(selectedDate).then((data) => {
      setSessions(data.sessions);
    });
  }, [selectedDate]);

  const filtered = selectedDate
    ? sessions.filter((session) => {
        const sessionDate = new Date(session.startTime * 1000).toDateString();
        return sessionDate === selectedDate?.toDateString();
      })
    : sessions;

  if (filtered.length === 0) {
    return (
      <div className="no-sessions">
        <FiCalendar className="icon-calendar" /> No upcoming sessions
      </div>
    );
  }

  return (
    <div className="session-list">
      {filtered.map((session) => (
        <div className="session-item" key={session.id}>
          <p>
            <strong>{session.title}</strong>
          </p>
          <p>
            {new Date(session.startTime * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="session-description">
            {session.description || 'No notes provided'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserSessions;
