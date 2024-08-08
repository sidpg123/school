import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    const collegeIdParams = req.nextUrl.searchParams.get("collegeid");
    const classIdParams = req.nextUrl.searchParams.get("classid");

    if (!classIdParams || !collegeIdParams) {
        return NextResponse.json({ error: "Params not found" }, { status: 404 });
    }

    const collegeId = parseInt(collegeIdParams, 10);
    const classId = parseInt(classIdParams, 10);

    if (isNaN(collegeId) || isNaN(classId)) {
        return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    try {
        const students = await db.student.findMany({
            where: {
                collegeId: collegeId,
                classId: classId,
            },
            select: {
                id: true,
                name: true,
                prn: true,
                rollNo: true
            }
        });

        return NextResponse.json(students);

    } catch (error) {
        console.error("Error fetching students:", error);
        return NextResponse.json({ error: "Error fetching students" }, { status: 500 });
    }
}
