"use client"

import { motion } from "framer-motion"
import { Check, Award, Shield, Globe, TrendingUp } from "lucide-react"

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const partners = [
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
  ]

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-blue-700" />,
      title: "Trust & Credibility",
      description:
        "We maintain 100% transparency in our processes and have built a reputation of trust with our clients and partners.",
    },
    {
      icon: <Award className="h-12 w-12 text-blue-700" />,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, ensuring the highest standards in visa processing and job placement.",
    },
    {
      icon: <Globe className="h-12 w-12 text-blue-700" />,
      title: "Global Network",
      description:
        "Our extensive network of international employers and partners enables us to offer diverse opportunities across multiple countries.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-700" />,
      title: "Continuous Growth",
      description:
        "We constantly expand our services and improve our processes to better serve the evolving needs of our clients.",
    },
  ]

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About VisaCenter</h1>
            <p className="text-xl text-blue-100">
              Your trusted partner for international visa services and job opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, VisaCenter began with a simple mission: to connect skilled workers with international
                employment opportunities through reliable visa services.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we have grown into a trusted name in the visa and immigration industry, serving
                thousands of clients and maintaining a remarkable 98% success rate in visa approvals.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of visa experts, immigration consultants, and job placement specialists work together to
                provide comprehensive solutions tailored to each client's unique needs and aspirations.
              </p>

              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-2">
                {[
                  "Experienced team with deep understanding of visa processes",
                  "Strong relationships with employers across multiple countries",
                  "Transparent procedures with no hidden fees",
                  "Personalized support throughout your journey",
                  "98% visa approval success rate",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="VisaCenter team"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at VisaCenter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Our Trusted Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with reputable employers and agencies worldwide to provide the best opportunities for our
              clients.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={partner || "/placeholder.svg"}
                  alt={`Partner company ${index + 1}`}
                  className="h-16 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-12" {...fadeIn}>
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals who lead our visa and immigration services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "Chief Executive Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Chen",
                position: "Visa Operations Director",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Maria Rodriguez",
                position: "International Relations Manager",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Ahmed Khan",
                position: "Client Success Manager",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-700">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
