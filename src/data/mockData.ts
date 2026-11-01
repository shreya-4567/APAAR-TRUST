import {
  StudentRecord,
  QuotaCap,
  ConcurrencyAlert,
  DpdpConsentToken,
  AuditTrailEntry,
  AbcCreditCourse
} from '../types';

export const CURRENT_COLLEGE = {
  id: 'AICTE-DEL-0492',
  name: 'Delhi Institute of Engineering & Technology',
  location: 'Sector 14, Dwarka, New Delhi 110078',
  affiliation: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
  approvalYear: '1998',
  registrarName: 'Prof. Rajeshwar K. Sharma',
  registrarEmail: 'registrar@diet.ac.in',
  contactPhone: '+91-11-2808-4100',
  currentAcademicYear: '2024-2025'
};

export const INITIAL_QUOTA_CAPS: QuotaCap[] = [
  {
    branchCode: 'CSE-101',
    branchName: 'Computer Science & Engineering',
    approvedIntake: 180,
    admittedCount: 178,
    generalQuota: { cap: 90, filled: 90 },
    obcQuota: { cap: 48, filled: 47 },
    scStQuota: { cap: 24, filled: 23 },
    ewsQuota: { cap: 18, filled: 18 },
    status: 'COMPLIANT'
  },
  {
    branchCode: 'AIDS-102',
    branchName: 'Artificial Intelligence & Data Science',
    approvedIntake: 120,
    admittedCount: 121, // Over capacity anomaly!
    generalQuota: { cap: 60, filled: 61 },
    obcQuota: { cap: 32, filled: 32 },
    scStQuota: { cap: 16, filled: 16 },
    ewsQuota: { cap: 12, filled: 12 },
    status: 'OVER_CAPACITY'
  },
  {
    branchCode: 'ECE-103',
    branchName: 'Electronics & Communication Engg',
    approvedIntake: 120,
    admittedCount: 106,
    generalQuota: { cap: 60, filled: 52 },
    obcQuota: { cap: 32, filled: 29 },
    scStQuota: { cap: 16, filled: 14 },
    ewsQuota: { cap: 12, filled: 11 },
    status: 'COMPLIANT'
  },
  {
    branchCode: 'MECH-104',
    branchName: 'Mechanical & Automation Engg',
    approvedIntake: 60,
    admittedCount: 44,
    generalQuota: { cap: 30, filled: 22 },
    obcQuota: { cap: 16, filled: 11 },
    scStQuota: { cap: 8, filled: 7 },
    ewsQuota: { cap: 6, filled: 4 },
    status: 'COMPLIANT'
  }
];

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'STU-2024-001',
    apaarId: '9845-2104-7832',
    udisePen: 'PEN2024-912048',
    fullName: 'Rohit K. Verma',
    aadhaarMatchName: 'Rohit Kumar Verma',
    dob: '2004-06-15',
    gender: 'MALE',
    bloodGroup: 'B+',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Computer Science & Engineering',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492CSE202401',
    quotaCategory: 'OPEN',
    status: 'VERIFIED',
    abcCredits: 86,
    abcAccountId: 'ABC-982-149-102',
    enrollmentDate: '2024-08-01',
    photoUrl: '/src/assets/images/student_avatar_rohit_1793498043402.jpg',
    verificationHash: '9a3f2b8e4c7d1e0f6b5a8c9d2e1f4a7b3c8e5d2f1a4c7e0b9d6f3a8e2c5b7d1',
    contactEmail: 'rohit.verma@diet.ac.in',
    contactPhone: '+91-98712-44102'
  },
  {
    id: 'STU-2024-002',
    apaarId: '4512-8901-3341',
    udisePen: 'PEN2024-884102',
    fullName: 'Priya Sharma',
    aadhaarMatchName: 'Priya Sharma',
    dob: '2004-09-22',
    gender: 'FEMALE',
    bloodGroup: 'O+',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Artificial Intelligence & Data Science',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492AIDS202402',
    quotaCategory: 'OPEN',
    status: 'VERIFIED',
    abcCredits: 92,
    abcAccountId: 'ABC-774-312-890',
    enrollmentDate: '2024-08-01',
    photoUrl: '/src/assets/images/student_avatar_ananya_1793498043260.jpg',
    verificationHash: '8b2c4e6a8d0f2b4c6e8a0d2f4b6c8e0a2d4f6b8c0e2a4d6f8b0c2e4a6d8f0b2',
    contactEmail: 'priya.sharma@diet.ac.in',
    contactPhone: '+91-98103-66291'
  },
  {
    id: 'STU-2024-003',
    apaarId: '8821-4920-1174',
    udisePen: 'PEN2024-341902',
    fullName: 'Kabir Mehta',
    aadhaarMatchName: 'Kabir Mehta',
    dob: '2004-03-10',
    gender: 'MALE',
    bloodGroup: 'A+',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Computer Science & Engineering',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492CSE202488',
    quotaCategory: 'OPEN',
    status: 'FLAGGED_CONCURRENCY', // Anti-seat hoarding alert!
    abcCredits: 74,
    abcAccountId: 'ABC-661-894-301',
    enrollmentDate: '2024-08-04',
    photoUrl: '',
    verificationHash: '7c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1',
    contactEmail: 'kabir.mehta@diet.ac.in',
    contactPhone: '+91-99881-22941',
    concurrencyDetails: {
      secondCollegeId: 'AICTE-MH-1102',
      secondCollegeName: 'Maharashtra College of Technology, Pune',
      secondBranch: 'B.Tech CSE',
      detectedAt: '2024-08-05 14:22:10 IST'
    }
  },
  {
    id: 'STU-2024-004',
    apaarId: '3209-1148-9633',
    udisePen: 'PEN2024-554210',
    fullName: 'Vikram S. Singhania',
    aadhaarMatchName: 'Vikramaditya Shailendra Singhania',
    dob: '2003-11-28',
    gender: 'MALE',
    bloodGroup: 'AB+',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Electronics & Communication Engg',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492ECE202419',
    quotaCategory: 'OBC',
    status: 'NAME_MISMATCH', // Fuzzy demographic issue
    nameMismatchScore: 82,
    abcCredits: 78,
    abcAccountId: 'ABC-449-112-909',
    enrollmentDate: '2024-08-02',
    photoUrl: '',
    verificationHash: '6d2e4f8a0c2e4f6a8c0e2a4f6b8d0f2b4c6e8a0d2f4b6c8e0a2d4f6b8c0e2a4',
    contactEmail: 'vikram.singhania@diet.ac.in',
    contactPhone: '+91-97114-88320'
  },
  {
    id: 'STU-2024-005',
    apaarId: '7610-3329-8451',
    udisePen: 'PEN2024-119284',
    fullName: 'Ananya Deshmukh',
    aadhaarMatchName: 'Ananya Deshmukh',
    dob: '2004-12-04',
    gender: 'FEMALE',
    bloodGroup: 'A-',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Artificial Intelligence & Data Science',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492AIDS202415',
    quotaCategory: 'EWS',
    status: 'VERIFIED',
    abcCredits: 90,
    abcAccountId: 'ABC-338-921-764',
    enrollmentDate: '2024-08-01',
    photoUrl: '',
    verificationHash: '5e3f1a9b7c5d3e1f9a7b5c3d1e9f7a5b3c1d9e7f5a3b1c9d7e5f3a1b9c7d5e3',
    contactEmail: 'ananya.deshmukh@diet.ac.in',
    contactPhone: '+91-98701-55243'
  },
  {
    id: 'STU-2024-006',
    apaarId: '6194-8205-4421',
    udisePen: 'PEN2024-773190',
    fullName: 'Devansh K. Nair',
    aadhaarMatchName: 'Devansh Krishna Nair',
    dob: '2004-01-19',
    gender: 'MALE',
    bloodGroup: 'O-',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Mechanical & Automation Engg',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492MECH202409',
    quotaCategory: 'SC',
    status: 'VERIFIED',
    abcCredits: 70,
    abcAccountId: 'ABC-220-419-873',
    enrollmentDate: '2024-08-03',
    photoUrl: '',
    verificationHash: '4f2a8b6c0d4e2f8a6c0d4e2f8a6c0d4e2f8a6c0d4e2f8a6c0d4e2f8a6c0d4e2',
    contactEmail: 'devansh.nair@diet.ac.in',
    contactPhone: '+91-98442-99014'
  },
  {
    id: 'STU-2024-007',
    apaarId: '5421-9984-1234',
    udisePen: 'PEN2024-602931',
    fullName: 'Simran Kaur',
    aadhaarMatchName: 'Simran Kaur',
    dob: '2004-07-30',
    gender: 'FEMALE',
    bloodGroup: 'B+',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Computer Science & Engineering',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492CSE202422',
    quotaCategory: 'OBC',
    status: 'VERIFIED',
    abcCredits: 88,
    abcAccountId: 'ABC-881-239-504',
    enrollmentDate: '2024-08-01',
    photoUrl: '',
    verificationHash: '3a1b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3',
    contactEmail: 'simran.kaur@diet.ac.in',
    contactPhone: '+91-98110-33291'
  },
  {
    id: 'STU-2024-008',
    apaarId: '1982-4439-5567',
    udisePen: 'PEN2024-441092',
    fullName: 'Tanmay Bhattacharya',
    aadhaarMatchName: 'Tanmay Bhattacharya',
    dob: '2003-10-14',
    gender: 'MALE',
    bloodGroup: 'O+',
    collegeId: 'AICTE-DEL-0492',
    collegeName: 'Delhi Institute of Engineering & Technology',
    program: 'B.Tech',
    branch: 'Electronics & Communication Engg',
    academicYear: '2024-2025',
    semester: 4,
    rollNumber: '0492ECE202444',
    quotaCategory: 'OPEN',
    status: 'PENDING',
    abcCredits: 64,
    abcAccountId: 'ABC-992-104-553',
    enrollmentDate: '2024-08-06',
    photoUrl: '',
    verificationHash: '2b4c6e8a0d2f4b6c8e0a2d4f6b8c0e2a4d6f8b0c2e4a6d8f0b2c4e6a8d0f2b4',
    contactEmail: 'tanmay.b@diet.ac.in',
    contactPhone: '+91-98301-22940'
  }
];

export const INITIAL_CONCURRENCY_ALERTS: ConcurrencyAlert[] = [
  {
    id: 'CONC-2024-910',
    apaarId: '8821-4920-1174',
    studentName: 'Kabir Mehta',
    academicYear: '2024-2025',
    collegeA: {
      id: 'AICTE-DEL-0492',
      name: 'Delhi Institute of Engineering & Technology',
      branch: 'Computer Science & Engineering',
      admissionDate: '2024-08-04'
    },
    collegeB: {
      id: 'AICTE-MH-1102',
      name: 'Maharashtra College of Technology, Pune',
      branch: 'Computer Science & Engineering',
      admissionDate: '2024-08-05'
    },
    detectedTimestamp: '2024-08-05 14:22:10 IST',
    status: 'ACTIVE_VIOLATION',
    penaltyStatus: 'AICTE Notice Triggered · 48-Hour Response Required'
  },
  {
    id: 'CONC-2024-892',
    apaarId: '7721-0941-5582',
    studentName: 'Aarushi Sengupta',
    academicYear: '2024-2025',
    collegeA: {
      id: 'AICTE-WB-0129',
      name: 'Kolkata Institute of Applied Science',
      branch: 'Electronics & Communication Engg',
      admissionDate: '2024-07-28'
    },
    collegeB: {
      id: 'AICTE-DEL-0492',
      name: 'Delhi Institute of Engineering & Technology',
      branch: 'Artificial Intelligence & Data Science',
      admissionDate: '2024-08-01'
    },
    detectedTimestamp: '2024-08-01 16:45:00 IST',
    status: 'RESOLVED_SEAT_RELEASED',
    penaltyStatus: 'Resolved: WB Seat Released via DigiLocker Auto-NOC'
  }
];

export const INITIAL_DPDP_CONSENTS: DpdpConsentToken[] = [
  {
    id: 'CONSENT-9941',
    verifierName: 'Tata Consultancy Services - Campus Hiring',
    organization: 'TCS Innovation Labs, India',
    purpose: 'EMPLOYMENT_SCREENING',
    scope: 'FULL_TRANSCRIPT',
    tokenHash: 'tok_live_7f8a9b2c3d4e5f6a1b2c',
    issuedAt: '2026-10-25 10:30 IST',
    expiresAt: '2026-11-25 23:59 IST',
    status: 'ACTIVE',
    accessCount: 3
  },
  {
    id: 'CONSENT-9812',
    verifierName: 'IIT Delhi - M.Tech Admissions Cell',
    organization: 'Indian Institute of Technology Delhi',
    purpose: 'HIGHER_STUDIES_ADMISSION',
    scope: 'CREDENTIALS_ONLY',
    tokenHash: 'tok_live_1a2b3c4d5e6f7a8b9c0d',
    issuedAt: '2026-10-18 14:15 IST',
    expiresAt: '2026-11-01 18:00 IST',
    status: 'ACTIVE',
    accessCount: 5
  },
  {
    id: 'CONSENT-8740',
    verifierName: 'Infosys Finacle Engineering Verification',
    organization: 'Infosys Technologies Ltd.',
    purpose: 'EMPLOYMENT_SCREENING',
    scope: 'CREDENTIALS_ONLY',
    tokenHash: 'tok_live_0d9c8b7a6f5e4d3c2b1a',
    issuedAt: '2026-09-10 09:00 IST',
    expiresAt: '2026-09-25 23:59 IST',
    status: 'EXPIRED',
    accessCount: 2
  }
];

export const STUDENT_ABC_COURSES: AbcCreditCourse[] = [
  {
    courseCode: 'CS201',
    courseTitle: 'Data Structures & Algorithms',
    institution: 'Delhi Institute of Engineering & Technology',
    semester: 'Semester 3 (Autumn 2024)',
    creditsEarned: 4,
    grade: 'A+ (9.2/10)',
    verifiedByDigiLocker: true
  },
  {
    courseCode: 'CS204',
    courseTitle: 'Computer Organization & Architecture',
    institution: 'Delhi Institute of Engineering & Technology',
    semester: 'Semester 3 (Autumn 2024)',
    creditsEarned: 4,
    grade: 'A (8.7/10)',
    verifiedByDigiLocker: true
  },
  {
    courseCode: 'CS301',
    courseTitle: 'Design and Analysis of Algorithms',
    institution: 'Delhi Institute of Engineering & Technology',
    semester: 'Semester 4 (Spring 2025)',
    creditsEarned: 4,
    grade: 'A+ (9.4/10)',
    verifiedByDigiLocker: true
  },
  {
    courseCode: 'SWAYAM-AI40',
    courseTitle: 'Deep Learning for NLP & Computer Vision',
    institution: 'NPTEL / IIT Madras (SWAYAM Portal)',
    semester: 'Semester 4 (Spring 2025)',
    creditsEarned: 3,
    grade: 'Elite+Gold (91%)',
    verifiedByDigiLocker: true
  },
  {
    courseCode: 'MA202',
    courseTitle: 'Discrete Mathematical Structures',
    institution: 'Delhi Institute of Engineering & Technology',
    semester: 'Semester 2 (Spring 2024)',
    creditsEarned: 4,
    grade: 'A (8.5/10)',
    verifiedByDigiLocker: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditTrailEntry[] = [
  {
    id: 'LOG-10492',
    blockNumber: 10492,
    timestamp: '2026-10-31 18:45:12 IST',
    actor: 'Prof. Rajeshwar K. Sharma (Registrar)',
    actorRole: 'REGISTRAR',
    action: 'BULK_IMPORT_STUDENT_BATCH',
    entityId: 'BATCH_2024_CSE_48RECS',
    ipAddress: '14.139.224.18 (DELHI-CAMPUS-LAN)',
    prevHash: '6a8b1c4d9e2f5a7b0c3d6e8f1a4b7c9d2e5f8a0b3c6d9e1f4a7b0c2d5e8f1a4',
    currentHash: '7b9c2d5e8f1a4b7c0d3e6f8a1b4c7d9e2f5a8b0c3d6e9f1a4b7c0d2e5f8a1b4',
    status: 'VALID'
  },
  {
    id: 'LOG-10491',
    blockNumber: 10491,
    timestamp: '2026-10-31 17:30:04 IST',
    actor: 'Python Anomaly Shield v2.4',
    actorRole: 'SYSTEM_RULES_ENGINE',
    action: 'CONCURRENCY_VIOLATION_INTERCEPT',
    entityId: 'APAAR_8821_4920_1174',
    ipAddress: '10.0.4.19 (FASTAPI-MICROSERVICE-01)',
    prevHash: '5e7f0a3c8d1e4f6a9b2c5d7e0f3a6b8c1d4e7f9a2b5c8d0e3f6a9b1c4d7e0f3',
    currentHash: '6a8b1c4d9e2f5a7b0c3d6e8f1a4b7c9d2e5f8a0b3c6d9e1f4a7b0c2d5e8f1a4',
    status: 'VALID'
  },
  {
    id: 'LOG-10490',
    blockNumber: 10490,
    timestamp: '2026-10-31 16:12:49 IST',
    actor: 'Rohit K. Verma (Student)',
    actorRole: 'STUDENT',
    action: 'DPDP_CONSENT_TOKEN_GENERATED',
    entityId: 'CONSENT-9941_TCS',
    ipAddress: '49.36.112.44 (AIRTEL-5G-DELHI)',
    prevHash: '4d6e9f2b7c0d3e5f8a1b4c6d9e2f5a7b0c3d6e8f1a4b7c9d2e5f8a0b3c6d9e1',
    currentHash: '5e7f0a3c8d1e4f6a9b2c5d7e0f3a6b8c1d4e7f9a2b5c8d0e3f6a9b1c4d7e0f3',
    status: 'VALID'
  },
  {
    id: 'LOG-10489',
    blockNumber: 10489,
    timestamp: '2026-10-31 15:02:11 IST',
    actor: 'TCS HR Background Screener',
    actorRole: 'THIRD_PARTY_VERIFIER',
    action: 'INSTANT_APAAR_CREDENTIAL_VERIFY',
    entityId: 'APAAR_9845_2104_7832',
    ipAddress: '115.112.201.8 (TCS-GATEWAY-MUMBAI)',
    prevHash: '3c5d8e1a6b9c2d4e7f0a3b5c8d1e4f6a9b2c5d7e0f3a6b8c1d4e7f9a2b5c8d0',
    currentHash: '4d6e9f2b7c0d3e5f8a1b4c6d9e2f5a7b0c3d6e8f1a4b7c9d2e5f8a0b3c6d9e1',
    status: 'VALID'
  },
  {
    id: 'LOG-10488',
    blockNumber: 10488,
    timestamp: '2026-10-31 14:18:22 IST',
    actor: 'Dr. M. S. Poonia (AICTE Central Inspection)',
    actorRole: 'AICTE_REGULATOR',
    action: 'INTAKE_CAP_COMPLIANCE_AUDIT',
    entityId: 'AICTE-DEL-0492_CAPS',
    ipAddress: '164.100.158.40 (NIC-GOV-DELHI)',
    prevHash: '2b4c7d0e5a8b1c3d6e9f2a4b7c0d3e5f8a1b4c6d9e2f5a7b0c3d6e8f1a4b7c9',
    currentHash: '3c5d8e1a6b9c2d4e7f0a3b5c8d1e4f6a9b2c5d7e0f3a6b8c1d4e7f9a2b5c8d0',
    status: 'VALID'
  }
];

export const PYTHON_BLUEPRINT_CODE = {
  intakeGuard: `"""
TrueRoll Quota & Seat Intake Guard Microservice (FastAPI + Pydantic)
Validates institution batch uploads strictly against AICTE Approved Intake Caps.
"""
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Dict

app = FastAPI(title="TrueRoll Quota Engine", version="2.6.3")

class BranchQuotaConfig(BaseModel):
    branch_code: str
    approved_cap: int
    open_cap: int
    obc_cap: int
    sc_st_cap: int
    ews_cap: int

class StudentEnrollment(BaseModel):
    apaar_id: str = Field(..., regex=r"^\\d{4}-\\d{4}-\\d{4}$")
    branch_code: str
    quota_category: str
    academic_year: str

@app.post("/api/v1/quota/validate-batch")
async def validate_seat_intake(
    college_id: str,
    intake_limits: Dict[str, BranchQuotaConfig],
    current_admitted: Dict[str, int],
    new_enrollments: List[StudentEnrollment]
):
    violations = []
    projected = dict(current_admitted)

    for student in new_enrollments:
        bcode = student.branch_code
        if bcode not in intake_limits:
            violations.append({"apaar_id": student.apaar_id, "error": f"Branch {bcode} not approved by AICTE."})
            continue

        cap = intake_limits[bcode].approved_cap
        projected[bcode] = projected.get(bcode, 0) + 1

        # Real-time boundary guard
        if projected[bcode] > cap:
            violations.append({
                "apaar_id": student.apaar_id,
                "branch_code": bcode,
                "projected_total": projected[bcode],
                "approved_cap": cap,
                "error": f"AICTE INTAKE VIOLATION: Exceeds approved seat quota ({cap}) for {bcode}."
            })

    return {
        "college_id": college_id,
        "is_compliant": len(violations) == 0,
        "total_violations": len(violations),
        "violations": violations
    }`,

  concurrencyShield: `"""
TrueRoll Anti-Seat Hoarding & Concurrency Shield
Enforces global unique index on (apaar_id, academic_year) across all 8,900+ AICTE institutions.
Prevents ghost admissions, simultaneous seat holding, and corrupt multi-college grant allocations.
"""
import asyncpg
from typing import Optional, Dict

class ConcurrencyShield:
    def __init__(self, db_pool: asyncpg.Pool):
        self.pool = db_pool

    async def verify_seat_claim(
        self,
        apaar_id: str,
        college_id: str,
        academic_year: str,
        branch_code: str
    ) -> Dict[str, any]:
        """
        Executes an atomic conditional lock in PostgreSQL:
        SELECT college_id, branch_code, admission_timestamp 
        FROM national_enrollments 
        WHERE apaar_id = $1 AND academic_year = $2 AND status = 'ACTIVE'
        """
        async with self.pool.acquire() as conn:
            existing = await conn.fetchrow(
                """
                SELECT college_id, college_name, branch_code, admission_date
                FROM aicte_national_registry
                WHERE apaar_id = $1 AND academic_year = $2 AND status = 'ENROLLED'
                """,
                apaar_id, academic_year
            )

            if existing:
                if existing['college_id'] != college_id:
                    # CONCURRENCY ALERT DETECTED!
                    return {
                        "allowed": False,
                        "anomaly": "MULTI_COLLEGE_CONCURRENCY",
                        "conflicting_college_id": existing['college_id'],
                        "conflicting_college_name": existing['college_name'],
                        "conflicting_branch": existing['branch_code'],
                        "admitted_on": existing['admission_date'].isoformat(),
                        "action_required": "TRANSFER_NOC_OR_SEAT_SURRENDER"
                    }

            return {"allowed": True, "anomaly": None}`,

  fuzzyMatcher: `"""
TrueRoll Fuzzy Demographic Reconciler (Phonetic & Jaro-Winkler)
Resolves minor naming deviations between college records and official DigiLocker/Aadhaar APAAR seeds.
Handles:
- Middle initials: 'Rohit K. Verma' -> 'Rohit Kumar Verma'
- Honorifics / Caste expansions: 'Vikram S. Singhania' -> 'Vikramaditya Shailendra Singhania'
"""
from jellyfish import jaro_winkler_similarity, soundex

def reconcile_student_name(college_name: str, digilocker_name: str) -> dict:
    c_clean = college_name.strip().upper()
    d_clean = digilocker_name.strip().upper()

    if c_clean == d_clean:
        return {"match": True, "score": 100.0, "status": "EXACT_MATCH"}

    # Jaro-Winkler metric favors prefix matches
    jw_score = jaro_winkler_similarity(c_clean, d_clean) * 100.0
    c_soundex = soundex(c_clean.split()[0])
    d_soundex = soundex(d_clean.split()[0])
    phonetic_match = (c_soundex == d_soundex)

    is_accepted = (jw_score >= 85.0) or (phonetic_match and jw_score >= 75.0)

    return {
        "match": is_accepted,
        "score": round(jw_score, 1),
        "phonetic_match": phonetic_match,
        "college_record": college_name,
        "digilocker_record": digilocker_name,
        "recommendation": "AUTO_RECONCILE" if is_accepted else "FLAG_FOR_MANUAL_REGISTRAR_VERIFICATION"
    }`
};

export const AICTE_REGIONAL_STATS = [
  { state: 'Delhi NCR', colleges: 284, enrolled: 312500, compliantPct: 99.1, anomalies: 3 },
  { state: 'Maharashtra', colleges: 1140, enrolled: 890400, compliantPct: 98.4, anomalies: 14 },
  { state: 'Karnataka', colleges: 560, enrolled: 520100, compliantPct: 99.4, anomalies: 2 },
  { state: 'Tamil Nadu', colleges: 940, enrolled: 780900, compliantPct: 97.9, anomalies: 19 },
  { state: 'Uttar Pradesh', colleges: 1210, enrolled: 940200, compliantPct: 96.8, anomalies: 28 },
  { state: 'Telangana', colleges: 480, enrolled: 410800, compliantPct: 98.7, anomalies: 6 }
];
