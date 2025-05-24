"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, Globe, Shield, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "../context/LanguageContext"

const Home = () => {
  const { t, language } = useLanguage()

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-700" />,
      value: "5000+",
      label: t("home.stats.clients"),
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-700" />,
      value: "15+",
      label: t("home.stats.countries"),
    },
    {
      icon: <Award className="h-6 w-6 text-blue-700" />,
      value: "98%",
      label: t("home.stats.success"),
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-700" />,
      value: "100%",
      label: t("home.stats.trust"),
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10 md:py-14">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">{t("home.hero.title")}</h1>
              <p className="text-base md:text-lg text-blue-100 mb-6">{t("home.hero.subtitle")}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/szervices" className="btn bg-white text-blue-700 hover:bg-blue-50">
                  {t("home.button.services")}
                </Link>
                <Link to="/job-apply" className="btn bg-green-600 text-white hover:bg-green-700">
                  {t("home.button.apply")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Global visa services"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 md:p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container-custom">
          <motion.div className="text-center mb-8 md:mb-10" {...fadeIn}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">{t("home.featured.title")}</h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{t("home.featured.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                country: "Malaysia",
                image: "/placeholder.svg?height=200&width=300",
                description:
                  language === "en"
                    ? "Comprehensive work visa services for Malaysia with trusted employment partners."
                    : "मलेसियाका लागि विश्वसनीय रोजगारी साझेदारहरूसँग व्यापक कार्य भिसा सेवाहरू।",
                featured: true,
              },
              {
                country: "UAE",
                image: "/placeholder.svg?height=200&width=300",
                description:
                  language === "en"
                    ? "Employment opportunities and visa processing for the United Arab Emirates."
                    : "संयुक्त अरब इमिरेट्सका लागि रोजगारी अवसरहरू र भिसा प्रक्रिया।",
                featured: false,
              },
              {
                country: "Japan",
                image: "/placeholder.svg?height=200&width=300",
                description:
                  language === "en"
                    ? "Technical and skilled worker visas for Japan with language support."
                    : "जापानका लागि भाषा सहयोगसहित प्राविधिक र कुशल कामदार भिसाहरू।",
                featured: false,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className={`card overflow-hidden ${service.featured ? "border-2 border-blue-500" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.country} visa services`}
                    className="w-full h-36 object-cover"
                  />
                  {service.featured && (
                    <div className="absolute top-0 right-0 bg-blue-700 text-white py-1 px-2 text-xs font-medium">
                      {language === "en" ? "Popular" : "लोकप्रिय"}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">
                    {service.country} {language === "en" ? "Visa Services" : "भिसा सेवाहरू"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <Link
                    to="/services"
                    className="text-blue-700 font-medium hover:text-blue-800 flex items-center text-sm"
                  >
                    {t("common.learnMore")} <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="btn btn-outline">
              {t("home.featured.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-8 md:py-12 bg-blue-700 text-white">
        <div className="container-custom">
          <motion.div className="text-center mb-8 md:mb-10" {...fadeIn}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 text-white">
              {t("home.testimonials.title")}
            </h2>
            <p className="text-sm md:text-base text-blue-100 max-w-2xl mx-auto">{t("home.testimonials.subtitle")}</p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-4 md:p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <img
                src="/placeholder.svg?height=80&width=80"
                alt="Client testimonial"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm md:text-base italic mb-3">
                  {language === "en"
                    ? '"VisaCenter helped me secure a great job in Malaysia as an Electrician. The entire process was smooth, and their support throughout my application was exceptional. I\'m now earning three times what I made before!"'
                    : '"भिसा सेन्टरले मलाई मलेसियामा इलेक्ट्रिसियनको रूपमा राम्रो जागिर सुरक्षित गर्न मद्दत गर्यो। सम्पूर्ण प्रक्रिया सहज थियो, र मेरो आवेदनभरि उनीहरूको समर्थन असाधारण थियो। म अहिले पहिलेको तुलनामा तीन गुणा बढी कमाइरहेको छु!"'}
                </p>
                <div>
                  <h4 className="font-bold text-base">Ahmed Rahman</h4>
                  <p className="text-sm text-gray-600">
                    {language === "en" ? "Electrician, Malaysia" : "इलेक्ट्रिसियन, मलेसिया"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center mt-6 md:mt-8">
            <Link to="/clients" className="btn bg-white text-blue-700 hover:bg-blue-50">
              {t("home.testimonials.more")}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-4 md:p-8 shadow-lg text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">{t("home.cta.title")}</h2>
            <p className="text-sm md:text-base text-blue-100 mb-4 md:mb-6 max-w-2xl mx-auto">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/job-apply" className="btn bg-green-600 text-white hover:bg-green-700">
                {t("home.cta.apply")}
              </Link>
              <Link to="/contact" className="btn bg-white text-blue-700 hover:bg-blue-50">
                {t("home.cta.contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
