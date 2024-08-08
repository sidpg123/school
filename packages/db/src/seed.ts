import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        name: faker.person.fullName(),
        email: 'admin@example.com',
        password: await bcrypt.hash('demo123', 10), // Hash the password
        role: 'ADMIN',
      },
      {
        name: faker.person.fullName(),
        email: 'teacher@example.com',
        password: await bcrypt.hash('demo123', 10), // Hash the password
        role: 'TEACHER',
      },
    ],
  });

//   // Seed Colleges
//   await prisma.college.createMany({
//     data: [
//       { name: "KITs College of engineering" },
//       { name: "SM Lohia Junier college"},
//     ],
//   });

//   // Seed Classes
//   await prisma.class.createMany({
//     data: [
//       { year: 1, division: 'A', department: 'Computer Science',collegeId: 1 },
//       { year: 1, division: 'B', department: 'Computer Science', collegeId: 1 },
//       { year: 2, division: 'B', department: 'Mechanical', collegeId: 2 },
//     ],
//   });

//   // Seed Students
//   await prisma.student.createMany({
//     data: await Promise.all(
//       Array.from({ length: 10 }, async () => ({
//         name: faker.person.fullName(),
//         prn: faker.number.int({ min: 2223000000, max: 2223999999 }).toString(),
//         collegeId: faker.helpers.arrayElement([1, 2]),  //[17, 18]),
//         classId: faker.helpers.arrayElement([1, 2, 3]),//([25, 26, 27]),
//         password: await bcrypt.hash('demo123', 10), // Hash the password
//       })),
//     ),
//   });

//   // Seed Subjects
//   await prisma.subject.createMany({
//     data: [
//       { name: 'Mathematics' },
//       { name: 'Physics' },
//     ],
//   });

//   // Seed ExamMarks
//   const students = await prisma.student.findMany();
//   const subjects = await prisma.subject.findMany();
//   const examMarks = [];

//   for (let i = 0; i < 20; i++) {
//     examMarks.push({
//       studentId: faker.helpers.arrayElement(students).id,
//       subjectId: faker.helpers.arrayElement(subjects).id,
//       totalMark: 100,
//       obtainedMark: faker.number.int({ min: 50, max: 100 }),
//       examDate: faker.date.past(),
//     });
//   }

//   await prisma.examMark.createMany({
//     data: examMarks,
//   });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// import { PrismaClient, Class, College, Department } from '@prisma/client';
// // import faker from 'faker';

// const prisma = new PrismaClient();

// async function seed() {
//   // Fetch existing colleges and departments
//   const colleges: College[] = await prisma.college.findMany();
//   const departments: Department[] = await prisma.department.findMany();

//   if (colleges.length < 2) {
//     throw new Error('At least 2 colleges are required.');
//   }

//   if (departments.length < 4) {
//     throw new Error('At least 4 departments are required.');
//   }

//   // Define years and divisions
//   const years = [1, 2, 3, 4];
//   const divisions = ['A', 'B', 'C'];

//   // Create Classes for each college, year, department, and division
//   await Promise.all(colleges.flatMap(college =>
//     departments.flatMap(department =>
//       years.flatMap(year =>
//         divisions.map(division =>
//           prisma.class.create({
//             data: {
//               year: year,
//               division: division,
//               collegeId: college.id,
//               departmentId: department.id
//             }
//           })
//         )
//       )
//     )
//   ));

//   // Fetch all created classes
//   const classes: Class[] = await prisma.class.findMany();

//   // Create Students and associate them with classes
//   await Promise.all(classes.map(cls =>
//     prisma.student.create({
//       data: {
//         name: faker.person.fullName(),
//         prn: faker.number.int({ min: 2223000000, max: 2223999999 }).toString(), // Use a UUID for a unique PRN
//         classId: cls.id,
//         collegeId: cls.collegeId,
//         password: faker.internet.password(),
//         rollNo: faker.number.int({ min: 1, max: 100 })
//       }
//     })
//   ));

//   console.log('Seeding completed.');
// }

// seed()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
// //   });
// import { PrismaClient, Class } from '@prisma/client';
// // import { faker } from '@faker-js/faker';

// const prisma = new PrismaClient();

// async function seed() {
//   // Fetch all existing classes
// //   const classes: Class[] = await prisma.class.findMany();

// //   // Create multiple students for each class
// //   await Promise.all(classes.flatMap(cls =>
// //     Array.from({ length: 5 }, () =>  // Adjust the number of students per class here
// //       prisma.student.create({
// //         data: {
// //           name: faker.person.fullName(),
// //           prn: faker.number.int({ min: 2223000000, max: 2223999999 }).toString(), // Generate a unique PRN
// //           classId: cls.id,
// //           collegeId: cls.collegeId,
// //           password: faker.internet.password(),
// //           rollNo: faker.number.int({ min: 1, max: 100 })
// //         }
// //       })
// //     )
// //   ));

// //   console.log('Student seeding completed.');
// // }
// await prisma.user.createMany({
//   data: [
//     {
//       name: faker.person.fullName(),
//       email: 'admin@example.com',
//       password: await bcrypt.hash('demo123', 10), // Hash the password
//       role: 'ADMIN',
//     },
//     {
//       name: faker.person.fullName(),
//       email: 'teacher@example.com',
//       password: await bcrypt.hash('demo123', 10), // Hash the password
//       role: 'TEACHER',
//     },
//   ],
// });

// seed()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
// }