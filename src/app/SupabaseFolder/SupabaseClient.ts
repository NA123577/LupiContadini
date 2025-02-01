import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gpyefoupzaqujruestct.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdweWVmb3VwemFxdWpydWVzdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0Mzc0MjAsImV4cCI6MjA1NDAxMzQyMH0.fU80oxOarv7oXViJJVwLzdxz7LVyyj6LyGWf89oh70c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;