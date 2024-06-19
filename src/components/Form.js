import React from "react";
import { FormField } from "./Formfield";
import useForm from "../custom-hooks/useForm";
import useValidation from "../custom-hooks/useValidation";

const Form = () => {
  const [values, handleValueChange, setValues] = useForm({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioUrl: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });

  const { errors, validate } = useValidation(values);

  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(values, null, 2));
      setValues({
        fullName: "",
        email: "",
        phoneNumber: "",
        position: "",
        relevantExperience: "",
        portfolioUrl: "",
        managementExperience: "",
        additionalSkills: [],
        preferredInterviewTime: "",
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newSkills = checked
      ? [...values.additionalSkills, value]
      : values.additionalSkills.filter((skill) => skill !== value);

    setValues({
      ...values,
      additionalSkills: newSkills,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <FormField
          label="Full Name"
          name="fullName"
          type="name"
          value={values.fullName}
          onChange={handleValueChange}
          error={errors.fullName}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleValueChange}
          error={errors.email}
        />
        <FormField
          label="Phone Number"
          name="phoneNumber"
          type="text"
          value={values.phoneNumber}
          onChange={handleValueChange}
          error={errors.phoneNumber}
        />
        <label className="label">Applying for Position</label>
        <div style={{ marginTop: 0.5 + "rem" }}>
          <select
            name="position"
            value={values.position}
            onChange={handleValueChange}
          >
            <option value="">Select a position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.position && <p className="error">{errors.position}</p>}
        </div>

        {/* Dyanamic Form */}

        {(values.position === "Developer" ||
          values.position === "Designer") && (
          <div>
            <FormField
              label="Relevant Experience"
              type="text"
              name="relevantExperience"
              value={values.relevantExperience}
              onChange={handleValueChange}
              error={errors.relevantExperience}
            />
          </div>
        )}
        {values.position === "Designer" && (
          <div>
            <FormField
              label="Portfolio URL"
              type="text"
              name="portfolioUrl"
              value={values.portfolioUrl}
              onChange={handleValueChange}
              error={errors.portfolioUrl}
            />
          </div>
        )}
        {values.position === "Manager" && (
          <div>
            <FormField
              label="Management Experience"
              type="text"
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleValueChange}
              error={errors.managementExperience}
            />
          </div>
        )}

        <label className="label">Additional Skills</label>
        <div className="skills-container">
          {[
            "JavaScript",
            "CSS",
            "Python",
            "React",
            "Node.js",
            "Java",
            "C++",
            "Ruby",
            "PHP",
          ].map((skill, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name="additionalSkills"
                value={skill}
                checked={values.additionalSkills.includes(skill)}
                onChange={handleCheckboxChange}
              />
              <label>{skill}</label>
            </div>
          ))}
          {errors.additionalSkills && (
            <p className="error">{errors.additionalSkills}</p>
          )}
        </div>

        <div>
          <FormField
            label="Preferred Interview Time"
            type="datetime-local"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime}
            onChange={handleValueChange}
            error={errors.preferredInterviewTime}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
