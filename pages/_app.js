import "../styles/globals.css";
import { WeatherProvider } from "../contexts/WeatherContext";

export default function App({ Component, pageProps }) {
   return (
      <WeatherProvider>
         <Component {...pageProps} />
      </WeatherProvider>
   );
}
