import { useEffect, useState } from "react";
import { FaStar, FaCalendarAlt } from "react-icons/fa";
import { supabase } from "../../../supabaseClient";
import Img from "../../assets/images/image.png";

export default function CompletedWorks() {
  const [completedWorks, setCompletedWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompletedWorks();
  }, []);

  useEffect(() => {
    if (completedWorks.length > 0) {
      const uniqueCategories = [
        ...new Set(completedWorks.map((work) => work.category)),
      ];
      setCategories(uniqueCategories.sort());
    }
  }, [completedWorks]);

  useEffect(() => {
    let filtered = completedWorks;
    if (selectedCategory !== "all") {
      filtered = filtered.filter((work) => work.category === selectedCategory);
    }
    setFilteredWorks(filtered);
  }, [selectedCategory, completedWorks]);

  const fetchCompletedWorks = async () => {
    try {
      setError(null);

      // Fetch all completed services
      const { data: services, error: servicesError } = await supabase
        .from("request_services")
        .select("*")
        .eq("status", "Completed")
        .order("ordered_at", { ascending: false });

      if (servicesError) throw servicesError;

      // Fetch ALL reviews in a single query
      const { data: reviews, error: reviewsError } = await supabase
        .from("service_reviews")
        .select("*");

      if (reviewsError) throw reviewsError;

      // Build a lookup map: service_request_id -> review
      const reviewMap = {};
      (reviews || []).forEach((review) => {
        reviewMap[review.service_request_id] = review;
      });

      // Merge reviews into services
      const servicesWithReviews = (services || []).map((service) => ({
        ...service,
        review: reviewMap[service.id] || null,
      }));

      setCompletedWorks(servicesWithReviews);
      setFilteredWorks(servicesWithReviews);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError(`Fetch Error: ${error.message}`);
      setCompletedWorks([]);
      setFilteredWorks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const formatCategory = (category) => {
    if (!category) return "N/A";
    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    if (!rating) rating = 0;
    const numRating = typeof rating === "string" ? parseFloat(rating) : rating;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`h-4 w-4 ${
              star <= numRating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {numRating.toFixed(2)}/5.0
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-8 shadow-xl md:w-[85%] lg:w-full">
        <div className="text-center">
          <div className="text-xl">Loading completed works...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 mb-10 w-[90%] max-w-7xl rounded-xl border-2 border-gray-200 bg-white p-4 shadow-xl md:w-[85%] lg:w-full">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Completed Works & Reviews
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Total completed tasks: {filteredWorks.length}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6 max-w-xs">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {formatCategory(category)}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      {error ? (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => fetchCompletedWorks()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      ) : filteredWorks.length === 0 ? (
        <div className="mt-8 text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Completed Works Yet
          </h3>
          <p className="text-gray-500">No completed tasks in the system yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="rounded-lg border-2 border-gray-200 bg-white overflow-hidden shadow-md transition-all hover:shadow-lg hover:border-teal-300"
            >
              {/* Image Section */}
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                <img
                  src={Img}
                  alt={work.service_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {formatCategory(work.category)}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-3">
                {/* Service Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {work.service_name}
                  </h3>
                </div>

                {/* Pricing Section */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded border border-green-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Price:</span> ৳{work.price}
                  </p>
                </div>

                {/* Customer Info */}
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Customer:</span>{" "}
                    {work.customer_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span>{" "}
                    {work.customer_number}
                  </p>
                </div>

                {/* Service Details */}
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span> {work.address}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Service Date:</span>{" "}
                    {formatDate(work.date)}
                  </p>
                </div>

                {/* Review Section */}
                {work.review ? (
                  <div className="border-t pt-3 space-y-2 bg-yellow-50 p-3 rounded">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-800">Review</h4>
                      <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded font-medium">
                        ⭐ Reviewed
                      </span>
                    </div>

                    {/* Reviewer Info */}
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">By:</span>{" "}
                      {work.review.reviewer_name}
                    </p>

                    {/* Overall Rating */}
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">
                        Overall Rating
                      </p>
                      {renderStars(work.review.average_rating)}
                    </div>

                    {/* Individual Ratings */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white p-2 rounded text-center border border-gray-200">
                        <p className="font-medium text-gray-700 text-xs">
                          Behavior
                        </p>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={`behavior-${i}`}
                              className={`h-3 w-3 ${
                                i < work.review.behavior
                                  ? "text-blue-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-2 rounded text-center border border-gray-200">
                        <p className="font-medium text-gray-700 text-xs">
                          Timing
                        </p>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={`timing-${i}`}
                              className={`h-3 w-3 ${
                                i < work.review.timing
                                  ? "text-purple-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="bg-white p-2 rounded text-center border border-gray-200">
                        <p className="font-medium text-gray-700 text-xs">
                          Quality
                        </p>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={`quality-${i}`}
                              className={`h-3 w-3 ${
                                i < work.review.quality
                                  ? "text-green-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    {work.review.review && (
                      <div className="bg-white p-2 rounded border border-gray-200">
                        <p className="text-xs text-gray-700 italic">
                          "{work.review.review}"
                        </p>
                      </div>
                    )}

                    {/* Review Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 border-t pt-2">
                      <FaCalendarAlt className="h-3 w-3" />
                      <span>
                        Reviewed: {formatDate(work.review.created_at)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="border-t pt-3 bg-gray-50 p-3 rounded text-center">
                    <p className="text-sm text-gray-600 font-medium">
                      ⏳ No Review Given
                    </p>
                  </div>
                )}

                {/* Status */}
                <div className="flex gap-2">
                  {work.user_done && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      ✓ User Approved
                    </span>
                  )}
                  {work.tech_done && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      ✓ Tech Completed
                    </span>
                  )}
                </div>

                {/* Date Ordered */}
                <div className="flex items-center gap-2 text-xs text-gray-500 border-t pt-3">
                  <FaCalendarAlt className="h-3 w-3" />
                  <span>Ordered: {formatDate(work.ordered_at)}</span>
                </div>

                {/* Completed Badge */}
                <div className="bg-green-100 border border-green-300 rounded p-2 text-center">
                  <span className="text-sm font-semibold text-green-800">
                    ✓ Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}