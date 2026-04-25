import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function BlogGridServer() {
  // Fetch posts
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return <p>Failed to load blog posts.</p>;
  }

  if (!posts || posts.length === 0) {
    return <h3>No blog posts available.</h3>;
  }

  return (
    <div className="blog-grid-two mt-50 lg-mt-30 mb-120 lg-mb-60">
      <div className="container">
        <div className="row gx-xxl-5">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 mb-60">
              <article className="blog-meta-two style-two">
                <figure
                  className="post-img position-relative d-flex align-items-end m0"
                  style={{
                    backgroundImage: `url(${post.img_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "260px",
                    borderRadius: "18px"
                  }}
                >
                  <div className="date">{post.date}</div>
                </figure>

                <div className="post-data">
                  <h4 className="blog-title mb-15">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>

                  <div className="tag mb-15">{post.post_info}</div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="read-more-btn tran3s d-flex align-items-center"
                  >
                    Read More <i className="bi bi-arrow-up-right ms-2"></i>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
