import "./globals.css";
import { MetarProvider } from "./context/MetarContext";

export const metadata = {
   title: "MeteoWiz.js",
   description: "Built by Jadonamite",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <MetarProvider>{children}</MetarProvider>
         </body>
      </html>
   );
}
