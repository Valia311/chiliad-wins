import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  req: Request,
  context: { params: Promise<{ action: string; amount: string }> }
) {

  const { action, amount } = await context.params;

  const value = Number(amount || 1);

  const { data: current, error } = await supabaseAdmin
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) {

    return Response.json(
      { error: error.message },
      { status: 500 }
    );

  }

  let wins = current.wins;
  let multiplier = current.multiplier;

  if (action === "addwin") {
    wins += value * multiplier;
  }

  if (action === "removewin") {
    wins -= value * multiplier;
  }

  if (action === "setwin") {
    wins = value;
  }

  if (action === "addmulti") {
    multiplier += value;
  }

  if (action === "removemulti") {
    multiplier -= value;
  }

  if (action === "setmulti") {
    multiplier = value;
  }

  if (action === "doublemulti") {
    multiplier *= 2;
  }

  if (action === "resetwins") {
    wins = 0;
  }

  if (action === "resetmulti") {
    multiplier = 1;
  }

  if (multiplier < 1) {
    multiplier = 1;
  }

  const { data, error: updateError } =
    await supabaseAdmin
      .from("settings")
      .update({
        wins,
        multiplier
      })
      .eq("id", 1)
      .select()
      .single();

  if (updateError) {

    return Response.json(
      { error: updateError.message },
      { status: 500 }
    );

  }

  return Response.json({
    success: true,
    action,
    amount: value,
    data
  });

}