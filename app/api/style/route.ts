import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {

  const body = await req.json();

  if (
    body.adminSecret !== process.env.ADMIN_SECRET
  ) {

    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );

  }

  const updateData:any = {};

  if (body.color) {
    updateData.color = body.color;
  }

  if (body.font) {
    updateData.font = body.font;
  }

  if (body.multiplier) {
    updateData.multiplier = body.multiplier;
  }

  const { data } = await supabaseAdmin
    .from("settings")
    .update(updateData)
    .eq("id", 1)
    .select()
    .single();

  return Response.json(data);

}