import ServerTimeWrapper from "./components/ServerTimeWrapper";
import DashboardLayout from "./components/DashboardLayout";

export default function HomePage() {
   return (
      <div>
         <ServerTimeWrapper />
         <DashboardLayout />
      </div>
   );
}
