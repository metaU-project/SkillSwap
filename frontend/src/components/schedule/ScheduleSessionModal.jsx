import './ScheduleSessionModal.css';
import { timeSlots, durations } from '../../utils/constants';
import { useState } from 'react';
import { LuCalendar } from 'react-icons/lu';
import { MdAccessTime } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { BiComment } from 'react-icons/bi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ScheduleSessionModal = ({ post }) => {
  const [date, setDate] = useState(null);
  const [duration, setDuration] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="modal-schedule-overlay">
      <div className="modal-schedule">
        <div className="modal-schedule-header">
          <h2>
            <LuCalendar className="icon" />
            Schedule a Session
          </h2>
          <p>
            Book a session for <strong>"{post.title}"</strong> with{' '}
            {post.user.first_name}
          </p>
        </div>
        <div className="modal-schedule-body">
          <label>Select Date</label>
          <Calendar
            selected={date}
            onChange={(date) => setDate(date)}
            className="input"
            placeholderText="Select Date"
            minDate={new Date()}
          />
          <div className="row">
            <div className="column">
              <label className='time-label'>
                <MdAccessTime className="icon-sm" />
                Time
              </label>
              <select
                className="input"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Select Time</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="column">
              <label className='duration-label'>
                <FiUser className="icon-sm" />
                Duration
              </label>
              <select
                className="input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Select Duration</option>
                {durations.map((duration, index) => (
                  <option key={index} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {date && timeSlot && duration && (
            <div className="summary">
              <h4>
                <LuCalendar className="icon-sm" />
                Session Summary
              </h4>
              <p>
                <strong>Date:</strong>{' '}
                {date.toDateString(undefined, {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <p>
                <strong>Time:</strong> {timeSlot}
              </p>
              <p>
                <strong>Duration:</strong> {duration}
              </p>
            </div>
          )}
          <label className='additional-label'>
            {' '}
            <BiComment className="icon-sm" /> Additional Notes
          </label>
          <textarea
            className="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes here..."
          />
        </div>
        <div className="modal-schedule-footer">
          <button className="btn cancel">Cancel</button>
          <button
            className="btn primary"
            disabled={isLoading || !date || !timeSlot || !duration}
          >
            {isLoading ? (
              'Scheduling...'
            ) : (
              <>
                <LuCalendar className="icon-sm" /> Schedule Session
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ScheduleSessionModal;
