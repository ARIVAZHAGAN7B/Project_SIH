import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppRouter from "../routes/Routes";
import { logo} from "../assets/Assets";
import { f1 } from "../assets/Assets";
const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar title="Kolam AI" logo={logo} userAvatar={f1} />
      <main className="px-[100px]">
        <div className="w-full">
          <AppRouter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
