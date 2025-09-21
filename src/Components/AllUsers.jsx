import { FaSearch } from "react-icons/fa";
import Img from "../assets/images/Image.png";

export default function AllUsers() {
  const cards = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i+1}@gmail.com`,
    number: `${"0" + 172719916 + i}`,
  }));

  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl md:w-[85%] lg:w-full">
      {/* Header & Search Bar */}
      <div className="flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row">
        <h2 className="text-xl font-bold text-gray-500">All Users :</h2>

        <form className="w-full max-w-md">
          <label htmlFor="search" className="sr-only">
            Search users
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <FaSearch className="h-4 w-4" />
            </div>
            <input
              type="search"
              id="search"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-2 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500"
              placeholder="Search users..."
              required
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-teal-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="col-span-full max-h-96 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="space-y-2">
                <img
                  src={Img}
                  alt="Image"
                  className="rounded-[20px] border-2 border-gray-600"
                />
                <h3 className="font-semibold text-gray-800">{card.name}</h3>
                <p className="text-sm text-gray-600">NID: {card.nid}</p>
                <p className="text-sm">
                  <span className="font-medium">Number:</span> {card.number}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                
                <button className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-500 focus:outline-none">
                  Delete Account
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
