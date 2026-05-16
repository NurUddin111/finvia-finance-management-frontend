import z from "zod";

export const signupZodSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid Name",
    })
    .min(2, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Name must be ${issue.minimum} characters long!`;
        }
      },
    })
    .max(50, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return `Name cannot exceed ${issue.minimum} characters!`;
        }
      },
    }),
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid Email",
    })
    .min(5, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Email must be ${issue.minimum} characters long!`;
        }
      },
    })
    .max(100, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return `Email cannot exceed ${issue.minimum} characters!`;
        }
      },
    }),
});

export const signupVerificationZodSchemaValidation = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters long"),
});

const passwordField = (label: string) =>
  z
    .string({
      error: (issue) =>
        issue.input === undefined ? `${label} is required` : `Invalid ${label}`,
    })
    .min(8, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `${label} must be ${issue.minimum} characters long!`;
        }
      },
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error: () =>
          `${label} must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character.`,
      },
    );

export const signupPasswordZodSchemaValidation = z.object({
  password: passwordField("Password"),
});

export const changePasswordZodSchemaValidation = z
  .object({
    oldPass: passwordField("Old password"),
    newPass: passwordField("New password"),
    confirmNewPass: passwordField("Confirm password"),
  })
  .refine((data) => data.newPass === data.confirmNewPass, {
    message: "Passwords do not match",
    path: ["confirmNewPass"],
  })
  .refine((data) => data.oldPass !== data.newPass, {
    message: "New password must be different from old password",
    path: ["newPass"],
  });

export const loginZodSchemaValidation = z.object({
  password: passwordField("Password"),
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid Email",
    })
    .min(5, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Email must be ${issue.minimum} characters long!`;
        }
      },
    })
    .max(100, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return `Email cannot exceed ${issue.minimum} characters!`;
        }
      },
    }),
});

export const UpdateUserZodSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid Name",
    })
    .min(2, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Name must be ${issue.minimum} characters long!`;
        }
      },
    })
    .max(50, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return `Name cannot exceed ${issue.minimum} characters!`;
        }
      },
    })
    .optional(),

  phone: z
    .string({
      error: () => {
        return "Invalid Phone";
      },
    })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error: () => {
        return "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX";
      },
    })
    .optional(),

  avatar: z
    .url({
      error: () => {
        return "Invalid url!";
      },
    })
    .optional(),

  role: z.string().optional(),

  address: z
    .string({
      error: () => {
        return "Invalid address!";
      },
    })
    .max(500, { message: "Address cannot exceed 500 characters." })
    .optional(),
});
