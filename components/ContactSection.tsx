"use client"

import type React from "react"

import { useState } from "react"
import { Send, Github, Linkedin, Twitter } from "lucide-react"

const ContactSection = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 여기에 이메일 제출 로직 추가
    console.log("Submitted email:", email)
    setEmail("")
  }

  return (
    <section className="py-24 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">Get in Touch</h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Have a question or want to work together? Drop me a line and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-l-md bg-white/10 border border-blue-300/30 focus:outline-none focus:border-blue-300 text-white placeholder-blue-200"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-r-md hover:from-blue-500 hover:to-blue-700 transition-all duration-200 flex items-center group"
            >
              <Send className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:translate-x-1" />
              Send
            </button>
          </form>
        </div>

        <div className="flex justify-center space-x-8">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white transition-colors"
          >
            <Github className="w-8 h-8" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white transition-colors"
          >
            <Linkedin className="w-8 h-8" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white transition-colors"
          >
            <Twitter className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

