
import { RegistrationData } from '../types';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const submitToGoogleSheet = async (data: RegistrationData): Promise<boolean> => {
  try {
    const submissionsRef = collection(db, "submissions");
    
    const payload = {
      createdAt: serverTimestamp(),
      teamName: data.teamName,
      memberCount: data.memberCount,
      leader: {
        fullName: data.leader.fullName,
        grade: data.leader.grade,
        roles: data.leader.roles
      },
      member2: data.memberCount === '2' ? {
        fullName: data.member2?.fullName || 'N/A',
        grade: data.member2?.grade || 'N/A',
        roles: data.member2?.roles || []
      } : null,
      problemStatement: data.problemStatement,
      solution: data.solution,
      techStack: data.techStack,
      aiUsage: data.aiUsage,
      pitchFileName: data.pitchFile?.name || 'No file attached',
      acceptedPolicy: data.acceptedPolicy
    };

    await addDoc(submissionsRef, payload);
    return true;
  } catch (error) {
    console.error('Submission failed:', error);
    return false;
  }
};
