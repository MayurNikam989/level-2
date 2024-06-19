import { useState } from "react";

const useValidation = (values) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!values.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!values.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (isNaN(values.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be a number";
    } else if (values.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone Number should have 10 digits only";
    }

    if (!values.position) {
      newErrors.position = "Position is required";
    }

    if (
      (values.position === "Developer" || values.position === "Designer") &&
      !values.relevantExperience
    ) {
      newErrors.relevantExperience = "Relevant Experience is required";
    } else if (values.relevantExperience && isNaN(values.relevantExperience)) {
      newErrors.relevantExperience = "Relevant Experience must be a number";
    } else if (values.relevantExperience <= 0) {
      newErrors.relevantExperience =
        "Relevant Experience must be greater than 0";
    }

    if (values.position === "Designer" && !values.portfolioUrl) {
      newErrors.portfolioUrl = "Portfolio URL is required";
    } else if (
      values.portfolioUrl &&
      !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioUrl)
    ) {
      newErrors.portfolioUrl = "Invalid URL format";
    }

    if (values.position === "Manager" && !values.managementExperience) {
      newErrors.managementExperience = "Management Experience is required";
    }

    if (!values.additionalSkills.length) {
      newErrors.additionalSkills = "At least one skill must be selected";
    }

    if (!values.preferredInterviewTime) {
      newErrors.preferredInterviewTime = "Preferred Interview Time is required";
    } else if (isNaN(new Date(values.preferredInterviewTime).getTime())) {
      newErrors.preferredInterviewTime = "Invalid date and time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
};

export default useValidation;
