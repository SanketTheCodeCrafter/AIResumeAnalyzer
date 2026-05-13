import httpClient from "../../../lib/axios";

/**
 * @description Generate interview report
 */
export const generateInterviewReport = async (data) => {
  const formData = new FormData();
  formData.append("resume", data.resume);
  formData.append("selfDescription", data.selfDescription);
  formData.append("jobDescription", data.jobDescription);

  return await httpClient.post("/api/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * @description Get interview report by ID
 */
export const getInterviewReport = async (id) => {
  return await httpClient.get(`/api/interview/${id}`);
};

/**
 * @description Get all interview reports
 */
export const getAllInterviewReports = async () => {
  return await httpClient.get("/api/interview");
};
