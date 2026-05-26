export async function GET() {

  await fetch("http://localhost:3000/api/win", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      secret: "secret123",
      action: "remove_win",
      amount: 1
    })
  });

  return Response.json({
    success: true
  });

}