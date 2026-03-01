import emailjs from '@emailjs/browser';

// ========== OLD ACCOUNT (Customer & Technician emails) ==========
const OLD_PUBLIC_KEY = 'Qk9ajvN6MqcOPuiNn';
const OLD_SERVICE_ID = 'service_ltrmrlq';
const OLD_TEMPLATES = {
  CUSTOMER_ASSIGNMENT: 'template_wnn5r95',
  TECHNICIAN_ASSIGNMENT: 'template_s5z5f9h',
};

// ========== NEW ACCOUNT (Admin notification emails) ==========
const NEW_PUBLIC_KEY = 'ZJHTiCoV9M2GxN-dw';
const NEW_SERVICE_ID = 'service_h8y6215';
const NEW_TEMPLATES = {
  ADMIN_NEW_REQUEST: 'template_vj9r6uo',  // ← updated
};

const ADMIN_EMAIL = 'farhanshuvon01@gmail.com';  // ← replace with your admin email

const DEBUG_MODE = true;

// Check if OLD account is configured (for customer/technician emails)
const isOldConfigured = () => {
  const configured =
    OLD_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE' &&
    OLD_SERVICE_ID !== 'YOUR_SERVICE_ID_HERE' &&
    OLD_TEMPLATES.CUSTOMER_ASSIGNMENT !== 'YOUR_CUSTOMER_TEMPLATE_ID' &&
    OLD_TEMPLATES.TECHNICIAN_ASSIGNMENT !== 'YOUR_TECHNICIAN_TEMPLATE_ID';

  if (DEBUG_MODE) {
    console.log('Old EmailJS Config Check:');
    console.log('  - Public Key:', OLD_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE' ? '✅ Set' : '❌ Not set');
    console.log('  - Service ID:', OLD_SERVICE_ID !== 'YOUR_SERVICE_ID_HERE' ? '✅ Set' : '❌ Not set');
    console.log('  - Customer Template:', OLD_TEMPLATES.CUSTOMER_ASSIGNMENT !== 'YOUR_CUSTOMER_TEMPLATE_ID' ? '✅ Set' : '❌ Not set');
    console.log('  - Technician Template:', OLD_TEMPLATES.TECHNICIAN_ASSIGNMENT !== 'YOUR_TECHNICIAN_TEMPLATE_ID' ? '✅ Set' : '❌ Not set');
    console.log('  - Overall Status:', configured ? '✅ CONFIGURED' : '❌ NOT CONFIGURED');
  }

  return configured;
};

// Check if NEW account is configured (for admin emails)
const isNewConfigured = () => {
  const configured =
    NEW_PUBLIC_KEY !== 'YOUR_NEW_PUBLIC_KEY_HERE' &&
    NEW_SERVICE_ID !== 'YOUR_NEW_SERVICE_ID_HERE' &&
    NEW_TEMPLATES.ADMIN_NEW_REQUEST !== 'your_new_admin_template_id';

  if (DEBUG_MODE) {
    console.log('New EmailJS Config Check:');
    console.log('  - Admin Template:', NEW_TEMPLATES.ADMIN_NEW_REQUEST !== 'your_new_admin_template_id' ? '✅ Set' : '❌ Not set');
    console.log('  - Overall Status:', configured ? '✅ CONFIGURED' : '❌ NOT CONFIGURED');
  }

  return configured;
};

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
      console.log('=== CUSTOMER EMAIL DEBUG ===');
      console.log('Customer Data:', customerData);
      console.log('Technician Data:', technicianData);
      console.log('Service Data:', serviceData);
    }

    if (!isOldConfigured()) {
      const error = 'Old EmailJS not configured.';
      console.error('❌', error);
      return { success: false, error };
    }

    if (!isValidEmail(customerData.email)) {
      const error = `Invalid customer email: ${customerData.email || 'missing'}`;
      console.error('❌', error);
      return { success: false, error };
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
      problem_details: serviceData.problemDetails,
    };

    if (DEBUG_MODE) console.log('Sending customer email with params:', templateParams);

    const response = await emailjs.send(
      OLD_SERVICE_ID,
      OLD_TEMPLATES.CUSTOMER_ASSIGNMENT,
      templateParams,
      OLD_PUBLIC_KEY
    );

    console.log('✅ Customer email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Failed to send customer email:', error);
    return { success: false, error: error.text || error.message || 'Unknown error' };
  }
};

/**
 * Send email notification to technician when assigned to a job
 */
export const sendTechnicianAssignmentEmail = async (technicianData, customerData, serviceData) => {
  try {
    if (DEBUG_MODE) {
      console.log('=== TECHNICIAN EMAIL DEBUG ===');
      console.log('Technician Data:', technicianData);
      console.log('Customer Data:', customerData);
      console.log('Service Data:', serviceData);
    }

    if (!isOldConfigured()) {
      const error = 'Old EmailJS not configured.';
      console.error('❌', error);
      return { success: false, error };
    }

    if (!isValidEmail(technicianData.email)) {
      const error = `Invalid technician email: ${technicianData.email || 'missing'}`;
      console.error('❌', error);
      return { success: false, error };
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
      problem_details: serviceData.problemDetails,
    };

    if (DEBUG_MODE) console.log('Sending technician email with params:', templateParams);

    const response = await emailjs.send(
      OLD_SERVICE_ID,
      OLD_TEMPLATES.TECHNICIAN_ASSIGNMENT,
      templateParams,
      OLD_PUBLIC_KEY
    );

    console.log('✅ Technician email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Failed to send technician email:', error);
    return { success: false, error: error.text || error.message || 'Unknown error' };
  }
};

/**
 * Send email notification to admin when new service is requested
 */
export const sendAdminNewRequestEmail = async (customerData, serviceData) => {
  try {
    if (DEBUG_MODE) {
      console.log('📧 === ADMIN NOTIFICATION EMAIL DEBUG ===');
      console.log('Customer Data:', customerData);
      console.log('Service Data:', serviceData);
    }

    if (!isNewConfigured()) {
      console.warn('⚠️ New EmailJS (admin) not configured yet');
      return { success: false, error: 'Admin EmailJS not configured' };
    }

    const templateParams = {
      to_email: ADMIN_EMAIL,
      customer_name: customerData.name,
      customer_phone: customerData.phone,
      customer_email: customerData.email || 'Not provided',
      service_name: serviceData.serviceName,
      service_category: serviceData.category,
      service_date: serviceData.date,
      service_cost: serviceData.cost,
      service_address: serviceData.address,
      problem_details: serviceData.problemDetails || 'No details provided',
      requested_at: new Date().toLocaleString(),
    };

    if (DEBUG_MODE) console.log('📤 Sending admin email with params:', templateParams);

    const response = await emailjs.send(
      NEW_SERVICE_ID,
      NEW_TEMPLATES.ADMIN_NEW_REQUEST,
      templateParams,
      NEW_PUBLIC_KEY
    );

    console.log('✅ Admin notification email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Failed to send admin notification email:', error);
    return { success: false, error: error.text || error.message || 'Unknown error' };
  }
};

/**
 * Send both customer and technician emails when assignment happens
 */
export const sendAssignmentNotifications = async (customerData, technicianData, serviceData) => {
  try {
    console.log('STARTING EMAIL NOTIFICATIONS');

    if (!isOldConfigured()) {
      console.error('❌ Old EmailJS is not configured!');
      return {
        success: false,
        error: 'EmailJS not configured',
        customerEmail: { success: false, error: 'Not configured' },
        technicianEmail: { success: false, error: 'Not configured' },
      };
    }

    const [customerResult, technicianResult] = await Promise.all([
      sendCustomerAssignmentEmail(customerData, technicianData, serviceData),
      sendTechnicianAssignmentEmail(technicianData, customerData, serviceData),
    ]);

    const allSuccess = customerResult.success && technicianResult.success;

    if (allSuccess) {
      console.log('✅ ALL NOTIFICATIONS SENT SUCCESSFULLY!');
    } else {
      console.warn('⚠️ SOME NOTIFICATIONS FAILED');
      console.log('Customer email:', customerResult.success ? '✅ Success' : '❌ Failed');
      console.log('Technician email:', technicianResult.success ? '✅ Success' : '❌ Failed');
      if (!customerResult.success) console.error('Customer email error:', customerResult.error);
      if (!technicianResult.success) console.error('Technician email error:', technicianResult.error);
    }

    return {
      success: allSuccess,
      customerEmail: customerResult,
      technicianEmail: technicianResult,
    };
  } catch (error) {
    console.error('❌ Error sending notifications:', error);
    return {
      success: false,
      error: error.message,
      customerEmail: { success: false },
      technicianEmail: { success: false },
    };
  }
};