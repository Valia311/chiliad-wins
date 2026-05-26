import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function handleRequest(
  slug: string,
  action: string,
  amount: string
) {
  const value = Number(amount || 1);

  let { data: current } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!current) {
    const created = await supabaseAdmin
      .from("settings")
      .insert({
        slug,
        wins: 0,
        multiplier: 1,
        color: "#ffffff",
        font: "Arial",
      })
      .select()
      .single();

    current = created.data;
  }

  let wins = current.wins;
  let multiplier = current.multiplier;

  if (action === "addwin") wins += value * multiplier;
  if (action === "addwinraw") wins += value;
  if (action === "removewin") wins -= value * multiplier;

  if (action === "addmulti") multiplier += value;
  if (action === "removemulti") multiplier -= value;

  if (action === "doublemulti") multiplier *= 2;

  if (action === "resetwins") wins = 0;
  if (action === "resetmulti") multiplier = 1;

  if (multiplier < 1) multiplier = 1;

  const { data } = await supabaseAdmin
    .from("settings")
    .update({
      wins,
      multiplier,
    })
    .eq("slug", slug)
    .select()
    .single();

  return Response.json({
    success: true,
    data,
  });
}

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

  return handleRequest(slug, action, amount);
}

export async function POST(
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

  return handleRequest(slug, action, amount);
}