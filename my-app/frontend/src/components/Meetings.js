// src/components/Meetings.js
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import RelaxSvg from './relax.svg';


function Meetings() {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (user?.company) {
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`http://localhost:8081/appointments/${encodeURIComponent(user.company)}`);
          const data = await response.json();
          if (response.ok) {
            console.log(`Appointments fetched for company: ${user.company}`, data);
            setAppointments(data);
          } else {
            console.error(data.error || 'Failed to fetch appointments');
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }
  }, [user]);

  const containerStyle = {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  };

  const relaxSvgStyle = {
    marginTop: '2rem',
    width: '200px',
    height: '200px',
    textAlign: 'center'
  };

  // Heading style
  const headingStyle = {
    color: '#61DAFB',
  };

  // Appointments list styles
  const listStyle = {
    listStyleType: 'none',
    padding: 0,
    marginTop: '2rem',
  };

  // Appointment item styles
  const appointmentItemStyle = {
    border: '2px solid #61DAFB',
    borderRadius: '8px',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#f0f4f8',
  };

  // Appointment title styles
  const titleStyle = {
    marginBottom: '0.5rem',
    color: '#333',
  };

  // Label styles
  const labelStyle = {
    fontWeight: 'bold',
  };

  // No meetings message styles
  const noMeetingsMessageStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#999',
    marginTop: '2rem',
    marginBottom: '200px'
  };

  // Not logged in message styles
  const notLoggedInMessageStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#f44336', // Red color
    marginTop: '2rem',
    marginBottom: '200px'
  };

  // Render based on user and appointments availability
  return (
    <div style={containerStyle}>
      {user ? (
        <>
          <h2 style={headingStyle}>Meetings for {user.company}</h2>
          {appointments.length > 0 ? (
            <ul style={listStyle}>
              {appointments.map((appointment) => (
                <li key={appointment._id} style={appointmentItemStyle}>
                  <h3 style={titleStyle}>{appointment.title}</h3>
                  <p>
                    <span style={labelStyle}>Start:</span> {appointment.start}
                  </p>
                  <p>
                    <span style={labelStyle}>End:</span> {appointment.end}
                  </p>
                  <p>
                    <span style={labelStyle}>Reason:</span> {appointment.reason}
                  </p>
                  <p>
                    <span style={labelStyle}>Person:</span> {appointment.person}
                  </p>
                  <p>
                    <span style={labelStyle}>Location:</span> {appointment.location}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div>
            <p style={noMeetingsMessageStyle}>No Meetings Found</p>
            <img src={RelaxSvg} alt="Relax SVG" style={relaxSvgStyle} />
              </div>
      
          )}
        </>
      ) : (
        <p style={notLoggedInMessageStyle}>Only Registered Users Can See Their Schedule</p>
      )}
    </div>
  );
};

export default Meetings;