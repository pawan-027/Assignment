import React, { useState } from "react";

const Contactform = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setStatus("❌ Please fill out all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus("❌ Invalid email format.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://vernanbackend.ezlab.in/api/contact-us/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setStatus("✅ Form Submitted");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("❌ Submission failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Network error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-indigo-950 shadow-md rounded-[10px] p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-zinc-50 mb-4 text-center">
        Contact Us
      </h2>

      <input  type="text" name="name" placeholder="   Your Name" value={formData.name} onChange={handleChange} className="w-full text-gray-950 p-3 rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-400 "
      />

      <input type="email" name="email" placeholder="   Your Email" value={formData.email} onChange={handleChange}className="w-full text-gray-950 p-3 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input type="tel" name="phone" placeholder="   Your Phone Number" value={formData.phone} onChange={handleChange} className="w-full text-gray-950 p-3 border rounded-[24px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea name="message" placeholder="   Your Message..." value={formData.message} onChange={handleChange} className="w-full text-gray-950 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows="3"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-64 mx-16 flex-row justify-items-center bg-blue-600 text-white font-bold py-3 rounded-[24px] hover:bg-blue-700 transition-all ${loading ? "opacity-50 cursor-not-allowed" : "" }`}>

        {loading ? "Submitting..." : "Submit"}
      </button>

      {status && (
        <p className="text-center mt-2 text-gray-700 font-medium">{status}</p>
      )}
    </form>
  );
};

export default Contactform;