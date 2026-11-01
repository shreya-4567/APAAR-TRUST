export type RoleType = 'REGISTRAR' | 'STUDENT' | 'REGULATOR' | 'VERIFIER';

export type StudentStatus = 'VERIFIED' | 'FLAGGED_CONCURRENCY' | 'NAME_MISMATCH' | 'PENDING';

export interface StudentRecord {
  id: string;
  apaarId: string; // 12-digit APAAR / EduID
  udisePen: string; // UDISE+ Permanent Education Number
  fullName: string;
  aadhaarMatchName: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup: string;
  collegeId: string;
  collegeName: string;
  program: string;
  branch: string;
  academicYear: string;
  semester: number;
  rollNumber: string;
  quotaCategory: 'OPEN' | 'OBC' | 'SC' | 'ST' | 'EWS';
  status: StudentStatus;
  abcCredits: number;
  abcAccountId: string;
  enrollmentDate: string;
  photoUrl: string;
  verificationHash: string;
  contactEmail: string;
  contactPhone: string;
  concurrencyDetails?: {
    secondCollegeId: string;
    secondCollegeName: string;
    secondBranch: string;
    detectedAt: string;
  };
  nameMismatchScore?: number; // e.g. 84% fuzzy match
}

export interface QuotaCap {
  branchCode: string;
  branchName: string;
  approvedIntake: number;
  admittedCount: number;
  generalQuota: { cap: number; filled: number };
  obcQuota: { cap: number; filled: number };
  scStQuota: { cap: number; filled: number };
  ewsQuota: { cap: number; filled: number };
  status: 'COMPLIANT' | 'OVER_CAPACITY' | 'CRITICAL_SPACE';
}

export interface ConcurrencyAlert {
  id: string;
  apaarId: string;
  studentName: string;
  academicYear: string;
  collegeA: {
    id: string;
    name: string;
    branch: string;
    admissionDate: string;
  };
  collegeB: {
    id: string;
    name: string;
    branch: string;
    admissionDate: string;
  };
  detectedTimestamp: string;
  status: 'ACTIVE_VIOLATION' | 'RESOLVED_SEAT_RELEASED' | 'NOC_TRANSFERRED';
  penaltyStatus: string;
}

export interface DpdpConsentToken {
  id: string;
  verifierName: string;
  organization: string;
  purpose: 'EMPLOYMENT_SCREENING' | 'HIGHER_STUDIES_ADMISSION' | 'SCHOLARSHIP_VALIDATION' | 'VISA_PROCESSING';
  scope: 'CREDENTIALS_ONLY' | 'FULL_TRANSCRIPT' | 'IDENTITY_ONLY';
  tokenHash: string;
  expiresAt: string;
  issuedAt: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  accessCount: number;
}

export interface AuditTrailEntry {
  id: string;
  blockNumber: number;
  timestamp: string;
  actor: string;
  actorRole: 'REGISTRAR' | 'STUDENT' | 'AICTE_REGULATOR' | 'SYSTEM_RULES_ENGINE' | 'THIRD_PARTY_VERIFIER';
  action: string;
  entityId: string;
  ipAddress: string;
  prevHash: string;
  currentHash: string;
  status: 'VALID' | 'TAMPERED';
}

export interface OfflineMutation {
  id: string;
  type: 'ENROLL_STUDENT' | 'UPDATE_CONSENT' | 'QUOTA_OVERRIDE';
  payload: any;
  timestamp: string;
  synced: boolean;
}

export interface AbcCreditCourse {
  courseCode: string;
  courseTitle: string;
  institution: string;
  semester: string;
  creditsEarned: number;
  grade: string;
  verifiedByDigiLocker: boolean;
}
