import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { stringify } from "csv-stringify/sync"

// Initialize Supabase client with service key for server-side access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hfxutgisstnobqxalepp.supabase.co",
  process.env.SUPABASE_SERVICE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeHV0Z2lzc3Rub2JxeGFsZXBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODA5ODI2MCwiZXhwIjoyMDYzNjc0MjYwfQ.vPdxzoEIAYKiFpgJ96QpX6CPWDEY6f8XP2eV-di4qkY"
)

export async function GET() {
  try {
    // Fetch all applications (admin access)
    const { data, error } = await supabase
      .from("applications")
      .select("full_name,email,phone,country,job_interest,job_id,job_title,job_country,job_location,job_type,job_salary,created_at")
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    // Define CSV headers
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Country",
      "Job Interest",
      "Job ID",
      "Job Title",
      "Job Country",
      "Job Location",
      "Job Type",
      "Job Salary",
      "Submission Date",
    ]

    // Format data for CSV
    const csvData = data.map((row) => ({
      "Full Name": row.full_name,
      Email: row.email,
      Phone: row.phone,
      Country: row.country,
      "Job Interest": row.job_interest,
      "Job ID": row.job_id,
      "Job Title": row.job_title,
      "Job Country": row.job_country,
      "Job Location": row.job_location,
      "Job Type": row.job_type,
      "Job Salary": row.job_salary,
      "Submission Date": new Date(row.created_at).toISOString(),
    }))

    // Generate CSV
    const csvString = stringify([headers, ...csvData.map(Object.values)])

    // Return CSV as downloadable file
    return new NextResponse(csvString, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=applications-${new Date().toISOString().split("T")[0]}.csv`,
      },
    })
  } catch (error) {
    console.error("Error exporting applications:", error)
    return NextResponse.json({ error: "Failed to export applications" }, { status: 500 })
  }
}