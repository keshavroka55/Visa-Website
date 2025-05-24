"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@supabase/supabase-js"
import { Clock, Filter, Search, MapPin, Briefcase, Calendar, Upload, ArrowRight, AlertTriangle, X } from "lucide-react"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}
const supabase = createClient(supabaseUrl, supabaseKey)

interface Job {
  id: number
  title: string
  country: string
  location: string
  type: string
  duration: string
  posted_date: string
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
    passportFile: null as File | null,
    cvFile: null as File | null,
    certificatesFile: null as File | null,
  })

  // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("posted_date", { ascending: false })

        if (error) {
          console.error("Error fetching jobs:", error.message, error.details)
          return
        }

        const fetchedJobs: Job[] = data.map((job) => ({
          id: job.id,
          title: job.title,
          country: job.country,
          location: job.location,
          type: job.type,
          duration: job.duration,
          posted_date: job.posted_date,
          description: job.description,
          requirements: job.requirements,
          salary: job.salary,
        }))

        setJobs(fetchedJobs)
        setFilteredJobs(fetchedJobs)

        const recentJobs = fetchedJobs.filter((job) => {
          const postedDate = new Date(job.posted_date)
          const today = new Date()
          const daysDifference = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 3600 * 24))
          return daysDifference < 10
        })

        setShowAlert(recentJobs.length > 0)
      } catch (error: any) {
        console.error("Unexpected error fetching jobs:", error.message)
      }
    }

    fetchJobs()
  }, [])

  // Filter jobs
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

  // Handle job selection
  const handleJobSelect = (job: Job) => {
    setSelectedJob(job)
    setFormData((prev) => ({ ...prev, jobInterest: job.title }))
    const formElement = document.getElementById("application-form")
    if (formElement) {
      window.scrollTo({ top: formElement.offsetTop - 100, behavior: "smooth" })
    }
  }

  // Handle alert click
  const handleAlertClick = () => {
    const sortedJobs = [...jobs].sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime())
    const recentJob = sortedJobs[0]
    setSelectedJob(recentJob)
    setFormData((prev) => ({ ...prev, jobInterest: recentJob.title }))
    const formElement = document.getElementById("application-form")
    if (formElement) {
      window.scrollTo({ top: formElement.offsetTop - 100, behavior: "smooth" })
    }
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.files ? e.target.files[0] : null,
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedJob) {
      alert("Please select a job to apply for.")
      return
    }

    try {
      // Upload files to Supabase Storage
      const filePaths: { [key: string]: string | null } = {
        passportFile: null,
        cvFile: null,
        certificatesFile: null,
      }

      for (const key of ["passportFile", "cvFile", "certificatesFile"] as const) {
        const file = formData[key]
        if (file) {
          const fileExt = file.name.split(".").pop()
          const fileName = `${Date.now()}-${key}.${fileExt}`
          console.log(`Uploading ${key} to documents bucket: ${fileName}`)
          const { data, error } = await supabase.storage.from("documents").upload(fileName, file)
          if (error) {
            console.error(`Storage error for ${key}:`, error.message, error)
            throw new Error(`Failed to upload ${key}: ${error.message}`)
          }
          filePaths[key] = data?.path || null
          console.log(`Uploaded ${key}: ${filePaths[key]}`)
        }
      }

      // Insert form and job data
      const applicationData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        job_interest: formData.jobInterest,
        job_id: selectedJob.id,
        job_title: selectedJob.title,
        job_country: selectedJob.country,
        job_location: selectedJob.location,
        job_type: selectedJob.type,
        job_salary: selectedJob.salary,
        passport_file_path: filePaths.passportFile,
        cv_file_path: filePaths.cvFile,
        certificates_file_path: filePaths.certificatesFile,
      }
      console.log("Inserting application:", applicationData)
      const { error } = await supabase.from("applications").insert(applicationData)
      if (error) {
        console.error("Database error:", error.message, error.details, error.hint)
        throw new Error(`Failed to insert application: ${error.message}`)
      }

      alert("Application submitted successfully! We will contact you soon.")

      // Reset form and hide it
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        jobInterest: "",
        passportFile: null,
        cvFile: null,
        certificatesFile: null,
      })
      setSelectedJob(null)
    } catch (error: any) {
      console.error("Error submitting application:", error.message, error)
      alert(`Failed to submit application: ${error.message}. Please try again.`)
    }
  }

  // Reset selected job
  const handleResetJob = () => {
    setSelectedJob(null)
    setFormData((prev) => ({ ...prev, jobInterest: "" }))
  }

  // Get unique countries
  const countries = Array.from(new Set(jobs.map((job) => job.country)))

  // Get unique job types
  const jobTypes = Array.from(new Set(jobs.map((job) => job.type)))

  return (
    <div>
      {/* Hero Section */}
      <section className="section bg-blue-700 text-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Job Opportunities</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Browse and apply for international job opportunities across multiple countries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert for Recent Jobs */}
      {showAlert && (
        <motion.div
          className="container-custom section bg-yellow-50 border-l-4 border-red-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center cursor-pointer" onClick={handleAlertClick}>
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-lg md:text-xl text-red-700">
                <span className="font-medium">New job opportunities available!</span> Check out our latest openings for
                exciting roles. Click to view.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Job Search and Filter */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="bg-gray-50 rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-base bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md text-base bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Available Positions ({filteredJobs.length})</h2>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <p className="text-lg md:text-xl text-gray-600">No jobs found matching your criteria.</p>
              <button
                className="mt-4 btn btn-outline text-base"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map((job) => {
                const postedDate = new Date(job.posted_date)
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
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-bold">{job.title}</h3>
                        {isRecent && (
                          <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                            New
                          </span>
                        )}
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600 text-base">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>
                            {job.location}, {job.country}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-base">
                          <Briefcase className="h-5 w-5 mr-2" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-base">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-base">
                          <Clock className="h-5 w-5 mr-2" />
                          <span>Posted: {job.posted_date}</span>
                        </div>
                      </div>
                      <button className="w-full btn btn-primary flex justify-center items-center text-base">
                        Apply Now <ArrowRight className="ml-2 h-5 w-5" />
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
      {selectedJob && (
        <section id="application-form" className="section bg-gray-50">
          <div className="container-custom">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Apply for {selectedJob.title}</h2>
              <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto">
                Complete the form below to apply for the {selectedJob.title} position in {selectedJob.country}.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md p-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold">{selectedJob.title}</h3>
                <button
                  onClick={handleResetJob}
                  className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
                >
                  <X className="h-5 w-5 mr-1" /> Clear Selection
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-gray-500 mb-1 text-sm">Location</p>
                  <p className="font-medium text-base">{selectedJob.location}, {selectedJob.country}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-sm">Duration</p>
                  <p className="font-medium text-base">{selectedJob.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 text-sm">Salary Range</p>
                  <p className="font-medium text-base">{selectedJob.salary}</p>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-gray-500 mb-2 text-sm">Job Description</p>
                <p className="text-base">{selectedJob.description}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-2 text-sm">Requirements</p>
                <ul className="list-disc pl-5 space-y-1 text-base">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-base font-medium text-gray-700 mb-2">
                      Your Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="jobInterest" className="block text-base font-medium text-gray-700 mb-2">
                      Job Interest *
                    </label>
                    <input
                      type="text"
                      id="jobInterest"
                      name="jobInterest"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.jobInterest}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Document Uploads (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <label htmlFor="passportFile" className="block text-base font-medium text-gray-700 mb-2">
                        Passport (PDF/JPG)
                      </label>
                      <div className="flex items-center">
                        <label className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                          <Upload className="mr-2 h-5 w-5" />
                          <span>{formData.passportFile ? formData.passportFile.name : "Upload"}</span>
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
                    <div>
                      <label htmlFor="cvFile" className="block text-base font-medium text-gray-700 mb-2">
                        CV/Resume (PDF/DOCX)
                      </label>
                      <div className="flex items-center">
                        <label className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                          <Upload className="mr-2 h-5 w-5" />
                          <span>{formData.cvFile ? formData.cvFile.name : "Upload"}</span>
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
                    <div>
                      <label htmlFor="certificatesFile" className="block text-base font-medium text-gray-700 mb-2">
                        Certificates (PDF/JPG)
                      </label>
                      <div className="flex items-center">
                        <label className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                          <Upload className="mr-2 h-5 w-5" />
                          <span>{formData.certificatesFile ? formData.certificatesFile.name : "Upload"}</span>
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
                  <button type="submit" className="btn bg-green-600 text-white hover:bg-green-700 px-8 py-3 text-base">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default JobApply