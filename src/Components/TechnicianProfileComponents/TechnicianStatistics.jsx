import { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient"; 

export default function TechnicianStats() {
  const [stats, setStats] = useState({
    completedOrders: 0,
    totalEarnings: 0,
    averageReview: 0,
  });

  // Example: Fetch data dynamically later
  useEffect(() => {
    // In real app, fetch technician stats from Supabase:
    // Example placeholder for now:
    setStats({
      completedOrders: 24,
      totalEarnings: 8250,
      averageReview: 4.7,
    });
  }, []);

  return (
    <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-6 sm:p-8 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px] bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 pb-4">
        <h2 className="text-xl font-bold text-gray-600">Technician Statistics</h2>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {/* Completed Orders */}
        <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl border border-teal-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Completed Orders</h3>
          <p className="text-3xl font-bold text-teal-600 mt-2">
            {stats.completedOrders}
          </p>
        </div>

        {/* Total Earnings */}
        <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {stats.totalEarnings} TK
          </p>
        </div>

        {/* Review */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Average Review</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            ⭐ {stats.averageReview}
          </p>
        </div>
      </div>
    </div>
  );
}


//this is the  code for showing chart


// import { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Legend,
// } from "recharts";

// export default function TechnicianStats() {
//   const [stats, setStats] = useState({
//     completedOrders: 0,
//     totalEarnings: 0,
//     averageReview: 0,
//   });

//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Placeholder data (replace later with Supabase)
//     setStats({
//       completedOrders: 24,
//       totalEarnings: 8250,
//       averageReview: 4.7,
//     });

//     // Example monthly data
//     setChartData([
//       { month: "Jan", earnings: 800, orders: 3 },
//       { month: "Feb", earnings: 1200, orders: 5 },
//       { month: "Mar", earnings: 950, orders: 4 },
//       { month: "Apr", earnings: 1400, orders: 6 },
//       { month: "May", earnings: 1150, orders: 5 },
//       { month: "Jun", earnings: 1650, orders: 7 },
//     ]);
//   }, []);

//   return (
//     <div className="mt-10 mb-10 shadow-xl gap-6 ml-auto mr-auto box-border border-2 p-6 sm:p-8 rounded-[15px] border-[#E7E7E7] h-auto w-[90%] sm:w-[85%] md:w-[90%] lg:w-[1300px] max-w-[1400px] bg-white">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 pb-4">
//         <h2 className="text-xl font-bold text-gray-600">Technician Statistics</h2>
//       </div>

//       {/* Stats Grid */}
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
//         <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl border border-teal-200 shadow-sm hover:shadow-md transition">
//           <h3 className="text-lg font-semibold text-gray-700">Completed Orders</h3>
//           <p className="text-3xl font-bold text-teal-600 mt-2">
//             {stats.completedOrders}
//           </p>
//         </div>

//         <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-md transition">
//           <h3 className="text-lg font-semibold text-gray-700">Total Earnings</h3>
//           <p className="text-3xl font-bold text-yellow-600 mt-2">
//             {stats.totalEarnings} TK
//           </p>
//         </div>

//         <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition">
//           <h3 className="text-lg font-semibold text-gray-700">Average Review</h3>
//           <p className="text-3xl font-bold text-blue-600 mt-2">
//             ⭐ {stats.averageReview}
//           </p>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="mt-10">
//         <h3 className="text-lg font-semibold text-gray-700 mb-4">
//           Earnings & Orders Trend
//         </h3>

//         <div className="w-full h-[300px] sm:h-[350px] bg-gray-50 rounded-2xl p-4 border border-gray-200">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="earnings" fill="#14b8a6" name="Earnings (TK)" />
//               <Bar dataKey="orders" fill="#60a5fa" name="Orders" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
