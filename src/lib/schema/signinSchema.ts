"use client";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default signinSchema;
