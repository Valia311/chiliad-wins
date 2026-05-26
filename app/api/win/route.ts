import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json();

  if (body.secret !== process.env.WEBHOOK_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const action = body.action;
  const amount = Number(body.amount ?? 1);

  const { data: current } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  let wins = current.wins;
  let multiplier = current.multiplier;

  if (action === "add_win") {
    wins += amount * multiplier;
  }

  if (action === "remove_win") {
    wins -= amount * multiplier;
  }

  if (action === "reset_wins") {
    wins = 0;
  }

  if (action === "add_multi") {
    multiplier += amount;
  }

  if (action === "remove_multi") {
    multiplier -= amount;
  }

  if (action === "reset_multi") {
    multiplier = 1;
  }

  if (action === "double_multi") {
    multiplier *= 2;
  }

  if (multiplier < 1) {
    multiplier = 1;
  }

  const { data } = await supabaseAdmin
    .from("settings")
    .update({
      wins,
      multiplier,
    })
    .eq("id", 1)
    .select()
    .single();

  return Response.json(data);
}