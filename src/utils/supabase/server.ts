import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/database.types";

// Returns a Supabase client for server components
export const createClient = () => {
  return createServerComponentClient<Database>({ cookies });
};
