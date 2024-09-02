import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { UserContext } from "./UserContext";
import moment from 'moment-timezone';


function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useContext(UserContext);

  const fetchAppointments = async () => {
    try {
      if (!user?.company) return;
      const response = await fetch(
        `http://localhost:8081/appointments/${encodeURIComponent(user.company)}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log(`Appointments fetched for company: ${user.company}`, data);
        const formattedAppointments = data.map((event) => ({
          ...event,
          id: event._id,
          extendedProps: {
            ...event,
          },
        }));
        setAppointments(formattedAppointments);
      } else {
        console.error(data.error || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const handleEventClick = ({ event }) => {
    console.log("Event Clicked:", event);
    setSelectedEvent({
      _id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      reason: event.extendedProps.reason,
      person: event.extendedProps.person,
    });
  };



const handleEventDrop = async (info) => {
  const { event, oldEvent } = info;
  let newStartDate = moment(event.start).tz('America/Chicago');
  let newEndDate = moment(event.end).tz('America/Chicago');

  if (oldEvent?.start && oldEvent?.end) {
    const originalStartTime = moment(oldEvent.start);
    const originalEndTime = moment(oldEvent.end);

    newStartDate.hours(originalStartTime.hours()).minutes(originalStartTime.minutes()).seconds(originalStartTime.seconds());
    newEndDate.hours(originalEndTime.hours()).minutes(originalEndTime.minutes()).seconds(originalEndTime.seconds());
  }

  await updateAppointment(event.id, {
    start: newStartDate.format('YYYY-MM-DDTHH:mm:ss'),
    end: newEndDate.format('YYYY-MM-DDTHH:mm:ss'),
  });
};
 


  

  const handleEventResize = async (info) => {
    const { event } = info;
    await updateAppointment(event.id, { start: event.start, end: event.end });
  };

  const deleteAppointment = (_id) => {
    fetch(`http://localhost:8081/appointment/delete/${_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Appointment deleted successfully");
        fetchAppointments();
      })
      .catch((error) => console.error("Error deleting appointment:", error));
  };

  const updateAppointment = async (_id, updatedData) => {
    await fetch(`http://localhost:8081/updateAppointment/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Appointment updated:", data);
        fetchAppointments(); // Refresh appointments after updating
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };


  const notLoggedInMessageStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#f44336",
    marginTop: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    marginBottom: "15rem",
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p style={notLoggedInMessageStyle}>
          Only Registered Users Can See their Calendar
        </p>
      </div>
    );
  }

  return (
    <div style={styles}>
      <div className="card" style={cardStyle}>
        <div className="card-header">
          <h2 className="display-4 text-center mb-3">
            <b>Calendar</b>
          </h2>
        </div>
      </div>
      <div
        style={{ backgroundColor: "white", padding: "40px", margin: "100px" }}
      >
        <button className="btn btn-primary mb-4" onClick={fetchAppointments}>
          Calendar
        </button>

        <FullCalendar
          style={cardStyle}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={appointments}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          editable={true}
          timeZone="local" // Set the timeZone property to "local"
        />

        {selectedEvent && (
          <div id="popup">
            <button
              id="closePopup"
              onClick={handleClosePopup}
              style={{
                backgroundColor: "#61DAFB", // Green color
                color: "white", // White text
                border: "none",
                padding: "10px 20px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                fontSize: "16px",
                margin: "4px 2px",
                cursor: "pointer",
                borderRadius: "4px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#21222A")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#61DAFB")
              }
            >
              Close
            </button>
            <div id="popupContent">
              <h2>{selectedEvent.title}</h2>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(selectedEvent.start).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {new Date(selectedEvent.end).toLocaleString()}
              </p>
              <p>
                <strong>Reason:</strong> {selectedEvent.reason}
              </p>
              <p>
                <strong>Person:</strong> {selectedEvent.person}
              </p>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAppointment(selectedEvent._id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#40E0D0",
  color: "white",
  wordWrap: "normal",
  margin: "20px 35%",
  borderRadius: "20px",
  opacity: "0.86",
};

export default Calendar;
