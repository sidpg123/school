import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// This is used to get classNames data
export async function GET(req: NextRequest) {
    // Retrieve the session
    const session = await getServerSession(authOptions);
    // console.log("Session:", session);

    if (!session) {
        return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    // Retrieve the collegeId parameter from the request URL
    const collegeIdParams = req.nextUrl.searchParams.get("collegeid");
    const departmentIdParams = req.nextUrl.searchParams.get("departmentid");
    const yearParams = req.nextUrl.searchParams.get("year");
    const divisionParams = req.nextUrl.searchParams.get("division");
    // console.log("College ID parameter:", collegeIdParams);

    const collegeId = collegeIdParams ? parseInt(collegeIdParams, 10) : undefined;
    const departmentId = departmentIdParams ? parseInt(departmentIdParams, 10) : undefined;
    const year = yearParams ? parseInt(yearParams, 10) : undefined;
    const division = divisionParams ? divisionParams : "" 

    if (!collegeId) {
        return NextResponse.json({ error: "Invalid or missing college ID" }, { status: 400 });
    }

    try {
        // Fetch class names based on collegeId
        const classid = await db.class.findFirst({
            where: {
                collegeId: collegeId,
                departmentId: departmentId,
                year,
                division
            }
            ,
            select: {
                "id": true,
            }
        });

       console.log("from server ClassID:", classid);

        return new Response(JSON.stringify(classid), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error fetching class names:", error);
        return new Response("Error fetching class names", { status: 500 });
    }
}
