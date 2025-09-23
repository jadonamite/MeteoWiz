import MeteorologicalNavbar from '@/components/MeteorologicalNavbar';

export async function getServerSideProps() {
  return {
    props: {
      serverTime: Date.now() // Pass server timestamp to client
    }
  };
}

export default function HomePage({ serverTime }) {
  return (
    <div>
      <MeteorologicalNavbar serverTime={serverTime} />
    </div>
  );
}