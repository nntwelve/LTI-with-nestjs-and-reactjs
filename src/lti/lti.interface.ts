export interface ILtiVariables {
  userid: number;
  user_name: string;
  courseid: number | string; // Trong trường hợp mở LTI ở global sẽ không có course id
  course_name: string;
  role: string[];
}

export enum USER_ROLE {
  INSTRUCTOR = 'Instructor',
  STUDENT = 'Student',
  ADMINISTRATOR = 'Administrator',
}
