import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  let { data } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) {
    const created = await supabaseAdmin
      .from("settings")
      .insert({ slug })
      .select()
      .single();

    data = created.data;
  }

  return Response.json(data);
}