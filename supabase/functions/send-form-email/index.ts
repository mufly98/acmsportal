import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SCHOOL_EMAIL = "amfusmodelschool@gmail.com";

type FileLink = { name: string; url: string };

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    let subject = "";
    let body = "";

    if (type === "inquiry") {
      subject = `New Admission Inquiry from ${data.name}`;
      body = [
        `A new inquiry was submitted on the ACMS Portal website.`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Class of Interest: ${data.level}`,
        `Message:`,
        data.message,
        ``,
        `Submitted: ${new Date().toLocaleString()}`,
      ].join("\n");
    } else if (type === "application") {
      subject = `New Admission Application from ${data.applicant_name}`;
      const fileLinks: FileLink[] = Array.isArray(data.files)
        ? data.files
        : [];

      const filesSection =
        fileLinks.length > 0
          ? [
            ``,
            `--- Uploaded Documents (${fileLinks.length}) ---`,
            ...fileLinks.map(
              (f, i) => `${i + 1}. ${f.name}\n   ${f.url}`,
            ),
            ``,
          ].join("\n")
          : "";

      body = [
        `A new admission application was submitted on the ACMS Portal website.`,
        ``,
        `Applicant Name: ${data.applicant_name}`,
        `Guardian Name: ${data.guardian_name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Desired Class: ${data.level}`,
        `Desired Start Date: ${data.start_date}`,
        `Previous School: ${data.previous_school || "N/A"}`,
        `Notes: ${data.notes || "N/A"}`,
        filesSection,
        `Submitted: ${new Date().toLocaleString()}`,
      ]
        .filter((line) => line !== "")
        .join("\n");
    } else if (type === "contact") {
      subject = `New Contact Message: ${data.subject}`;
      body = [
        `A new message was submitted via the ACMS Portal contact form.`,
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "N/A"}`,
        `Subject: ${data.subject}`,
        `Message:`,
        data.message,
        ``,
        `Submitted: ${new Date().toLocaleString()}`,
      ].join("\n");
    } else {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use Resend (or any SMTP relay) via the RESEND_API_KEY secret.
    // Falls back to a no-op success if no key is configured, so the
    // frontend still works during development.
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ACMS Portal <onboarding@resend.dev>",
          to: [SCHOOL_EMAIL],
          subject,
          text: body,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        return new Response(
          JSON.stringify({ error: `Email send failed: ${errText}` }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email queued" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
