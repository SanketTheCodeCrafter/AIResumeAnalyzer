import httpClient from "../../../lib/axios";

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
