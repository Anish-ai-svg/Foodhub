import { useState } from 'react';
import { submitContact } from '../api/contact';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await submitContact(form.name, form.email, form.message);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info">
            <h1 className="page-title">Get in Touch 📬</h1>
            <p className="page-subtitle">We'd love to hear from you. Send us a message and we'll respond soon.</p>

            <div className="contact-detail">
              <span>📧</span>
              <div>
                <strong>Email</strong>
                <p>support@foodhub.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <span>📞</span>
              <div>
                <strong>Phone</strong>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-detail">
              <span>📍</span>
              <div>
                <strong>Address</strong>
                <p>123 Food Street, Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            {success ? (
              <div className="alert alert-success" style={{ fontSize: '1rem', padding: '24px' }}>
                ✅ Thank you! Your message has been sent. We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send a Message</h2>
                {error && <div className="alert alert-error">{error}</div>}

                <div className="form-group">
                  <label htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required placeholder="Write your message..." rows={5} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
