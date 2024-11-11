import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    revalidatePath("/admin");
    return NextResponse.json({ message: "Revalidation successful" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Error revalidating path" }, { status: 500 });
  }
}