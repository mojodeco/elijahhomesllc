export async function onRequestPost(context) {
  const { env } = context;
  
  try {
    const input = await context.request.formData();
    const name = input.get('name');
    const phone = input.get('phone');
    const email = input.get('email');
    const message = input.get('message');

    // Sending the data to Resend API
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elijah Homes <onboarding@resend.dev>',
        to: ['ymoguls.halos.2i@icloud.com'], // <--- PUT YOUR REAL EMAIL HERE
        subject: `New Lead: ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    if (resp.ok) {
      // Redirect to a "Thank You" page or back to home
      return Response.redirect(new URL('/?success=true', context.request.url), 303);
    } else {
      return new Response("Email failed to send", { status: 500 });
    }
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
