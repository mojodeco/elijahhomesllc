export async function onRequestPost(context) {
  try {
    const input = await context.request.formData();
    
    // Extract form fields
    const name = input.get('name');
    const phone = input.get('phone');
    const email = input.get('email');
    const message = input.get('message');

    // Here you would typically add your Email API call (Resend, Postmark, etc.)
    // For now, let's just log it or return a success response
    
    return new Response(JSON.stringify({ success: true, message: "Message sent!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response("Error processing form", { status: 500 });
  }
}
