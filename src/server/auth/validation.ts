import { z } from "zod";

export const passwordValidation = z.string()
  .min(8, "Password must contain at least 8 characters")
  .max(255, "Password must contain at most 255 characters")
  .superRefine((password, complexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) => /[`!@#$%^&*]/.test(ch);

    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;

    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }

    if (countOfLowerCase < 1) {
      complexity.addIssue({
        code: "custom",
        message: "Password must contain at least 1 lowercase character",
      });
    }

    if (countOfUpperCase < 1) {
      complexity.addIssue({
        code: "custom",
        message: "Password must contain at least 1 uppercase character",
      });
    }

    if (countOfSpecialChar < 1) {
      complexity.addIssue({
        code: "custom",
        message: "Password must contain at least 1 special character !@#$%^&*",
      });
    }
    
    if (countOfNumbers < 1) {
      complexity.addIssue({
        code: "custom",
        message: "Password must contain at least 1 number",
      });
    }

  })