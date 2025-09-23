// src/components/ServerTimeWrapper.jsx (Server Component)
import MeteorologicalNavbar from './MeteorologicalNavbar';

export default function ServerTimeWrapper(props) {
  // This runs on the server
  const serverTime = Date.now();
  
  return (
    <MeteorologicalNavbar 
      {...props} 
      serverTime={serverTime} 
    />
  );
}