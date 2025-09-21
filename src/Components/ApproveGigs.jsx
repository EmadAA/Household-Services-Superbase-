export default function ApproveGigs() {
  // Mock data (will be replaced with real data)
  const cards = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Technician ${i + 1}`,
    nid: `NID-${1000 + i}`,
    service: `Plumbing Service ${i + 1}`,
    category: "Plumbing",
    price: `$${50 + i * 10}`,
  }));

  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl md:w-[85%] lg:w-full">
      {/* Header */}
      <h2 className="border-b-2 pb-4 text-xl font-bold text-gray-500">Approval Request :</h2>

      {/* Scrollable Grid (2 rows visible) */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Scrollable Wrapper */}
        <div className="col-span-full max-h-96 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">{card.name}</h3>
                  <p className="text-sm text-gray-600">NID: {card.nid}</p>
                  <p className="text-sm">
                    <span className="font-medium">Service:</span> {card.service}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Category:</span> {card.category}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Price:</span> {card.price}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="flex-1 rounded bg-teal-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-teal-500 focus:outline-none">
                    Approve
                  </button>
                  <button className="flex-1 rounded bg-red-600 px-3 py-1.5 text-sm font-bold text-white hover:bg-red-500 focus:outline-none">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}