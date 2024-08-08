import db from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        // console.log("session", session);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userId = parseInt(session.user.id, 10);
        const {attendance, collegeId} = await req.json();
        console.log("request body", attendance);
   
        if (!Array.isArray(attendance)) {
            return NextResponse.json({ message: "Attendance data must be an array" }, { status: 400 });
        }
        let numCollegeId = parseInt(collegeId);
        const attendanceData = attendance.map(({ studentId, status }) => ({
            studentId: studentId,
            collegeId: numCollegeId,
            date: new Date(),
            userId: userId,
            status: Boolean(status),
        }));

        await db.attendance.createMany({ data: attendanceData });

        return NextResponse.json({ message: "Attendance recorded" }, { status: 201 });

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
