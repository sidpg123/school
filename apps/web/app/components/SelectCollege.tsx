// "use client";
// import { useState, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@repo/ui/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@repo/ui/components/ui/select";
// import { Button } from "@repo/ui/components/ui/button";
// import { toast } from "../../../../packages/ui/src/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";

// const FormSchema = z.object({
//   college: z.string({
//     required_error: "Please select a college.",
//   }),
//   department: z.string({
//     required_error: "Please select a department.",
//   }),
//   year: z
//     .string({
//       required_error: "Please select a year.",
//     })
//     .refine((value) => !isNaN(Number(value)), {
//       message: "Year must be a number.",
//     }),
//   division: z.string({
//     required_error: "Please select a division.",
//   }),
// });

// const aprUrl = process.env.NEXT_PUBLIC_API_URL;

// export function SelectForm() {
//   const [colleges, setColleges] = useState<any[]>([]);
//   const [classid, setClassid] = useState<number>(0);
//   const [selectedCollege, setSelectedCollege] = useState<string>("");
//   const [departments, setDepartments] = useState<string[]>([]);
//   const [selectedDepartmentid, setSelectedDepartmentidId] =
//     useState<string>("");
//   const [year, setYear] = useState<number>(0);
//   const [division, setDivision] = useState<string>("");
//   const router = useRouter();

//   const yearArray = [1, 2, 3, 4];
//   const divisionArray = ["A", "B", "C"];

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     // defaultValues: {
//     //   college: "",
//     // },
//   });

//   useEffect(() => {
//     async function fetchColleges() {
//       try {
//         const response = await fetch(`${aprUrl}/api/college`);
//         const data = await response.json();
//         setColleges(data);
//       } catch (error) {
//         console.error("Error fetching colleges:", error);
//       }
//     }

//     fetchColleges();
//   }, []);

//   useEffect(() => {
//     async function fetchDepartments() {
//       try {
//         const response = await fetch(`${aprUrl}/api/department`);
//         const data = await response.json();
//         setDepartments(data);
//       } catch (error) {
//         console.error("Error fetching colleges:", error);
//       }
//     }

//     fetchDepartments();
//   }, []);

  

//   useEffect(() => {
//     async function fetchClassId(
//     ): Promise<void> {
//       try {
//         if (selectedCollege && selectedDepartmentid && year && division) {
//           const response = await fetch(
//             `${aprUrl}/api/class?collegeid=${selectedCollege}&departmentid=${selectedDepartmentid}&year=${year}&division=${division}`
//           );

//           if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//           }

//           const classid  = await response.json();
//           console.log("classsiddd", classid.id);
          
//           setClassid(classid.id);
//           console.log("classid", classid);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchClassId()
//   }, [selectedCollege, selectedDepartmentid, year, division]);

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     try {
//       toast({
//         title: "Form Submitted",
//         description: "Your form has been successfully submitted.",
//       });

//       router.push(
//         `/students?collegeid=${selectedCollege}&classid=${classid}`
//       );
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   }

//   return (
//     <Form {...form} >
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-9/12 space-y-6  ">
//         <FormField
//           control={form.control}
//           name="college"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>College</FormLabel>
//               <Select
//                 value={field.value}
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   setSelectedCollege(value);
//                 }}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a college" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {colleges.map((college: any) => (
//                     <SelectItem key={college.id} value={college.id.toString()}>
//                       {college.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Department */}
//         <FormField
//           control={form.control}
//           name="department"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Department</FormLabel>
//               <Select
//                 value={field.value}
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   setSelectedDepartmentidId(value);
//                 }}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a Department" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {departments.map((department: any) => (
//                     <SelectItem
//                       key={department.id}
//                       value={department.id.toString()}
//                     >
//                       {department.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="year"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Year</FormLabel>
//               <Select
//                 value={field.value}
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   setYear(parseInt(value, 10));
//                 }}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select year" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {yearArray.map((year) => (
//                     <SelectItem key={year} value={year.toString()}>
//                       {year}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="division"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Division</FormLabel>
//               <Select
//                 value={field.value}
//                 onValueChange={(value) => {
//                   field.onChange(value);
//                   setDivision(value);
//                 }}
//               >
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a Division" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {divisionArray.map((division) => (
//                     <SelectItem key={division} value={division}>
//                       {division}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import { toast } from "../../../../packages/ui/src/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  college: z.string({
    required_error: "Please select a college.",
  }),
  department: z.string({
    required_error: "Please select a department.",
  }),
  year: z
    .string({
      required_error: "Please select a year.",
    })
    .refine((value) => !isNaN(Number(value)), {
      message: "Year must be a number.",
    }),
  division: z.string({
    required_error: "Please select a division.",
  }),
});

const aprUrl = process.env.NEXT_PUBLIC_API_URL;

export function SelectForm() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [classid, setClassid] = useState<number>(0);
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartmentid, setSelectedDepartmentidId] = useState<string>("");
  const [year, setYear] = useState<number>(0);
  const [division, setDivision] = useState<string>("");
  const router = useRouter();

  const yearArray = [1, 2, 3, 4];
  const divisionArray = ["A", "B", "C"];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    async function fetchColleges() {
      try {
        const response = await fetch(`${aprUrl}/api/college`);
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    }

    fetchColleges();
  }, []);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(`${aprUrl}/api/department`);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }

    fetchDepartments();
  }, []);

  useEffect(() => {
    async function fetchClassId(): Promise<void> {
      try {
        if (selectedCollege && selectedDepartmentid && year && division) {
          const response = await fetch(
            `${aprUrl}/api/class?collegeid=${selectedCollege}&departmentid=${selectedDepartmentid}&year=${year}&division=${division}`
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const classid = await response.json();
          setClassid(classid.id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchClassId();
  }, [selectedCollege, selectedDepartmentid, year, division]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      toast({
        title: "Form Submitted",
        description: "Your form has been successfully submitted.",
      });

      router.push(
        `/students?collegeid=${selectedCollege}&classid=${classid}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto p-4 mt-8"
      >
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel className="text-lg font-semibold">College</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedCollege(value);
                }}
                
              >
                <FormControl>
                  <SelectTrigger className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a college" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                  {colleges.map((college: any) => (
                    <SelectItem key={college.id} value={college.id.toString()}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel className="text-lg font-semibold">Department</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedDepartmentidId(value);
                }}
                
              >
                <FormControl>
                  <SelectTrigger className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                  {departments.map((department: any) => (
                    <SelectItem key={department.id} value={department.id.toString()}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel className="text-lg font-semibold">Year</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setYear(parseInt(value, 10));
                }}
                
              >
                <FormControl>
                  <SelectTrigger className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                  {yearArray.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel className="text-lg font-semibold">Division</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  setDivision(value);
                }}
                
              >
                <FormControl>
                  <SelectTrigger className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select a Division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
                  {divisionArray.map((division) => (
                    <SelectItem key={division} value={division}>
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600 text-sm" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
