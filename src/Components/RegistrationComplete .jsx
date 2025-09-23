// RegistrationComplete.jsx
const RegistrationComplete = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-4">Registration Complete!</h1>
        <p className="text-gray-600 mb-4">
          Your technician registration has been successfully submitted with all required documents.
        </p>
        <p className="text-gray-600 mb-6">
          Your application is now under review. You will be contacted once verification is complete.
        </p>
        <div className="space-y-3">
          <a 
            href="/" 
            className="block bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition"
          >
            Return to Home
          </a>
          <a 
            href="/login" 
            className="block text-teal-500 hover:underline"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComplete;
