// utils/emailNotifications.js - CONFIGURED VERSION
import emailjs from '@emailjs/browser';

//credential of EmailJS 
const EMAILJS_PUBLIC_KEY = 'Qk9ajvN6MqcOPuiNn';
const EMAILJS_SERVICE_ID = 'service_ltrmrlq';

// Template IDs for different email types
const TEMPLATE_IDS = {
  CUSTOMER_ASSIGNMENT: 'template_wnn5r95',
  TECHNICIAN_ASSIGNMENT: 'template_s5z5f9h'
};

// Enable debug mode to see detailed logs
const DEBUG_MODE = true;

// Check if EmailJS is configured
const isConfigured = () => {
  const configured = EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE' && 
         EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID_HERE' &&
         TEMPLATE_IDS.CUSTOMER_ASSIGNMENT !== 'YOUR_CUSTOMER_TEMPLATE_ID' &&
         TEMPLATE_IDS.TECHNICIAN_ASSIGNMENT !== 'YOUR_TECHNICIAN_TEMPLATE_ID';
  
  if (DEBUG_MODE) {
    console.log('EmailJS Configuration Check:');
    console.log('  - Public Key:', EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE' ? 'Set' : 'Not set');
    console.log('  - Service ID:', EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID_HERE' ? 'Set' : 'Not set');
    console.log('  - Customer Template:', TEMPLATE_IDS.CUSTOMER_ASSIGNMENT !== 'YOUR_CUSTOMER_TEMPLATE_ID' ? ' Set' : ' Not set');
    console.log('  - Technician Template:', TEMPLATE_IDS.TECHNICIAN_ASSIGNMENT !== 'YOUR_TECHNICIAN_TEMPLATE_ID' ? ' Set' : ' Not set');
    console.log('  - Overall Status:', configured ? 'CONFIGURED' : ' NOT CONFIGURED');
  }
  
  return configured;
};

// Initialize EmailJS once (only if keys are configured)
if (isConfigured()) {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    if (DEBUG_MODE) console.log(' EmailJS initialized successfully');
  } catch (error) {
    console.error(' EmailJS initialization failed:', error);
  }
} else {
  console.warn(' EmailJS NOT configured yet. Please update credentials in emailNotifications.js');
}

/**
 * Validate email address
 */
const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Send email notification to customer when technician is assigned
 */
export const sendCustomerAssignmentEmail = async (customerData, technicianData, serviceData) => {
  try {
    if (DEBUG_MODE) {
      console.log(' === CUSTOMER EMAIL DEBUG ===');
      console.log('Customer Data:', customerData);
      console.log('Technician Data:', technicianData);
      console.log('Service Data:', serviceData);
    }

    // Check if EmailJS is configured
    if (!isConfigured()) {
      const error = 'EmailJS not configured. Please set up your API keys in emailNotifications.js';
      console.error('Error : ', error);
      return { 
        success: false, 
        error: error
      };
    }

    // Validate customer email
    if (!isValidEmail(customerData.email)) {
      const error = `Invalid customer email: ${customerData.email || 'missing'}`;
      console.error('Error : ', error);
      return { 
        success: false, 
        error: error
      };
    }

    const templateParams = {
      to_email: customerData.email,
      customer_name: customerData.name,
      service_name: serviceData.serviceName,
      service_category: serviceData.category,
      service_date: serviceData.date,
      service_cost: serviceData.cost,
      service_address: serviceData.address,
      technician_name: technicianData.name,
      technician_phone: technicianData.phone,
      technician_category: technicianData.category,
      problem_details: serviceData.problemDetails
    };

    if (DEBUG_MODE) {
      console.log('Sending customer email with params:', templateParams);
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_IDS.CUSTOMER_ASSIGNMENT,
      templateParams
    );

    console.log('Customer email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send customer email:', error);
    console.error('Error details:', {
      message: error.message,
      text: error.text,
      status: error.status
    });
    return { 
      success: false, 
      error: error.text || error.message || 'Unknown error'
    };
  }
};

/**
 * Send email notification to technician when assigned to a job
 */
export const sendTechnicianAssignmentEmail = async (technicianData, customerData, serviceData) => {
  try {
    if (DEBUG_MODE) {
      console.log(' TECHNICIAN EMAIL DEBUG');
      console.log('Technician Data:', technicianData);
      console.log('Customer Data:', customerData);
      console.log('Service Data:', serviceData);
    }

    // Check if EmailJS is configured
    if (!isConfigured()) {
      const error = 'EmailJS not configured. Please set up your API keys in emailNotifications.js';
      console.error('Error : ', error);
      return { 
        success: false, 
        error: error
      };
    }

    // Validate technician email
    if (!isValidEmail(technicianData.email)) {
      const error = `Invalid technician email: ${technicianData.email || 'missing'}`;
      console.error('Error : ', error);
      return { 
        success: false, 
        error: error
      };
    }

    const templateParams = {
      to_email: technicianData.email,
      technician_name: technicianData.name,
      customer_name: customerData.name,
      customer_phone: customerData.phone,
      customer_email: customerData.email,
      service_name: serviceData.serviceName,
      service_category: serviceData.category,
      service_date: serviceData.date,
      service_cost: serviceData.cost,
      service_address: serviceData.address,
      problem_details: serviceData.problemDetails
    };

    if (DEBUG_MODE) {
      console.log('Sending technician email with params:', templateParams);
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      TEMPLATE_IDS.TECHNICIAN_ASSIGNMENT,
      templateParams
    );

    console.log('Technician email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send technician email:', error);
    console.error('Error details:', {
      message: error.message,
      text: error.text,
      status: error.status
    });
    return { 
      success: false, 
      error: error.text || error.message || 'Unknown error'
    };
  }
};

/**
 * Send both customer and technician emails when assignment happens
 */
export const sendAssignmentNotifications = async (customerData, technicianData, serviceData) => {
  try {
    console.log('STARTING EMAIL NOTIFICATIONS');
    
    // Check configuration first
    if (!isConfigured()) {
      console.error('Error : EmailJS is not configured!');
      return {
        success: false,
        error: 'EmailJS not configured',
        customerEmail: { success: false, error: 'Not configured' },
        technicianEmail: { success: false, error: 'Not configured' }
      };
    }

    // Send both emails in parallel
    const [customerResult, technicianResult] = await Promise.all([
      sendCustomerAssignmentEmail(customerData, technicianData, serviceData),
      sendTechnicianAssignmentEmail(technicianData, customerData, serviceData)
    ]);

    const allSuccess = customerResult.success && technicianResult.success;
    
    if (allSuccess) {
      console.log('ALL NOTIFICATIONS SENT SUCCESSFULLY!');
    } else {
      console.warn('SOME NOTIFICATIONS FAILED ');
      console.log('Customer email:', customerResult.success ? ' Success' : ' Failed');
      console.log('Technician email:', technicianResult.success ? ' Success' : ' Failed');
      
      if (!customerResult.success) {
        console.error('Customer email error:', customerResult.error);
      }
      if (!technicianResult.success) {
        console.error('Technician email error:', technicianResult.error);
      }
    }

    return {
      success: allSuccess,
      customerEmail: customerResult,
      technicianEmail: technicianResult
    };
  } catch (error) {
    console.error(' Error sending notifications:', error);
    return { 
      success: false, 
      error: error.message,
      customerEmail: { success: false },
      technicianEmail: { success: false }
    };
  }
};