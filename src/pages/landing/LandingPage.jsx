import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Navbar/Navbar';

const LandingPage = () => (
  <div className="h-screen flex flex-col">
    {/* Navbar */}
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>

    {/* Main Content */}
    <div className="flex flex-1 pt-[4rem] overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <Layout />
      </div>
    </div>
  </div>
);

export default LandingPage;
