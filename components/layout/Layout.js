import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({
   children,
   title = "Weather Observer System",
}) {
   return (
      <>
         <Head>
            <title>{title}</title>
            <meta
               name="description"
               content="Professional Weather Observation System"
            />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-6">{children}</main>
            <Footer />
         </div>
      </>
   );
}
