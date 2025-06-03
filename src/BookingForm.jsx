import React, { useState,useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  X,
  Camera,
  Users,
  Mail,
  Phone,
  MessageCircle,
  User,
  Heart,
} from "lucide-react";
import { Link } from "react-router";

const BookingForm = ({  onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    location: "",
    sessionType: "",
    duration: "",
    guests: "",
    budget: "",
    message: "",
    referral: "",
    additionalServices: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const sessionTypes = [
    "Portrait Session",
    "Wedding Photography",
    "Engagement Shoot",
    "Family Portrait",
    "Corporate Headshots",
    "Event Photography",
    "Maternity Shoot",
    "Newborn Photography",
    "Fashion/Editorial",
    "Product Photography",
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
  ];

  const budgetRanges = [
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
  ];

  const additionalServices = [
    "Photo Editing & Retouching",
    "Same-Day Preview",
    "Printed Photo Album",
    "Digital Gallery",
    "Video Highlights",
    "Additional Photographer",
    "Drone Photography",
    "Photo Booth Setup",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "additionalServices") {
        setFormData((prev) => ({
          ...prev,
          additionalServices: checked
            ? [...prev.additionalServices, value]
            : prev.additionalServices.filter((service) => service !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Email service integration (replace with your actual endpoint)
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: `Photography Booking Request - ${formData.sessionType}`,
          _replyto: formData.email,
          booking_details: `
            Client: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone}
            Session Type: ${formData.sessionType}
            Date: ${formData.date}
            Time: ${formData.time}
            Location: ${formData.location}
            Duration: ${formData.duration}
            Number of Guests: ${formData.guests}
            Budget: ${formData.budget}
            Additional Services: ${formData.additionalServices.join(", ")}
            How they heard about us: ${formData.referral}
            Message: ${formData.message}
          `,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setFormData({
            name: "",
            email: "",
            phone: "",
            date: "",
            time: "",
            location: "",
            sessionType: "",
            duration: "",
            guests: "",
            budget: "",
            message: "",
            referral: "",
            additionalServices: [],
          });
          setCurrentStep(1);
          setSubmitStatus("");
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.name &&
          formData.email &&
          formData.phone &&
          formData.sessionType
        );
      case 2:
        return formData.date && formData.time && formData.location;
      case 3:
        return true;
      default:
        return false;
    }
  };

 

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden-scrollbar">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700 hidden-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center ">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Book Your Session
            </h2>
            <p className="text-gray-400 mt-2">
              Let's capture your perfect moments together
            </p>
          </div>
          <Link to="/">
            <button
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 cursor-pointer  "
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                    step <= currentStep
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded transition-colors duration-200 ${
                      step < currentStep
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Personal Info</span>
            <span>Session Details</span>
            <span>Final Details</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 pt-0">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <User className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Let's get to know you
                </h3>
                <p className="text-gray-400">
                  Tell us about yourself and what you're looking for
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Type *
                  </label>
                  <select
                    name="sessionType"
                    value={formData.sessionType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select session type</option>
                    {sessionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Session Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  When & Where
                </h3>
                <p className="text-gray-400">
                  Choose your preferred date, time, and location
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Session Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select duration</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="4 hours">4 hours</option>
                    <option value="Full Day">Full Day</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of People
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select number</option>
                    <option value="1">Just me</option>
                    <option value="2">2 people</option>
                    <option value="3-5">3-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11-20">11-20 people</option>
                    <option value="20+">20+ people</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                    placeholder="Studio, your home, outdoor location, venue address..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Final Details */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Final Details
                </h3>
                <p className="text-gray-400">
                  Help us prepare for your perfect session
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Additional Services (Optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {additionalServices.map((service) => (
                      <label
                        key={service}
                        className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          name="additionalServices"
                          value={service}
                          checked={formData.additionalServices.includes(
                            service
                          )}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-300 text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    name="referral"
                    value={formData.referral}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  >
                    <option value="">Select option</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Friend/Family Referral">
                      Friend/Family Referral
                    </option>
                    <option value="Wedding Vendor">Wedding Vendor</option>
                    <option value="Previous Client">Previous Client</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors duration-200 resize-none"
                    placeholder="Describe your vision, style preferences, special requests, or any other details you'd like to share..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Status */}
          {submitStatus === "success" && (
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-center">
                🎉 Booking request sent successfully! We'll get back to you
                within 24 hours.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-center">
                ❌ Something went wrong. Please try again or contact us
                directly.
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "invisible"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isStepValid()
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Booking Request"}
              </button>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Example usage component
const App = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Photography Booking System
        </h1>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
        >
          Book Your Session
        </button>
      </div>

      <BookingForm
      
        onClose={() => setShowBooking(false)}
        onSubmit={(data) => {
          console.log("Booking data:", data);
          // Handle booking submission
        }}
      />
    </div>
  );
};

export default App;
