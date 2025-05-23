"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Filter, Search, MapPin, Briefcase, Calendar, Upload, ArrowRight, AlertTriangle } from "lucide-react"

interface Job {
  id: number
  title: string
  country: string
  location: string
  type: string
  duration: string
  postedDate: string
  description: string
  requirements: string[]
  salary: string
}

const JobApply = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [selectedJobType, setSelectedJobType] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    jobInterest: "",
    passportFile: null,
    cvFile: null,
    certificatesFile: null,
  })

  // Mock job data
  useEffect(() => {
    const currentDate = new Date()

    // Generate mock jobs with some recent ones for alert
    const mockJobs: Job[] = [
      {
        id: 1,
        title: "Electrician",
        country: "Malaysia",
        location: "Kuala Lumpur",
        type: "Electrician",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 5)).toISOString().split("T")[0],
        description:
          "We are looking for experienced electricians to work on commercial and residential projects in Kuala Lumpur. The position includes installation, maintenance, and repair of electrical systems.",
        requirements: [
          "Minimum 3 years experience",
          "Electrical certification",
          "English communication skills",
          "Ability to read electrical plans",
        ],
        salary: "MYR 3,500 - 4,500 per month",
      },
      {
        id: 2,
        title: "Factory Worker",
        country: "Japan",
        location: "Osaka",
        type: "Factory Worker",
        duration: "3 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 15)).toISOString().split("T")[0],
        description:
          "Assembly line workers needed for electronics manufacturing plant in Osaka. Training will be provided, including Japanese language lessons.",
        requirements: [
          "Good manual dexterity",
          "Ability to stand for long periods",
          "Basic English",
          "Willingness to learn Japanese",
        ],
        salary: "JPY 180,000 - 220,000 per month",
      },
      {
        id: 3,
        title: "Chef",
        country: "UAE",
        location: "Dubai",
        type: "Cook",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 8)).toISOString().split("T")[0],
        description:
          "International hotel chain seeking experienced chefs for their Dubai location. Various positions available including sous chef, line cook, and pastry chef.",
        requirements: [
          "Culinary degree or equivalent experience",
          "Minimum 2 years in hotel/restaurant kitchen",
          "Knowledge of international cuisines",
          "Food safety certification",
        ],
        salary: "AED 5,000 - 8,000 per month + accommodation",
      },
      {
        id: 4,
        title: "Security Guard",
        country: "Malaysia",
        location: "Penang",
        type: "Security Guard",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 25)).toISOString().split("T")[0],
        description:
          "Security personnel required for shopping malls and commercial buildings in Penang. Responsibilities include patrolling premises, monitoring surveillance systems, and controlling access.",
        requirements: [
          "Previous security experience preferred",
          "Physical fitness",
          "Basic English communication",
          "Clean background check",
        ],
        salary: "MYR 2,800 - 3,200 per month",
      },
      {
        id: 5,
        title: "Construction Worker",
        country: "Qatar",
        location: "Doha",
        type: "Construction Worker",
        duration: "3 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 18)).toISOString().split("T")[0],
        description:
          "Construction workers needed for major infrastructure projects in Doha. Various roles available including general laborers, masons, and carpenters.",
        requirements: [
          "Previous construction experience",
          "Physical stamina",
          "Ability to work in hot climate",
          "Basic safety knowledge",
        ],
        salary: "QAR 1,500 - 2,500 per month + accommodation and meals",
      },
      {
        id: 6,
        title: "Plumber",
        country: "Romania",
        location: "Bucharest",
        type: "Plumber",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 3)).toISOString().split("T")[0],
        description:
          "Experienced plumbers needed for residential and commercial projects in Bucharest. Work includes installation, repair, and maintenance of plumbing systems.",
        requirements: [
          "Plumbing certification",
          "Minimum 2 years experience",
          "Knowledge of plumbing codes",
          "Problem-solving skills",
        ],
        salary: "RON 4,000 - 5,500 per month",
      },
      {
        id: 7,
        title: "Cleaner",
        country: "UAE",
        location: "Abu Dhabi",
        type: "Cleaner",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 12)).toISOString().split("T")[0],
        description:
          "Cleaning staff required for hotels and office buildings in Abu Dhabi. Duties include general cleaning, sanitation, and maintaining cleanliness of assigned areas.",
        requirements: [
          "Previous cleaning experience preferred",
          "Attention to detail",
          "Physical stamina",
          "Basic English communication",
        ],
        salary: "AED 1,800 - 2,500 per month + accommodation",
      },
      {
        id: 8,
        title: "Driver",
        country: "Poland",
        location: "Warsaw",
        type: "Driver",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().split("T")[0],
        description:
          "Professional drivers needed for logistics company in Warsaw. Both delivery and long-haul positions available.",
        requirements: [
          "Valid driver's license",
          "Clean driving record",
          "Experience in professional driving",
          "Basic English or willingness to learn",
        ],
        salary: "PLN 4,500 - 6,000 per month",
      },
      {
        id: 9,
        title: "Technician",
        country: "Japan",
        location: "Tokyo",
        type: "Technician",
        duration: "3 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 2)).toISOString().split("T")[0],
        description:
          "Technical staff needed for automotive manufacturing plant in Tokyo. Roles include equipment maintenance, quality control, and production support.",
        requirements: [
          "Technical certification or degree",
          "Experience with industrial equipment",
          "Problem-solving skills",
          "Willingness to learn Japanese",
        ],
        salary: "JPY 220,000 - 280,000 per month",
      },
      {
        id: 10,
        title: "Waiter/Waitress",
        country: "Qatar",
        location: "Doha",
        type: "Waiter",
        duration: "2 years",
        postedDate: new Date(currentDate.setDate(currentDate.getDate() - 10)).toISOString().split("T")[0],
        description:
          "Food service staff needed for luxury hotels and restaurants in Doha. Experience in fine dining service preferred.",
        requirements: [
          "Previous restaurant experience",
          "Customer service skills",
          "Good English communication",
          "Professional appearance",
        ],
        salary: "QAR 2,500 - 3,500 per month + accommodation and meals",
      },
    ]

    setJobs(mockJobs)
    setFilteredJobs(mockJobs)

    // Check if there are jobs posted within the last 10 days
    const recentJobs = mockJobs.filter((job) => {
      const postedDate = new Date(job.postedDate)
      const today = new Date()
      const daysDifference = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 3600 * 24))
      return daysDifference < 10
    })

    setShowAlert(recentJobs.length > 0)
  }, [])

  // Filter jobs based on selection
  useEffect(() => {
    let result = [...jobs]

    if (selectedCountry) {
      result = result.filter((job) => job.country === selectedCountry)
    }

    if (selectedJobType) {
      result = result.filter((job) => job.type === selectedJobType)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.country.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term) ||
          job.type.toLowerCase().includes(term),
      )
    }

    setFilteredJobs(result)
  }, [selectedCountry, selectedJobType, searchTerm, jobs])

  // Handle job card click
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job)
    window.scrollTo({ top: document.getElementById("application-form")?.offsetTop - 100, behavior: "smooth" })
  }

  // Handle alert click
  const handleAlertClick = () => {
    // Find the most recent job
    const sortedJobs = [...jobs].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())

    const recentJob = sortedJobs[0]
    setSelectedJob(recentJob)
    window.scrollTo({ top: document.getElementById("application-form")?.offsetTop - 100, behavior: "smooth" })
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      })
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Application submitted successfully! We will contact you soon.")

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      jobInterest: selectedJob ? selectedJob.title : "",
      passportFile: null,
      cvFile: null,
      certificatesFile: null,
    })

    setSelectedJob(null)
  }

  // Get unique countries for filter
  const countries = Array.from(new Set(jobs.map((job) => job.country)))

  // Get unique job types for filter
  const jobTypes = Array.from(new Set(jobs.map((job) => job.type)))

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Job Opportunities</h1>
            <p className="text-xl text-blue-100">
              Browse and apply for international job opportunities across multiple countries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert for Recent Jobs */}
      {showAlert && (
        <motion.div
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6 mx-4 md:mx-auto md:max-w-7xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center cursor-pointer" onClick={handleAlertClick}>
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">New job opportunities available!</span> We have recently added new
                positions. Click here to view.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Job Search and Filter */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="bg-gray-50 rounded-xl shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Country Filter */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">All Countries</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Job Type Filter */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                  >
                    <option value="">All Job Types</option>
                    {jobTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">Available Positions ({filteredJobs.length})</h2>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-lg text-gray-600">No jobs found matching your criteria.</p>
              <button
                className="mt-4 btn btn-outline"
                onClick={() => {
                  setSelectedCountry("")
                  setSelectedJobType("")
                  setSearchTerm("")
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => {
                // Check if job is recent (less than 10 days old)
                const postedDate = new Date(job.postedDate)
                const today = new Date()
                const daysDifference = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 3600 * 24))
                const isRecent = daysDifference < 10

                return (
                  <motion.div
                    key={job.id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${
                      selectedJob?.id === job.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleJobSelect(job)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        {isRecent && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>
                            {job.location}, {job.country}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Posted: {job.postedDate}</span>
                        </div>
                      </div>

                      <button className="w-full btn btn-primary flex justify-center items-center">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Apply for a Position</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {selectedJob
                ? `Complete the form below to apply for the ${selectedJob.title} position in ${selectedJob.country}.`
                : "Select a job from above or complete the form below to apply for a position."}
            </p>
          </motion.div>

          {/* Selected Job Details */}
          {selectedJob && (
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedJob.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p className="text-gray-500 mb-1">Location</p>
                  <p className="font-medium">
                    {selectedJob.location}, {selectedJob.country}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Duration</p>
                  <p className="font-medium">{selectedJob.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Salary Range</p>
                  <p className="font-medium">{selectedJob.salary}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 mb-2">Job Description</p>
                <p>{selectedJob.description}</p>
              </div>

              <div>
                <p className="text-gray-500 mb-2">Requirements</p>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Application Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Job Interest */}
                <div className="md:col-span-2">
                  <label htmlFor="jobInterest" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Interest *
                  </label>
                  <input
                    type="text"
                    id="jobInterest"
                    name="jobInterest"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedJob ? selectedJob.title : formData.jobInterest}
                    onChange={handleInputChange}
                    readOnly={selectedJob !== null}
                  />
                </div>
              </div>

              {/* File Attachments */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Document Uploads (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Passport */}
                  <div>
                    <label htmlFor="passportFile" className="block text-sm font-medium text-gray-700 mb-1">
                      Passport (PDF/JPG)
                    </label>
                    <div className="flex items-center">
                      <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>{formData.passportFile ? "File selected" : "Upload"}</span>
                        <input
                          type="file"
                          id="passportFile"
                          name="passportFile"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* CV */}
                  <div>
                    <label htmlFor="cvFile" className="block text-sm font-medium text-gray-700 mb-1">
                      CV/Resume (PDF/DOCX)
                    </label>
                    <div className="flex items-center">
                      <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>{formData.cvFile ? "File selected" : "Upload"}</span>
                        <input
                          type="file"
                          id="cvFile"
                          name="cvFile"
                          className="sr-only"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Certificates */}
                  <div>
                    <label htmlFor="certificatesFile" className="block text-sm font-medium text-gray-700 mb-1">
                      Certificates (PDF/JPG)
                    </label>
                    <div className="flex items-center">
                      <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>{formData.certificatesFile ? "File selected" : "Upload"}</span>
                        <input
                          type="file"
                          id="certificatesFile"
                          name="certificatesFile"
                          className="sr-only"
                          accept=".pdf,.jpg,.jpeg"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 px-8">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JobApply
