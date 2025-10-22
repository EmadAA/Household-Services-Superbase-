import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const FAQItem = ({ faq, index, openIndex, toggleFAQ }) => {
  const isOpen = openIndex === index;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full flex justify-between items-center p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-medium text-gray-800">{faq.question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? (
            <FaMinus className="w-5 h-5 text-teal-600" />
          ) : (
            <FaPlus className="w-5 h-5 text-teal-600" />
          )}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 animate-fadeIn">
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Deep House Cleaning Service",
      answer: "Give Your Home A Fresh New Look And Feel That You Especially After A Long Day Of Work. Our Deep Clean Will Help Bring Your Property Back Up To Scratch"
    },
    {
      id: 2,
      question: "Sylhet Home Cleaning Company",
      answer: "We are a trusted cleaning company serving in Sylhet city and surrounding areas with professional house cleaning services tailored to meet your needs."
    },
    {
      id: 3,
      question: "100% Secure Online Payments",
      answer: "All transactions are processed through secure payment gateways with encryption to protect your personal and financial information."
    },
    {
      id: 4,
      question: "Fast, Same Day Booking Confirmation",
      answer: "Book your cleaning service and receive instant confirmation. We aim to confirm all bookings within minutes of submission."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1">
           
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-16 h-1 bg-teal-600 mr-2"></div>
                <h3 className="text-[35px] font-semibold text-teal-600 uppercase tracking-wider">ASKED QUESTIONS</h3>
                <div className="w-16 h-1 bg-teal-600 mr-2"></div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                General Frequently Asked Questions
              </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  openIndex={openIndex}
                  toggleFAQ={toggleFAQ}
                />
              ))}
            </div>
          </div>
        </div>
      </div>


      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default FAQSection;