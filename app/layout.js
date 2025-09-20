import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
   variable: "--font-inter",
   subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
   variable: "--font-jetbrains-mono",
   subsets: ["latin"],
});

export const metadata = {
   title: "MeteoWiz",
   description: "Weather observation and METAR generation tool",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
            {children}
         </body>
      </html>
   );
}
