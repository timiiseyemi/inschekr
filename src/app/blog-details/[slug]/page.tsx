import { supabase } from "@/lib/supabaseClient";
import BlogDetailsArea from "@/components/blogs/blog-details/blog-details-area";
import HeaderSeven from "@/layout/header/header-seven";
import FooterThree from "@/layout/footer/footer-three";
import BreadcrumbOne from "@/components/breadcrumb/breadcrumb-one";
import blog_bg from "@/assets/images/media/img_32.jpg";
import shape from "@/assets/images/shape/shape_35.svg";

// Dynamic route
export default async function BlogDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Fetch post by slug
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post || error) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div className="main-page-wrapper">
      <HeaderSeven />

      <BreadcrumbOne
        title="Blog Details"
        subtitle={post.title}
        page="Blog"
        bg_img={blog_bg}
        style_2={true}
        shape={shape}
      />

      <BlogDetailsArea blog={post} />

      <FooterThree style_2={true} />
    </div>
  );
}
