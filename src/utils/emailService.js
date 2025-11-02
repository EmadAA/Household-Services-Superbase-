const EMAILJS_CONFIG = {
  PUBLIC_KEY: "tpaWL5hTTrAKDR9r0",     
  SERVICE_ID: "service_rmsu2za",      
  TEMPLATE_ID: "template_3niperc",    
};

const loadEmailJS = () => {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      console.log("EmailJS already loaded");
      resolve();
      return;
    }

    const existingScript = document.querySelector('script[src*="emailjs.com"]');
    if (existingScript) {
      existingScript.onload = resolve;
      return;
    }

    console.log("Loading EmailJS library...");
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    
    script.onload = () => {
      console.log("EmailJS loaded successfully");
      window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      setTimeout(resolve, 100);
    };
    
    script.onerror = (error) => {
      console.error("Failed to load EmailJS:", error);
      reject(new Error("Failed to load email library"));
    };
    
    document.head.appendChild(script);
  });
};

/**
 * Sends email using EmailJS
 * @param {Object} data - Email data
 * @param {string} data.name - Sender's name
 * @param {string} data.email - Sender's email
 * @param {string} data.message - Message content
 * @param {string} [data.phone] - Phone number (optional)
 * @param {string} [data.mobile] - Mobile number (optional)
 * @param {string} [data.subject] - Email subject (optional)
 * @returns {Promise<string>} - Returns "OK" on success
 */
export const sendEmail = async (data) => {
  try {
    console.log("Starting email send process...");
    
    await loadEmailJS();

    if (!window.emailjs) {
      throw new Error("EmailJS library not loaded properly");
    }

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || data.mobile || "Not provided",
      message: data.message,
    };

    console.log("Sending email...");

    const response = await window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log("Email sent successfully:", response);

    if (response.status === 200) {
      return "OK";
    } else {
      throw new Error(`Failed with status: ${response.status}`);
    }

  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(error.text || error.message || "Failed to send email");
  }
};