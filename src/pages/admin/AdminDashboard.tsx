"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit, LogOut, Briefcase, MapPin, Calendar, DollarSign, Search, Filter } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

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

const AdminDashboard = () => {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    location: "",
    type: "",
    duration: "",
    description: "",
    requirements: "",
    salary: "",
  })

  // Load jobs from localStorage on mount
  useEffect(() => {
    const storedJobs = localStorage.getItem("admin_jobs")
    if (storedJobs) {
      try {
        const parsedJobs = JSON.parse(storedJobs)
        setJobs(parsedJobs)
        setFilteredJobs(parsedJobs)
      } catch (error) {
        console.error("Error loading jobs:", error)
      }
    } else {
      // Initialize with some default jobs
      const defaultJobs = [
        {
          id: 1,
          title: "Electrician",
          country: "Malaysia",
          location: "Kuala Lumpur",
          type: "Electrician",
          duration: "2 years",
          postedDate: new Date().toISOString().split("T")[0],
          description: "We are looking for experienced electricians to work on commercial and residential projects.",
          requirements: ["Minimum 3 years experience", "Electrical certification", "English communication skills"],
          salary: "MYR 3,500 - 4,500 per month",
        },
        {
          id: 2,
          title: "Factory Worker",
          country: "Japan",
          location: "Osaka",
          type: "Factory Worker",
          duration: "3 years",
          postedDate: new Date().toISOString().split("T")[0],
          description: "Assembly line workers needed for electronics manufacturing plant.",
          requirements: ["Good manual dexterity", "Ability to stand for long periods", "Basic English"],
          salary: "JPY 180,000 - 220,000 per month",
        },
      ]
      setJobs(defaultJobs)
      setFilteredJobs(defaultJobs)
      localStorage.setItem("admin_jobs", JSON.stringify(defaultJobs))
    }
  }, [])

  // Filter jobs based on search and country
  useEffect(() => {
    let result = [...jobs]

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

    if (selectedCountry) {
      result = result.filter((job) => job.country === selectedCountry)
    }

    setFilteredJobs(result)
  }, [jobs, searchTerm, selectedCountry])

  // Save jobs to localStorage
  const saveJobs = (updatedJobs: Job[]) => {
    localStorage.setItem("admin_jobs", JSON.stringify(updatedJobs))
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requirementsArray = formData.requirements
      .split("\n")
      .filter((req) => req.trim() !== "")
      .map((req) => req.trim())

    if (editingJob) {
      // Update existing job
      const updatedJobs = jobs.map((job) =>
        job.id === editingJob.id
          ? {
              ...job,
              ...formData,
              requirements: requirementsArray,
            }
          : job,
      )
      setJobs(updatedJobs)
      saveJobs(updatedJobs)
      setEditingJob(null)
    } else {
      // Add new job
      const newJob: Job = {
        id: Date.now(),
        ...formData,
        requirements: requirementsArray,
        postedDate: new Date().toISOString().split("T")[0],
      }
      const updatedJobs = [...jobs, newJob]
      setJobs(updatedJobs)
      saveJobs(updatedJobs)
    }

    // Reset form
    setFormData({
      title: "",
      country: "",
      location: "",
      type: "",
      duration: "",
      description: "",
      requirements: "",
      salary: "",
    })
    setShowAddForm(false)
  }

  // Handle edit job
  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      country: job.country,
      location: job.location,
      type: job.type,
      duration: job.duration,
      description: job.description,
      requirements: job.requirements.join("\n"),
      salary: job.salary,
    })
    setShowAddForm(true)
  }

  // Handle delete job
  const handleDelete = (jobId: number) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      const updatedJobs = jobs.filter((job) => job.id !== jobId)
      setJobs(updatedJobs)
      saveJobs(updatedJobs)
    }
  }

  // Cancel form
  const handleCancel = () => {
    setShowAddForm(false)
    setEditingJob(null)
    setFormData({
      title: "",
      country: "",
      location: "",
      type: "",
      duration: "",
      description: "",
      requirements: "",
      salary: "",
    })
  }

  // Get unique countries for filter
  const countries = Array.from(new Set(jobs.map((job) => job.country)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-700 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Job Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {admin?.username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Countries</p>
                <p className="text-2xl font-bold text-gray-900">{countries.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Recent Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    jobs.filter((job) => {
                      const jobDate = new Date(job.postedDate)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return jobDate >= weekAgo
                    }).length
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Country Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Job Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Job
            </button>
          </div>
        </div>

        {/* Add/Edit Job Form */}
        {showAddForm && (
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingJob ? "Edit Job Posting" : "Add New Job Posting"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    name="country"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <input
                    type="text"
                    name="type"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.type}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    required
                    placeholder="e.g., 2 years"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range *</label>
                  <input
                    type="text"
                    name="salary"
                    required
                    placeholder="e.g., MYR 3,500 - 4,500 per month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.salary}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (one per line) *</label>
                <textarea
                  name="requirements"
                  required
                  rows={4}
                  placeholder="Minimum 3 years experience&#10;Electrical certification&#10;English communication skills"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.requirements}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingJob ? "Update Job" : "Add Job"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Job Postings ({filteredJobs.length})</h3>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No job postings found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900 mr-3">{job.title}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {job.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}, {job.country}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {job.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                      <p className="text-xs text-gray-500">Posted: {job.postedDate}</p>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit job"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
