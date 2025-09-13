import Navbar from "../components/Navbar";
import RoutePage from "../routes/RoutePage";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (full width, top) */}
      <Navbar />

      {/* Main content with 100px margin left/right */}
      <main className="px-[100px]">
        <div className="w-full">
          <RoutePage/>
        </div>
      </main>

      {/* Footer (full width, bottom) */}
      <Footer />
    </div>
  );
};

export default AppLayout;
