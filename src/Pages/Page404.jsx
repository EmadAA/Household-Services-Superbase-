import { useNavigate } from 'react-router-dom';
import LostImg from '../assets/images/404img.gif';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';


export default function Page404() {
  const navigate = useNavigate();

  return (
  


    <div className="flex flex-col min-h-screen bg-white text-center">
        <Navbar />
      {/* Header */}
      <section className="mt-10">
        <h1 className="text-6xl md:text-8xl font-light text-gray-500">404</h1>
      </section>

      <main className="flex-1 my-8 px-4 ">
        <div className="flex justify-center">
          <img
            src={LostImg}
            alt="Page Not Found"
            className="max-w-full h-auto rounded-lg backdrop-blur-lg shadow-lg"
          />
        </div>
      </main>

      {/* Content */}
      <section className="px-6 pb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-teal-600 mb-4">
          Look like you're lost!
        </h2>
        <p className="text-lg text-gray-500 mb-6 ">
          The page you are looking for is not available!
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold text-lg rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none"
        >
          Go To Home
        </button>
      </section>
      <Footer />
    </div>
  );
}