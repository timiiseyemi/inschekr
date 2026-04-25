// FORCE SERVER MODE
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Image from "next/image";
import Link from "next/link";

// Supabase removed — fallback: try local API endpoint (/api/posts) or return empty list.
export default async function BlogGridArea() {
  console.warn('Supabase removed: BlogGridArea using local fallback for posts.');

  let posts: any[] = [];
  try {
    const res = await fetch('/api/posts', { cache: 'no-store' });
    if (res.ok) posts = await res.json();
  } catch (e) {
    // no-op; posts stays empty
  }

  if (!posts || posts.length === 0) {
    return <h3>No blog posts available.</h3>;
  }

  return (
    <div className="blog-grid-two mt-50 lg-mt-30 mb-120 lg-mb-60">
      <div className="container">
        <div className="row gx-xxl-5">
          {posts.map((post: any) => (
            <div key={post.id} className="col-md-6 mb-60">
              <article className="blog-meta-two style-two">

                <figure
                  className="post-img"
                  style={{
                    backgroundImage: `url(${post.img_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "260px",
                    borderRadius: "18px",
                  }}
                >
                  <div className="date">{post.date}</div>
                </figure>

                <div className="post-data">
                  <div className="tag mb-15">{post.post_info}</div>

                  <h4 className="blog-title mb-15">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h4>

                  <Link href={`/blog/${post.slug}`} className="read-more-btn tran3s d-flex align-items-center">
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
