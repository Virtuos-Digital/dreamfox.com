// filepath: /Users/virtuos/Desktop/Projects/dreamfox/pages/api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      firstName,
      lastName,
      company,
      email,
      phoneNumber,
      message,
      designation,
      subject,
      country,
      city,
      address,
      formType,
      pageUrl,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject) {
      return res.status(400).json({
        message: "Missing required fields: firstName, lastName, email, subject",
      });
    }

    // GraphQL mutation
    const mutation = `
      mutation CreateContactForm($input: CreateContactFormInput!) {
        createContactForm(createContactFormInput: $input) {
          id
          firstName
          lastName
          email
          subject
          status
          cdate
        }
      }
    `;

    const variables = {
      input: {
        firstName,
        lastName,
        company: company || null,
        email,
        phoneNumber: phoneNumber || null,
        message: message || null,
        formType: formType || "CONTACT_US",
        pageUrl: pageUrl || null,
        designation: designation || null,
        subject,
        country: country || null,
        city: city || null,
        address: address || null,
      },
    };

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any authentication headers if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return res.status(400).json({
        message: "Failed to submit form",
        errors: data.errors,
      });
    }

    return res.status(200).json({
      message: "Form submitted successfully",
      data: data.data.createContactForm,
    });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
