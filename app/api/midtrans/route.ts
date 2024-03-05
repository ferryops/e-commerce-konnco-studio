import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, amount } = await req.json();
  console.log(username, amount);

  try {
    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic " + Buffer.from("SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA").toString("base64"),
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: "order-csb-" + getCurrentTimestamp(),
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: username,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const snapToken = responseData.token;
    console.log("Retrieved snap token:", snapToken);

    return NextResponse.json({ token: snapToken });
  } catch (error) {
    console.error("Failed to call Midtrans API:", error);
    return NextResponse.json("Failed to initiate payment: ");
  }
}

function getCurrentTimestamp() {
  return "" + Math.round(new Date().getTime() / 1000);
}
