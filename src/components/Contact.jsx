import React, { useRef, useState } from "react";
import NavigationCircles from "./NavigationCircles";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      await emailjs.sendForm(
        "service_4i69mhr", // Replace with your EmailJS service ID
        "template_b8xhzjf", // Replace with your EmailJS template ID
        formRef.current,
        "k9Y7Xsy9OIKxUDTbi" // Replace with your EmailJS public key
      );

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center py-12"
    >
      <h2 className="text-4xl font-light md:mb-32 mb-24 text-yellow-500">Connect with me</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 md:gap-8 lg:gap-12 w-full max-w-[500px] bg-white dark:bg-gray-900 p-6 rounded shadow-md"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full h-13 pl-3 text-lg outline-0 border border-red-500 dark:border-yellow-500 placeholder-gray-600 dark:placeholder-yellow-500/50 transition-colors duration-500 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full h-13 pl-3 text-lg outline-0 border border-red-500 dark:border-yellow-500 placeholder-gray-600 dark:placeholder-yellow-500/50 transition-colors duration-500 rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
          className="w-full h-13 pl-3 text-lg outline-0 border border-red-500 dark:border-yellow-500 placeholder-gray-600 dark:placeholder-yellow-500/50 min-h-[100px] max-h-[200px] resize-y p-3 transition-colors duration-500 rounded"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-13 pl-3 text-lg outline-0 bg-red-500 dark:bg-yellow-500 text-white dark:text-gray-900 uppercase font-extrabold cursor-pointer tracking-wide shadow-md shadow-gray-700/20 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          {loading ? "Sending..." : "Stay Connected"}
        </button>
        {success && (
          <p className="text-green-500 text-center">Message sent successfully!</p>
        )}
        {error && (
          <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
        )}
      </form>
      <NavigationCircles section="contact"></NavigationCircles>
    </div>
  );
};

export default Contact;
