// src/services/events.js
export const events = [
    {
      id: 1,
      title: "Gaming Expo 2025",
      location: "New York",
      image: "/gaming_expo.jpg",
      description: "La mayor exposición de videojuegos del año con las últimas novedades de la industria."
    },
    {
      id: 2,
      title: "Indie Game Developers Meetup",
      location: "San Francisco",
      image: "/indie_meetup.jpg",
      description: "Encuentro para desarrolladores independientes donde compartir experiencias y conocimientos."
    },
    {
      id: 3,
      title: "Esports Championship",
      location: "Los Angeles",
      image: "/esports.jpg",
      description: "El campeonato de deportes electrónicos más importante con los mejores jugadores del mundo."
    },
    {
      id: 4,
      title: "Retro Gaming Festival",
      location: "Chicago",
      image: "/retro_gaming.jpg",
      description: "Festival dedicado a los videojuegos clásicos con torneos, exposiciones y charlas."
    },
  ];
  
  export const fetchEvents = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(events);
      }, 500);
    });
  };