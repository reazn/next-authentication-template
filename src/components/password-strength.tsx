"use client";

import {useEffect, useState} from "react"
  
export const PasswordStrength = (
  {password}: { password: string }) => {
  let [strength, setStrength] = useState(0);

  const calculateStrength = (password: string) => {
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

    let strengthScore = 0;
    if (countOfLowerCase >= 1) strengthScore++;
    if (countOfUpperCase >= 1) strengthScore++;
    if (countOfSpecialChar >= 1) strengthScore++;
    if (countOfNumbers >= 1) strengthScore++;

    return strengthScore;
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  const strengths = [
    {"bg-red-500": "Very weak"},
    {"bg-yellow-400": "Weak"},
    {"bg-green-500": "Good"},
    {"bg-green-500": "Strong"},
  ];

  return (
    <div>
      <div className="flex gap-1.5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-full rounded-full ${index < strength ? Object.keys(strengths[strength - 1])[0] : "bg-zinc-100"}`}
          />
        ))}
      </div>
      <p className="w-full text-end text-sm text-zinc-600">
        {strengths[strength - 1] ? Object.values(strengths[strength - 1]) : ""}
      </p>
    </div>
  );
};
