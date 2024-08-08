// "use client"

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { columns, Students } from "../components/StudentTable/columns";
// import { DataTable } from "../components/StudentTable/dataTable";

// const aprUrl = process.env.NEXT_PUBLIC_API_URL;

// async function getStudents(classId: number, collegeId: number): Promise<Students[]> {
//   const res = await fetch(`http://localhost:3000/api/student?collegeid=${collegeId}&classid=${classId}`);
//   const data = await res.json();
//   return data;

// }

// export default function Page() {
// const searchParams = useSearchParams();
// const classIdParams = searchParams.get("classid");
// const collegeIdParams = searchParams.get("collegeid");
// const [data, setData] = useState<Students[]>([]);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   if (classIdParams === null || collegeIdParams === null) {
//     console.error("Missing required parameters");
//     return;
//   }

//   const classId = parseInt(classIdParams, 10);
//   const collegeId = parseInt(collegeIdParams, 10);

//   getStudents(classId, collegeId).then(fetchedData => {
//     setData(fetchedData);
//     setLoading(false);
//   }).catch(error => {
//     console.error("Error fetching students:", error);
//     setLoading(false);
//   });
// }, [classIdParams, collegeIdParams]);

//   if (loading) return <div>Loading...</div>;
//   console.log("dataaaaa", data);
//   console.log("type of data", typeof(data));

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { Button } from "@repo/ui/components/ui/button";
// import { Checkbox } from "@repo/ui/components/ui/checkbox";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@repo/ui/components/ui/table";
// import { toast } from "../../../../packages/ui/src/components/ui/use-toast";
// import { useSearchParams } from "next/navigation";

// interface Student {
//   id: number;
//   name: string;
//   prn: string;
//   rollNo: number;
// }

// const aprUrl = process.env.NEXT_PUBLIC_API_URL;

// async function getStudents(
//   classId: number,
//   collegeId: number
// ): Promise<Student[]> {
//   const res = await fetch(
//     `http://localhost:3000/api/student?collegeid=${collegeId}&classid=${classId}`
//   );
//   const data = await res.json();
//   return data;
// }

// export default function AttendanceForm() {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
//   const searchParams = useSearchParams();
//   const classIdParams = searchParams.get("classid");
//   const collegeIdParams = searchParams.get("collegeid");
//   const [data, setData] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (classIdParams === null || collegeIdParams === null) {
//       console.error("Missing required parameters");
//       return;
//     }

//     const classId = parseInt(classIdParams, 10);
//     const collegeId = parseInt(collegeIdParams, 10);

//     getStudents(classId, collegeId)
//       .then((fetchedData) => {
//         setStudents(fetchedData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//         setLoading(false);
//       });
//   }, [classIdParams, collegeIdParams]);

//   const handleAttendanceChange = (studentId: number, isChecked: boolean) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [studentId]: isChecked,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       // Ensure both classIdParams and collegeIdParams are available
//       if (classIdParams === null || collegeIdParams === null) {
//         console.error("Missing required parameters for classId or collegeId.");
//         return;
//       }

//       // Prepare data for submission
      
//       const attendanceData = students.map((student) => ({
//         studentId: student.id,
//         status: attendance[student.id] || false,
//         // date: new Date(),
//         // userId: 3, // Replace with the actual userId of the teacher
//       }));
      
//       console.log("attendance....", attendanceData);
//       // Ensure that all necessary fields are present
//       if (
//         attendanceData.some(
//           (data) => data.studentId === undefined 
//         )
//       ) {
//         console.error("Missing studentId or collegeId in the attendance data.");
//         return;
//       }

//       // Send data to your API
//       await fetch(`${aprUrl}/api/attendance`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ attendance: attendanceData, collegeId: collegeIdParams }),
//       });

//       toast({
//         title: "Attendance Submitted",
//         description: "Attendance has been successfully submitted.",
//       });
//     } catch (error) {
//       console.error("Error submitting attendance:", error);
//     }
//   };

//   return (
//     <div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Student Name</TableHead>
//             <TableHead>PRN</TableHead>
//             <TableHead>Roll No</TableHead>
//             <TableHead>Attendance</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {students.map((student) => (
//             <TableRow key={student.id}>
//               <TableCell>{student.name}</TableCell>
//               <TableCell>{student.prn}</TableCell>
//               <TableCell>{student.rollNo}</TableCell>
//               <TableCell>
//                 <Checkbox
//                   checked={attendance[student.id] || false}
//                   onCheckedChange={(isChecked) =>
//                     handleAttendanceChange(student.id, isChecked as boolean)
//                   }
//                 />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Button onClick={handleSubmit}>Submit Attendance</Button>
//     </div>
//   );
// }
"use client";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { toast } from "../../../../packages/ui/src/components/ui/use-toast";
import { useSearchParams, useRouter } from "next/navigation";

interface Student {
  id: number;
  name: string;
  prn: string;
  rollNo: number;
}

const aprUrl = process.env.NEXT_PUBLIC_API_URL;

async function getStudents(
  classId: number,
  collegeId: number
): Promise<Student[]> {
  const res = await fetch(
    `http://localhost:3000/api/student?collegeid=${collegeId}&classid=${classId}`
  );
  const data = await res.json();
  return data;
}

function AttendanceForm() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
  const searchParams = useSearchParams();
  const classIdParams = searchParams.get("classid");
  const collegeIdParams = searchParams.get("collegeid");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (classIdParams === null || collegeIdParams === null) {
      console.error("Missing required parameters");
      return;
    }

    const classId = parseInt(classIdParams, 10);
    const collegeId = parseInt(collegeIdParams, 10);

    getStudents(classId, collegeId)
      .then((fetchedData) => {
        setStudents(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, [classIdParams, collegeIdParams]);

  const handleAttendanceChange = (studentId: number, isChecked: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isChecked,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (classIdParams === null || collegeIdParams === null) {
        console.error("Missing required parameters for classId or collegeId.");
        return;
      }

      const attendanceData = students.map((student) => ({
        studentId: student.id,
        status: attendance[student.id] || false,
      }));

      console.log("attendance....", attendanceData);

      if (attendanceData.some((data) => data.studentId === undefined)) {
        console.error("Missing studentId or collegeId in the attendance data.");
        return;
      }

      await fetch(`${aprUrl}/api/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attendance: attendanceData,
          collegeId: collegeIdParams,
        }),
      });

      router.push(`/`);
      toast({
        title: "Attendance Submitted",
        description: "Attendance has been successfully submitted.",
      });
    } catch (error) {
      console.error("Error submitting attendance:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Attendance Form</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="p-3 text-left text-gray-700  bg-gray-50">
                Student Name
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700  bg-gray-50">
                PRN
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700  bg-gray-50">
                Roll No
              </TableHead>
              <TableHead className="p-3 text-left text-gray-700  bg-gray-50">
                Attendance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="border-b border-gray-200">
                <TableCell className="p-3">{student.name}</TableCell>
                <TableCell className="p-3">{student.prn}</TableCell>
                <TableCell className="p-3">{student.rollNo}</TableCell>
                <TableCell className="p-3">
                  <Checkbox
                    checked={attendance[student.id] || false}
                    onCheckedChange={(isChecked) =>
                      handleAttendanceChange(student.id, isChecked as boolean)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button
        onClick={handleSubmit}
        className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Attendance
      </Button>
    </div>
  );
}

export default function WrappedAttendanceForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AttendanceForm />
    </Suspense>
  );
}
