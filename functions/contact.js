export async function onRequestPost(context) {
  const { env } = context;
  
  try {
    const input = await context.request.formData();
    const name = input.get('name');
    const phone = input.get('phone');
    const email = input.get('email');
    const message = input.get('message');

    // 1. Send the data to Resend
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elijah Homes <onboarding@resend.dev>',
        to: ['moguls.halos.2i@icloud.com'], 
        subject: `New Lead: ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    });

    // 2. Handle the response
    if (resp.ok) {
      return Response.redirect(new URL('/?success=true', context.request.url), 303);
    } else {
      const errorData = await resp.text();
      return new Response(`Resend Error: ${errorData}`, { status: 500 });
    }
  } catch (err) {
    return new Response(`Server Error: ${err.message}`, { status: 500 });
  }
}
