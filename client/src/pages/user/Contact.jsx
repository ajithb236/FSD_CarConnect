import Footers from "../../components/Footer"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Contact() {
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: "MIT Manipal, Eshwar Nagar, Manipal, Karnataka 576104, India"
    },
    {
      icon: FaPhone,
      title: "Phone",
      details: "+91-820-292-1500"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: "support@carconnect.com"
    },
    {
      icon: FaClock,
      title: "Hours",
      details: "Mon - Sun: 6:00 AM - 11:00 PM"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg">We're here to help. Reach out to us anytime!</p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <IconComponent className="text-green-500 text-3xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Team Info */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Team</h3>
            <p className="text-gray-600">Car Connect operates from MIT Manipal campus with a dedicated team of professionals committed to providing the best car rental experience.</p>
          </div>
        </div>
      </div>
      <Footers />
    </>
  )
}

export default Contact
