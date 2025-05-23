"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "ne"

// Define context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.clients": "Our Clients",
    "nav.jobs": "Job Apply",
    "nav.contact": "Contact",

    // Home Page
    "home.hero.title": "Your Journey to Global Opportunities Starts Here",
    "home.hero.subtitle":
      "We provide trusted visa services with a 98% success rate, connecting you to international job opportunities with complete confidence.",
    "home.button.services": "Our Services",
    "home.button.apply": "Apply for Jobs",
    "home.stats.clients": "Satisfied Clients",
    "home.stats.countries": "Countries Covered",
    "home.stats.success": "Success Rate",
    "home.stats.trust": "Trust & Security",
    "home.featured.title": "Our Featured Services",
    "home.featured.subtitle":
      "We offer comprehensive visa services for multiple countries, connecting skilled workers with international opportunities.",
    "home.featured.viewAll": "View All Services",
    "home.testimonials.title": "What Our Clients Say",
    "home.testimonials.subtitle":
      "We've helped thousands of skilled workers find international employment opportunities.",
    "home.testimonials.more": "Read More Success Stories",
    "home.cta.title": "Ready to Start Your International Journey?",
    "home.cta.subtitle":
      "Browse our current job openings and apply today. Our team will guide you through every step of the visa process.",
    "home.cta.apply": "Apply for Jobs",
    "home.cta.contact": "Contact Us",

    // Services Page
    "services.hero.title": "Our Visa Services",
    "services.hero.subtitle":
      "We provide comprehensive visa and job placement services across multiple countries, helping you find the perfect international opportunity.",
    "services.process.title": "Our Simple Process",
    "services.process.subtitle":
      "We handle the complex visa process so you don't have to, providing support at every step.",
    "services.process.application": "Application",
    "services.process.application.desc": "Complete our simple application form and submit your documents.",
    "services.process.matching": "Job Matching",
    "services.process.matching.desc": "We match your skills with the right employment opportunities.",
    "services.process.visa": "Visa Processing",
    "services.process.visa.desc": "We handle all paperwork and guide you through the visa process.",
    "services.countries.title": "Destination Countries",
    "services.countries.subtitle": "We provide visa services and job placement for the following countries:",
    "services.countries.featured": "Featured",
    "services.countries.jobs": "Available Jobs:",
    "services.countries.benefits": "Benefits:",
    "services.countries.viewJobs": "View job openings",
    "services.cta.title": "Ready to Start Your International Career?",
    "services.cta.subtitle":
      "Browse our current job openings and apply today. Our team will guide you through every step of the visa process.",
    "services.cta.viewJobs": "View Job Openings",
    "services.cta.contact": "Contact Us",

    // Common
    "common.learnMore": "Learn more",
    "common.apply": "Apply Now",
    "common.submit": "Submit",
    "common.required": "Required",
    "common.optional": "Optional",
  },
  ne: {
    // Navigation
    "nav.home": "गृहपृष्ठ",
    "nav.services": "सेवाहरू",
    "nav.about": "हाम्रो बारेमा",
    "nav.clients": "हाम्रा ग्राहकहरू",
    "nav.jobs": "जागिर आवेदन",
    "nav.contact": "सम्पर्क",

    // Home Page
    "home.hero.title": "तपाईंको वैश्विक अवसरहरूको यात्रा यहाँबाट सुरु हुन्छ",
    "home.hero.subtitle":
      "हामी ९८% सफलता दरका साथ विश्वसनीय भिसा सेवाहरू प्रदान गर्दछौं, तपाईंलाई पूर्ण विश्वासका साथ अन्तर्राष्ट्रिय रोजगारी अवसरहरूसँग जोड्छौं।",
    "home.button.services": "हाम्रा सेवाहरू",
    "home.button.apply": "जागिरको लागि आवेदन दिनुहोस्",
    "home.stats.clients": "सन्तुष्ट ग्राहकहरू",
    "home.stats.countries": "समेटिएका देशहरू",
    "home.stats.success": "सफलता दर",
    "home.stats.trust": "विश्वास र सुरक्षा",
    "home.featured.title": "हाम्रा विशेष सेवाहरू",
    "home.featured.subtitle":
      "हामी धेरै देशहरूका लागि व्यापक भिसा सेवाहरू प्रदान गर्दछौं, कुशल कामदारहरूलाई अन्तर्राष्ट्रिय अवसरहरूसँग जोड्छौं।",
    "home.featured.viewAll": "सबै सेवाहरू हेर्नुहोस्",
    "home.testimonials.title": "हाम्रा ग्राहकहरू के भन्छन्",
    "home.testimonials.subtitle": "हामीले हजारौं कुशल कामदारहरूलाई अन्तर्राष्ट्रिय रोजगारी अवसरहरू खोज्न मद्दत गरेका छौं।",
    "home.testimonials.more": "थप सफलता कथाहरू पढ्नुहोस्",
    "home.cta.title": "तपाईंको अन्तर्राष्ट्रिय यात्रा सुरु गर्न तयार हुनुहुन्छ?",
    "home.cta.subtitle":
      "हाम्रा वर्तमान जागिर खुलाहरू ब्राउज गर्नुहोस् र आज नै आवेदन दिनुहोस्। हाम्रो टोलीले तपाईंलाई भिसा प्रक्रियाको हरेक चरणमा मार्गदर्शन गर्नेछ।",
    "home.cta.apply": "जागिरको लागि आवेदन दिनुहोस्",
    "home.cta.contact": "सम्पर्क गर्नुहोस्",

    // Services Page
    "services.hero.title": "हाम्रा भिसा सेवाहरू",
    "services.hero.subtitle":
      "हामी धेरै देशहरूमा व्यापक भिसा र जागिर स्थापना सेवाहरू प्रदान गर्दछौं, तपाईंलाई उत्तम अन्तर्राष्ट्रिय अवसर खोज्न मद्दत गर्दछौं।",
    "services.process.title": "हाम्रो सरल प्रक्रिया",
    "services.process.subtitle": "हामी जटिल भिसा प्रक्रिया सम्हाल्छौं ताकि तपाईंले गर्नु पर्दैन, हरेक चरणमा सहयोग प्रदान गर्दछौं।",
    "services.process.application": "आवेदन",
    "services.process.application.desc": "हाम्रो सरल आवेदन फारम पूरा गर्नुहोस् र आफ्ना कागजातहरू पेश गर्नुहोस्।",
    "services.process.matching": "जागिर मिलान",
    "services.process.matching.desc": "हामी तपाईंको सीपहरूलाई सही रोजगारी अवसरहरूसँग मिलान गर्छौं।",
    "services.process.visa": "भिसा प्रक्रिया",
    "services.process.visa.desc": "हामी सबै कागजी कार्य सम्हाल्छौं र तपाईंलाई भिसा प्रक्रियामा मार्गदर्शन गर्छौं।",
    "services.countries.title": "गन्तव्य देशहरू",
    "services.countries.subtitle": "हामी निम्न देशहरूका लागि भिसा सेवाहरू र जागिर स्थापना प्रदान गर्दछौं:",
    "services.countries.featured": "विशेष",
    "services.countries.jobs": "उपलब्ध जागिरहरू:",
    "services.countries.benefits": "फाइदाहरू:",
    "services.countries.viewJobs": "जागिर खुलाहरू हेर्नुहोस्",
    "services.cta.title": "तपाईंको अन्तर्राष्ट्रिय करियर सुरु गर्न तयार हुनुहुन्छ?",
    "services.cta.subtitle":
      "हाम्रा वर्तमान जागिर खुलाहरू ब्राउज गर्नुहोस् र आज नै आवेदन दिनुहोस्। हाम्रो टोलीले तपाईंलाई भिसा प्रक्रियाको हरेक चरणमा मार्गदर्शन गर्नेछ।",
    "services.cta.viewJobs": "जागिर खुलाहरू हेर्नुहोस्",
    "services.cta.contact": "सम्पर्क गर्नुहोस्",

    // Common
    "common.learnMore": "थप जान्नुहोस्",
    "common.apply": "अहिले आवेदन दिनुहोस्",
    "common.submit": "पेश गर्नुहोस्",
    "common.required": "आवश्यक",
    "common.optional": "वैकल्पिक",
  },
}

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext)
