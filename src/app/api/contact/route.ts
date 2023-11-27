import { sendEmail } from "@/service/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const result = await sendEmail(data);
  return NextResponse.json(result);
}
