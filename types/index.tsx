export interface Facility {
  id: number;
  facility_name: string;
}

export interface User {
  id: number;
  email: string;
  facility: Facility;
  date_added: string;
}

interface GQLDataBase {
  __typename: string;
}

export interface PatientData extends GQLDataBase {
  full_name: string;
  id: string;
  gender?: string;
  dob?: string;
  telephone_number?: string;
  age?: string;
}

export interface PatientQueryObject {
  my_patients: PatientData[];
}

export interface VideoUploadData {
  id: number;
  signed_url: string;
  signed_signature_url: string;
  date_recorded: string;
  patient: PatientData;
  comment: string;
  doctor_status: "NEW" | "REOPENED" | "ARCHIVED";
  screener_status: "PENDING_REVIEW" | "REVIEWED" | "ARCHIVED";
  doctor_comments: DoctorCommentData[];
  screener_comments: ScreenerCommentData[];
}

export interface VideoUploadsQueryObject {
  my_video_uploads: VideoUploadData[];
}

export interface VideoUploadQueryObject {
  video_upload: VideoUploadData;
}

export interface DoctorCommentData {
  comment: string;
  date_added: string;
  physician: User;
  type?: "doctor";
}

export interface ScreenerCommentData {
  comment: string;
  date_added: string;
  screener: User;
  type?: "screener";
}
