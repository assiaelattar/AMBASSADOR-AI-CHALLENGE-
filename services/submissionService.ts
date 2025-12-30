
import { RegistrationData } from '../types';

// Replace this with your actual Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

export const submitToGoogleSheet = async (data: RegistrationData): Promise<boolean> => {
  try {
    // Prepare data for the sheet (flattening the nested objects)
    const payload = {
      timestamp: new Date().toISOString(),
      teamName: data.teamName,
      memberCount: data.memberCount,
      leaderName: data.leader.fullName,
      leaderGrade: data.leader.grade,
      leaderRoles: data.leader.roles.join(', '),
      member2Name: data.member2?.fullName || 'N/A',
      member2Grade: data.member2?.grade || 'N/A',
      member2Roles: data.member2?.roles.join(', ') || 'N/A',
      problemStatement: data.problemStatement,
      solution: data.solution,
      techStack: data.techStack,
      aiUsage: data.aiUsage,
      pitchFileName: data.pitchFile?.name || 'No file',
      acceptedPolicy: data.acceptedPolicy
    };

    // Note: To handle file uploads to Google Drive, you would typically 
    // convert the file to base64 and send it to a separate Google Drive API 
    // or as a part of this multipart request.
    
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Common for Apps Script if not handling CORS explicitly
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // With 'no-cors', we won't get a standard response body, 
    // but the request will still reach the server.
    return true;
  } catch (error) {
    console.error('Submission failed:', error);
    return false;
  }
};
