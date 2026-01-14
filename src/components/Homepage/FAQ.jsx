import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MinusCircle, PlusCircle } from "lucide-react";

// 1. Robust Data Structure
const faqData = [
  {
    id: 1,
    question: "What are the requirements to adopt a pet?",
    answer:
      "We require all potential adopters to be at least 18 years old, have valid identification, and provide proof of address. If you rent your home, we'll also need a copy of your lease agreement stating that pets are allowed.",
  },
  {
    id: 2,
    question: "How long does the application process take?",
    answer:
      "Typically, the process takes 2-5 business days. This allows us time to review your application, contact references, and schedule a meet-and-greet with the pet to ensure a perfect match.",
  },
  {
    id: 3,
    question: "What is included in the adoption fee?",
    answer:
      "Our adoption fees generally range from $50 to $300. This covers spay/neuter surgery, microchipping, initial vaccinations, flea/tick prevention, and a general veterinary wellness exam.",
  },
  {
    id: 4,
    question: "Can I return the pet if it doesn't work out?",
    answer:
      "Yes. We understand that sometimes things don't go as planned. We ask that you return the pet to us rather than rehoming them yourself so we can ensure they find another safe, suitable home.",
  },
  {
    id: 5,
    question: "Do you offer foster-to-adopt programs?",
    answer:
      "Absolutely! Fostering is a great way to see if an animal fits your lifestyle before making a long-term commitment. Please check our 'Foster' page for current opportunities.",
  },
];

const FAQ = () => {
  // State to track which index is open. null means all are closed.
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-wide text-indigo-600 uppercase mb-2">
            Support
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-gray-500 text-lg">
            Have questions about the adoption journey? We're here to help.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`border rounded-xl transition-all duration-300 ${
                activeIndex === index
                  ? "bg-white border-indigo-200 shadow-md"
                  : "bg-white border-gray-200 hover:border-indigo-300"
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between p-6 focus:outline-none"
                aria-expanded={activeIndex === index}
              >
                <span
                  className={`text-lg font-semibold transition-colors ${
                    activeIndex === index ? "text-indigo-700" : "text-gray-800"
                  }`}
                >
                  {item.question}
                </span>

                {/* Icon Animation */}
                <span className="ml-4 flex-shrink-0 text-indigo-500">
                  {activeIndex === index ? (
                    <MinusCircle className="w-5 h-5" />
                  ) : (
                    <PlusCircle className="w-5 h-5" />
                  )}
                </span>
              </button>

              {/* Smooth Height Animation */}
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key={item.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Call to Action footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{" "}
            <a
              href="/contact"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
