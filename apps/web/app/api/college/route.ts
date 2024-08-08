import db from "@repo/db/client"
import { NextResponse } from "next/server";


//To get colleges
export async function GET() {
    try {
        const colleges = await db.college.findMany();
        return NextResponse.json(colleges);
    } catch (error) {
        return NextResponse.json({
            message: "Please enter title"
          }, {
            status: 400,
          })    
    }
}