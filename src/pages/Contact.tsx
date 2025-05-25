"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, MessageCircle } from "lucide-react"

const Contact = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-8 md:py-10">
        <div className="container-custom viewport-contained">
          <motion.div
            className="text-center max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">Contact Us</h1>
            <p className="text-sm md:text-base text-blue-100">
              Have questions about our visa services? Get in touch with our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container-custom viewport-contained">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Our team is here to answer any questions you may have about our visa services, job opportunities, or
                application process. Reach out to us using any of the contact methods below.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-700 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Office</h3>
                    <p className="text-gray-600">
                      123 Visa Street, Global City
                      <br />
                      Business District, 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-700 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone & WhatsApp</h3>
                    <p className="text-gray-600 mb-1">
                      <a href="tel:+1234567890" className="hover:text-blue-700 transition-colors">
                        +1 (234) 567-890
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a
                        href="https://wa.me/1234567890"
                        className="hover:text-blue-700 transition-colors flex items-center"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" /> Chat on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-700 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@visacenter.com" className="hover:text-blue-700 transition-colors">
                        info@visacenter.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Facebook className="h-6 w-6 text-blue-700 mr-4 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Social Media</h3>
                    <p className="text-gray-600">
                      <a
                        href="https://facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-700 transition-colors"
                      >
                        facebook.com/VisaCenter
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visit us at our office to discuss your visa and job opportunities in person.
            </p>
          </motion.div>
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden shadow-md h-[400px] w-full flex items-center justify-center bg-white"
          >
            <img
              src="/gogolemap.png"
              alt="Office location map"
              className="h-full object-contain"
            />
          </motion.div>
        </div>
      </section>


      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our visa services.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How long does the visa process typically take?",
                answer:
                  "Processing times vary by country. For Malaysia, it typically takes 2-4 weeks. Other countries may take anywhere from 1-6 weeks. We'll provide specific timelines during your application process.",
              },
              {
                question: "What documents do I need to apply for a work visa?",
                answer:
                  "Required documents typically include: valid passport, completed application form, recent photos, CV, educational certificates, and any job-specific qualifications. Requirements may vary by country.",
              },
              {
                question: "Do you provide accommodation arrangements?",
                answer:
                  "Many of our job placements include accommodation arrangements. This varies by employer and country. We'll clearly indicate which positions include accommodation in the job descriptions.",
              },
              {
                question: "What are your service fees?",
                answer:
                  "Our fee structure varies depending on the destination country and type of visa. We maintain full transparency about all costs involved. Please contact us for a detailed breakdown of fees for your specific situation.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="mb-6 bg-gray-50 rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Don't see your question here? Get in touch with us directly.</p>
            <a href="9748313642" className="btn btn-primary">
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
