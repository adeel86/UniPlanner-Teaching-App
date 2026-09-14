export type AssessmentStatus = 'In progress' | 'Not started' | 'Submitted';

export type Module = {
  id: string;
  code: string;
  name: string;
  description: string;
  lecturer: string;
  color: 'coral' | 'mint' | 'sky' | 'gold';
};

export type Assessment = {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  dueDate: string;
  dueLabel: string;
  weighting: number;
  status: AssessmentStatus;
};

export type Task = {
  id: string;
  title: string;
  dueDate: string;
  dueLabel: string;
  completed: boolean;
};

export const student = {
  name: 'Maya Thompson',
  email: 'maya.thompson@northbridge.ac.uk',
  programme: 'MSc Software Engineering',
  year: 'Year 1',
};

export const modules: Module[] = [
  {
    id: 'advanced-software',
    code: '7CS123',
    name: 'Advanced Software Engineering',
    description:
      'Explore architecture, design patterns, testing, refactoring, and professional delivery practices.',
    lecturer: 'Dr. Eleanor Price',
    color: 'coral',
  },
  {
    id: 'cloud-computing',
    code: '7CS145',
    name: 'Cloud Computing',
    description:
      'Design scalable cloud systems and evaluate the trade-offs behind modern deployment choices.',
    lecturer: 'Prof. Amir Khan',
    color: 'sky',
  },
  {
    id: 'data-analytics',
    code: '7CS151',
    name: 'Data Analytics',
    description:
      'Use statistical reasoning and visualisation to turn data into useful decisions.',
    lecturer: 'Dr. Olivia Chen',
    color: 'mint',
  },
];

export const assessments: Assessment[] = [
  {
    id: 'ase-coursework',
    moduleId: 'advanced-software',
    title: 'Architecture case study',
    description:
      'Compare two architectures and justify a recommendation using quality attributes.',
    dueDate: '2026-09-24',
    dueLabel: '24 Sep',
    weighting: 30,
    status: 'In progress',
  },
  {
    id: 'cloud-presentation',
    moduleId: 'cloud-computing',
    title: 'Cloud migration presentation',
    description:
      'Present a migration plan for a small service, including risks and rollback strategy.',
    dueDate: '2026-10-02',
    dueLabel: '02 Oct',
    weighting: 20,
    status: 'Not started',
  },
  {
    id: 'analytics-report',
    moduleId: 'data-analytics',
    title: 'Exploratory data report',
    description:
      'Create a concise report that explains findings from a real-world dataset.',
    dueDate: '2026-10-09',
    dueLabel: '09 Oct',
    weighting: 50,
    status: 'Not started',
  },
];

export const initialTasks: Task[] = [
  {
    id: 'read-week-2',
    title: 'Read Week 2 architecture notes',
    dueDate: '2026-09-16',
    dueLabel: 'Tomorrow',
    completed: false,
  },
  {
    id: 'book-tutorial',
    title: 'Book software engineering tutorial',
    dueDate: '2026-09-17',
    dueLabel: 'Thu 17 Sep',
    completed: false,
  },
  {
    id: 'review-rubric',
    title: 'Review the assessment rubric',
    dueDate: '2026-09-18',
    dueLabel: 'Fri 18 Sep',
    completed: true,
  },
];

export function getModule(moduleId: string) {
  return modules.find((module) => module.id === moduleId);
}

export function getAssessment(assessmentId: string) {
  return assessments.find((assessment) => assessment.id === assessmentId);
}

export function getAssessmentModule(assessment: Assessment) {
  return getModule(assessment.moduleId);
}