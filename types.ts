
export interface TeamMember {
  fullName: string;
  grade: string;
  roles: string[];
}

export interface RegistrationData {
  teamName: string;
  memberCount: '1' | '2';
  leader: TeamMember;
  member2?: TeamMember;
  problemStatement: string;
  solution: string;
  techStack: string;
  aiUsage: string;
  pitchFile?: File | null;
  acceptedPolicy: boolean;
}

export enum Grade {
  GRADE_7 = "Grade 7",
  GRADE_8 = "Grade 8",
  GRADE_9 = "Grade 9",
  GRADE_10 = "Grade 10",
  GRADE_11 = "Grade 11",
  GRADE_12 = "Grade 12",
}

export const ROLES = [
  "Backend Dev",
  "Frontend Dev",
  "UI/UX Design",
  "Pitch/Research"
];
