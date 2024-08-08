import db from "@repo/db/client"
import { NextResponse } from "next/server";


//To get departments    
export async function GET() {
    try {
        const departments = await db.department.findMany();
        return NextResponse.json(departments);
    } catch (error) {
        return NextResponse.json({
            message: "Please enter title"
          }, {
            status: 400,
          })    
    }
}