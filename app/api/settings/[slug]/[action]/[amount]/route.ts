import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      slug: string;
      action: string;
      amount: string;
    }>;
  }
) {
  const { slug, action, amount } = await context.params;
  const value = Number(amount || 1);

  let { data: current } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!current) {
    const created = await supabaseAdmin
      .from("settings")
      .insert({ slug })
      .select()
      .single();

    current = created.data;
  }

  let wins = current.wins;
  let multiplier = current.multiplier;

  if (action === "addwin") wins += value * multiplier;
  if (action === "removewin") wins -= value * multiplier;
  if (action === "setwin") wins = value;

  if (action === "addmulti") multiplier += value;
  if (action === "removemulti") multiplier -= value;
  if (action === "setmulti") multiplier = value;
  if (action === "doublemulti") multiplier *= 2;

  if (action === "resetwins") wins = 0;
  if (action === "resetmulti") multiplier = 1;

  if (multiplier < 1) multiplier = 1;

  const { data } = await supabaseAdmin
    .from("settings")
    .update({ wins, multiplier })
    .eq("slug", slug)
    .select()
    .single();

  return Response.json({
    success: true,
    slug,
    action,
    amount: value,
    data,
  });
}