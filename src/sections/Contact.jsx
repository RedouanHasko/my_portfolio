import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  const handleChange = ({ target: { value, name } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_r67f8l9",
        "template_n83ac9p",
        {
          from_name: form.name,
          to_name: "Redouan El Haskouri",
          from_email: form.email,
          to_email: "relhaskouri2@gmail.com",
          message: form.message,
        },
        "fLRsGCEW2Vfrn0hcc"
      );

      alert("Thank you. I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img
          src="/assets/terminal.png"
          alt="terminal"
          className="absolute inset-0 min-h-screen"
        />
        <div className="contact-container" data-aos="fade-up">
          <h3 className="head-text">Get In Touch</h3>
          <p className="text-lg text-white-600">
            Whether you want to build a new website, improve your existing
            platform, or bring a unique project to life, I am here to help.
          </p>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3" data-aos="fade-right">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Mohammad EL"
                aria-label="Full Name"
              />
            </label>
            <label
              className="space-y-3"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="mohel@example.com"
                aria-label="Email"
              />
            </label>
            <label
              className="space-y-3"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <span className="field-label">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Hi, I have a job for you..."
                aria-label="Your Message"
              />
            </label>
            <button
              className="field-btn"
              type="submit"
              disabled={loading}
              //   data-aos="fade-up"
            >
              {loading ? (
                <span className="spinner" aria-hidden="true"></span>
              ) : (
                "Send Message"
              )}
              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
