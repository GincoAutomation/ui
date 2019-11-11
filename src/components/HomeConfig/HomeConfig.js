// import React, { useState, useEffect } from 'react';

// function HomeConfig() {
//   const [home, setHome] = useState(0);
//   function fetchConfig() {
//     fetch(`/API/homeconfig`)
//       .then(res => res.json())
//       .then(result => setHome(JSON.parse(result)))
//       .catch(error => console.error('Error:', error));
//   }

//   useEffect(() => {
//     console.log('making API call');
//     fetchConfig();
//     console.log('Result: ');
//     console.log(home);
//   });
//   return <Router HomeConfig={home} />;
// }
