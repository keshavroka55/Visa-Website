"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const Clients = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const clients = [
    {
      name: "Ahmed Rahman",
      job: "Electrician",
      country: "Malaysia",
      image: "/placeholder.svg?height=300&width=300",
      testimonial:
        "VisaCenter helped me secure a great job in Malaysia as an Electrician. The entire process was smooth, and their support throughout my application was exceptional. I'm now earning three times what I made before!",
      rating: 5,
    },
    {
      name: "Sofia Patel",
      job: "Chef",
      country: "UAE",
      image: "/placeholder.svg?height=300&width=300",
      testimonial:
        "I had been trying to find work abroad for years without success. VisaCenter made it possible for me to get a position as a Chef in Dubai. Their team guided me through every step and even helped me with accommodation arrangements.",
      rating: 5,
    },
    {
      name: "Carlos Mendez",
      job: "Construction Supervisor",
      country: "Qatar",
      image: "/placeholder.svg?height=300&width=300",
      testimonial:
        "The professional approach of VisaCenter impressed me from day one. They found me a well-paying Construction Supervisor position in Qatar within weeks. The visa process was handled efficiently, and I received clear instructions at every stage.",
      rating: 4,
    },
    {
      name: "Fatima Aziz",
      job: "Factory Worker",
      country: "Japan",
      image: "/placeholder.svg?height=300&width=300",
      testimonial:
        "VisaCenter's Japan program changed my life. They arranged all my documentation, provided language training, and secured a factory job with excellent benefits. Their follow-up support after I arrived in Japan was particularly helpful.",
      rating: 5,
    },
    {
      name: "Victor Novak",
      job: "Plumber",
      country: "Romania",
      image: "/placeholder.svg?height=300&width=300",
      testimonial:
        "Working in an EU country was my dream, and VisaCenter made it a reality. Their knowledge of Romanian work permits and requirements was impressive. I'm now working as a Plumber with great prospects for the future.",
      rating: 4,
    },
    {
      name: "Rajiv Kumar",
      job: "Security Guard",
      country: "Malaysia",
      image: "/placeholder.svg?height=300&width=300",
      testimonial:
        "From application to arrival, VisaCenter provided excellent service. I now work as a Security Guard in Kuala Lumpur with a good salary and benefits. The team was always responsive to my questions and concerns.",
      rating: 5,
    },
  ]

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Success Stories</h1>
            <p className="text-xl text-blue-100">
              Meet some of the thousands of individuals who have found international employment opportunities through
              our services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { value: "5000+", label: "Successful Placements" },
              { value: "98%", label: "Client Satisfaction Rate" },
              { value: "15+", label: "Countries Worldwide" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-3xl font-bold text-blue-700 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Featured Success Story</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear directly from one of our successful clients about their experience.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-64 w-full object-cover md:w-64"
                  src="/placeholder.svg?height=300&width=300"
                  alt="Featured client"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="h-10 w-10 text-blue-700 mr-3 opacity-50" />
                  <div className="uppercase tracking-wide text-sm text-blue-700 font-semibold">Success Story</div>
                </div>
                <p className="mt-2 text-gray-600 italic">
                  "I never thought working abroad would be possible for me. VisaCenter not only helped me secure a job
                  in Malaysia but also guided me through every step of the visa process. Their team was professional,
                  responsive, and genuinely cared about my success. Today, I'm earning more than I ever could have at
                  home and sending money back to support my family. This opportunity has changed my life."
                </p>
                <div className="mt-6">
                  <div className="flex items-center">{renderStars(5)}</div>
                  <p className="mt-2 font-bold">Mohammed Ali</p>
                  <p className="text-blue-700">Factory Supervisor, Malaysia</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Read what our clients have to say about their experience with VisaCenter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">{renderStars(client.rating)}</div>
                  <p className="text-gray-600 italic mb-6">"{client.testimonial}"</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={client.image || "/placeholder.svg"}
                      alt={client.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-bold">{client.name}</p>
                      <p className="text-blue-700">
                        {client.job}, {client.country}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Map */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Global Success</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our clients are successfully working in countries around the world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <img
              src="/placeholder.svg?height=500&width=1000"
              alt="World map showing client placements"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Clients
