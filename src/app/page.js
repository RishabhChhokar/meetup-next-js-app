"use client";
import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

async function getMeetUps() {
  try {
    const response = await fetch("/api/new-meetup",
    {
     next : {
      revalidate : 0,
    }});
    if (!response.ok) {
      throw new Error("Failed to fetch meetups");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function MyApp() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    getMeetUps().then((data) => {
      setMeetups(data);
    });
  }, []);

  return <MeetupList meetups={meetups} />;
}

export default MyApp;
