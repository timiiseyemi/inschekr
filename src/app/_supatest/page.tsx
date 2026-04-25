import { supabase } from "@/lib/supabaseClient";

export default async function SupaTest() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title")
    .limit(1);

  return (
    <div style={{ padding: 20 }}>
      <h1>Supabase Test</h1>

      {error && (
        <pre style={{ color: "red" }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      {!error && data && (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
