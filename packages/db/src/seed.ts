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
        password: await bcrypt.hash('securepassword', 10), // Hash the password
        role: 'ADMIN',
      },
      {
        name: faker.person.fullName(),
        email: 'teacher@example.com',
        password: await bcrypt.hash('securepassword', 10), // Hash the password
        role: 'TEACHER',
      },
    ],
  });

  // Seed Colleges
  await prisma.college.createMany({
    data: [
      { name: "KITs College of engineering" },
      { name: "SM Lohia Junier college"},
    ],
  });

  // Seed Classes
  await prisma.class.createMany({
    data: [
      { year: 1, division: 'A', department: 'Computer Science' },
      { year: 1, division: 'B', department: 'Computer Science' },
      { year: 2, division: 'B', department: 'Mechanical' },
    ],
  });

  // Seed Students
  await prisma.student.createMany({
    data: await Promise.all(
      Array.from({ length: 10 }, async () => ({
        name: faker.person.fullName(),
        prn: faker.number.int({ min: 2223000000, max: 2223999999 }).toString(),
        collegeId: faker.helpers.arrayElement([1, 2]),
        classId: faker.helpers.arrayElement([1, 2, 3]),
        password: await bcrypt.hash('demo123', 10), // Hash the password
      })),
    ),
  });

  // Seed Subjects
  await prisma.subject.createMany({
    data: [
      { name: 'Mathematics' },
      { name: 'Physics' },
    ],
  });

  // Seed ExamMarks
  const students = await prisma.student.findMany();
  const subjects = await prisma.subject.findMany();
  const examMarks = [];

  for (let i = 0; i < 20; i++) {
    examMarks.push({
      studentId: faker.helpers.arrayElement(students).id,
      subjectId: faker.helpers.arrayElement(subjects).id,
      totalMark: 100,
      obtainedMark: faker.number.int({ min: 50, max: 100 }),
      examDate: faker.date.past(),
    });
  }

  await prisma.examMark.createMany({
    data: examMarks,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
