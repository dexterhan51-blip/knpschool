import BlogHeader from "@/components/layout/BlogHeader";
import Footer from "@/components/layout/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeader />
      <div className="min-h-screen bg-warm-gray-50 pt-16 text-navy">
        {children}
      </div>
      <Footer />
    </>
  );
}
