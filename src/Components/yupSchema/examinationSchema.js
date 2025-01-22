import * as Yup from "yup";

export const examinationSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"), // Keep as `date` if it maps to `examDate`
  subject: Yup.string().required("Subject is required"), // Keep as `subject` if it maps to `subjectId`
  examType: Yup.string().required("Exam Type is required"),
});
