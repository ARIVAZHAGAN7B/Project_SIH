import Navbar from "../components/Navbar";
import RoutePage from "../routes/RoutePage";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="Kolam AI" />
      <main className="px-[100px]">
        <div className="w-full">
          <RoutePage />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
