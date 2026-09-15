export type ClassLevel = {
  label: string;
  value: string;
};

export type Section = {
  id: string;
  title: string;
  range: string;
  icon: string;
  levels: string[];
  description: string;
};

export const academicSections: Section[] = [
  {
    id: 'kindergarten',
    title: 'Kindergarten Section',
    range: 'Playgroup - Nursery 2',
    icon: 'Baby',
    levels: ['Playgroup', 'Pre-Nursery', 'Nursery 1', 'Nursery 2'],
    description:
      'A nurturing start where little ones learn through play, exploration, and gentle guidance.',
  },
  {
    id: 'primary',
    title: 'Primary Section',
    range: 'Primary 1 - Primary 5',
    icon: 'Pencil',
    levels: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5'],
    description:
      'Building strong foundations in literacy, numeracy, and critical thinking.',
  },
  {
    id: 'secondary',
    title: 'Secondary Section',
    range: 'JSS1 - SSS3',
    icon: 'GraduationCap',
    levels: ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'],
    description:
      'Preparing students for national exams and a successful future with a broad curriculum.',
  },
  {
    id: 'islamiyya',
    title: 'Islamiyya Section',
    range: 'Class 1 - Class 5',
    icon: 'BookOpen',
    levels: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
    description:
      'Rooted in Islamic values, teaching the Quran, Hadith, and moral character.',
  },
  {
    id: 'cocurricular',
    title: 'Co-Curricular Activities',
    range: 'Beyond the Classroom',
    icon: 'Trophy',
    levels: [
      'Sports Programs',
      'Music & Drama',
      'Debate & Public Speaking',
      'Science Club',
      'Computer Lab',
      'Community Service',
    ],
    description:
      'Developing well-rounded students through sports, arts, leadership, and service.',
  },
];

export type Faculty = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
};

export const faculty: Faculty[] = [
  {
    name: "Dr. Sa'adatu Sani Hanga",
    role: 'Proprietress',
    bio: 'PhD and visionary leader of the school, guiding its mission of excellence.',
    initials: 'SH',
    accent: 'from-amber-400 to-amber-600',
  },
  {
    name: 'Mr. Muhammad Farouk Yola',
    role: 'Digital Technologist & Chief Executive Officer',
    bio: 'Drives technology initiatives and oversees the overall management and direction of the school.',
    initials: 'MY',
    accent: 'from-cyan-400 to-cyan-600',
  },
  {
    name: 'Mr. Mansur A Uba',
    role: 'Principal',
    bio: 'Dedicated to excellence in education and student development.',
    initials: 'MU',
    accent: 'from-sky-400 to-sky-600',
  },
  {
    name: 'Mr. Moses Adadu',
    role: 'Vice Principal Secondary Section',
    bio: 'Experienced leader overseeing secondary academic programs and student welfare.',
    initials: 'MA',
    accent: 'from-emerald-400 to-emerald-600',
  },
  {
    name: 'Mr. Abubakar Bello',
    role: 'Vice Principal Primary Section & Admin',
    bio: 'Oversees primary section operations and school administration.',
    initials: 'AB',
    accent: 'from-teal-400 to-teal-600',
  },
  {
    name: 'Mrs. Fatima Muhammad Mutawakkil',
    role: 'School Superintendent & Head of Tahfeez Section & Accountant',
    bio: 'Oversees school standards and leads the Tahfeez Quran memorization program.',
    initials: 'FM',
    accent: 'from-pink-400 to-pink-600',
  },
  {
    name: 'Mrs. Fauziyya Ahmad Muhammad',
    role: 'Head of Science Department',
    bio: 'Focused on science excellence and laboratory innovation.',
    initials: 'FM',
    accent: 'from-rose-400 to-rose-600',
  },
  {
    name: 'Mrs. Dorcas Oloruwanti',
    role: 'Head of Languages Department',
    bio: 'Committed to strong language and literacy development.',
    initials: 'DO',
    accent: 'from-teal-400 to-teal-600',
  },
  {
    name: 'Malam Naziru Muhammad Musa',
    role: 'Head Master Islamiyya Section',
    bio: 'Leads the Islamiyya section with focus on Islamic studies and moral upbringing.',
    initials: 'NM',
    accent: 'from-violet-400 to-violet-600',
  },
  {
    name: 'Mr. Abba Muhammad',
    role: 'Sports Director',
    bio: "Leads the school's athletic and wellness programs.",
    initials: 'AM',
    accent: 'from-orange-400 to-orange-600',
  },
];

export const websiteUrl = 'https://acmsportal.com';

export const stats = [
  { value: '500+', label: 'Students' },
  { value: '50+', label: 'Faculty Members' },
  { value: '2019', label: 'Year Established' },
  { value: '95%', label: 'Pass Rate' },
];

export const admissionRequirements = [
  'Completed application form',
  'Birth certificate or national ID',
  'Previous school records/transcripts',
  'Medical certificate',
  'Two passport-sized photographs',
];

export const admissionSchedule = [
  { label: 'Application Period', value: 'Before or beginning of term' },
  { label: 'School Resumption', value: 'Monday, 7 September 2026' },
];

export const resultsCheckerUrl = 'https://acmsportal.com';

export const contactInfo = {
  address: [
    'Plot 1491/1492 Naibawa Gabas',
    'Baba Gaya Street, Off Dan Hassan Road',
    'Zaria Road, Kano, Nigeria',
  ],
  phones: ['08023715680', '08149981369', '09049947917', '07069009799'],
  website: 'https://acmsportal.com',
  email: 'amfusmodelschool@gmail.com',
  hours: ['Monday - Friday: 8:00 AM - 2:00 PM', 'Saturday: 9:00 AM - 12:00 PM'],
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'Faculty', href: '#faculty' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'Contact', href: '#contact' },
];
