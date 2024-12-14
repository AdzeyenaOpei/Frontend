import Footer from './pages/Footer';
import Header from './pages/Header';
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Navigation bar */}
      <main className="flex-grow bg-white px-6 py-8 mt-20"> {/* Added margin-top to avoid overlap */}
        <Outlet /> {/* Render child components */}
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
}
