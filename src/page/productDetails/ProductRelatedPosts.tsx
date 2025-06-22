import React, { useEffect, useState } from 'react';
import { api, Post } from '../Management/postManagement/services/api';
import { ProductResponse } from '../../models/response/ProductResponse';

interface ProductRelatedPostsProps {
  productId: number;
  product: ProductResponse;
}

// Hàm tách ảnh đầu tiên từ content (nếu có)
function extractFirstImage(content: string): string | null {
  const match = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
}

const fadeInKeyframes = `@keyframes fadeInPost { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none;} }`;
const zoomImgKeyframes = `@keyframes zoomImg { from { transform: scale(1);} to { transform: scale(1.06);} }`;

const ProductRelatedPosts: React.FC<ProductRelatedPostsProps> = ({ productId, product }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    api.getPostsByProductId(productId)
      .then(setPosts)
      .catch(() => setError('Không thể tải bài viết liên quan.'))
      .finally(() => setLoading(false));
  }, [productId]);

  const filteredPosts = posts.filter(post => post.productId === productId);

  if (loading) return <div style={{marginTop: 32}}>Đang tải bài viết liên quan...</div>;
  if (error) return <div style={{marginTop: 32, color: 'red'}}>{error}</div>;
  if (!filteredPosts.length) return <div style={{marginTop: 32, color: '#888'}}>Chưa có bài viết nào về sản phẩm này.</div>;

  return (
    <section style={{marginTop: 48, marginBottom: 48}}>
      <style>{`
        ${fadeInKeyframes}
        ${zoomImgKeyframes}
        @media (max-width: 900px) {
          .prp-flex { flex-direction: column !important; }
          .prp-spec { position: static !important; max-width: 100% !important; margin-top: 32px !important; }
        }
        .prp-spec tr:hover { background: #e3f2fd33; }
        .prp-img:hover img { animation: zoomImg 0.5s forwards; }
      `}</style>
      <h2 style={{fontSize: 28, fontWeight: 800, marginBottom: 36, color: '#1976d2', letterSpacing: 0.5, textShadow: '0 2px 8px #1976d211'}}>Bài viết về sản phẩm</h2>
      <div className="prp-flex" style={{display: 'flex', alignItems: 'flex-start', gap: 48}}>
        {/* Bài viết bên trái */}
        <div style={{flex: 2, minWidth: 0}}>
          {filteredPosts.map((post, idx) => {
            const firstImg = post.thumbnail || extractFirstImage(post.content);
            return (
              <div key={post.id} style={{marginBottom: idx !== filteredPosts.length - 1 ? 64 : 0, animation: `fadeInPost 0.7s ${(idx * 0.13 + 0.1).toFixed(2)}s both`}}>
                <h3 style={{fontSize: 26, fontWeight: 800, color: '#222', margin: 0, marginBottom: 12, lineHeight: 1.18, letterSpacing: 0.2}}>{post.title}</h3>
                <div style={{display: 'flex', alignItems: 'center', fontSize: 15, color: '#888', marginBottom: 14, gap: 10, fontStyle: 'italic'}}>
                  <span>🗓 {new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>|</span>
                  <span>✍️ {post.author}</span>
                  <span>|</span>
                  <span>👁 {post.views}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div style={{marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 8}}>
                    {post.tags.map((tag, idx) => (
                      <span key={idx} style={{background: 'linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)', color: '#fff', borderRadius: 4, padding: '3px 12px', fontSize: 14, fontWeight: 600, boxShadow: '0 1px 4px #1976d211'}}>{tag}</span>
                    ))}
                  </div>
                )}
                {firstImg && (
                  <div className="prp-img" style={{width: '100%', maxWidth: 650, height: 270, background: '#f6f6f6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', borderRadius: 14, marginBottom: 22, boxShadow: '0 2px 12px #1976d211', transition: 'box-shadow 0.2s'}}>
                    <img src={firstImg} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14, transition: 'box-shadow 0.2s'}} />
                  </div>
                )}
                <div
                  style={{
                    marginTop: 10,
                    color: '#222',
                    fontSize: 17,
                    lineHeight: 1.8,
                    wordBreak: 'break-word',
                    maxWidth: 900,
                    background: 'none',
                    padding: '0 2px',
                    borderRadius: 0,
                    boxShadow: 'none',
                    overflow: 'visible',
                    textAlign: 'justify',
                  }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                {idx !== filteredPosts.length - 1 && (
                  <hr style={{margin: '48px 0 0 0', border: 0, borderTop: '1.5px solid #e0e0e0'}} />
                )}
              </div>
            );
          })}
        </div>
        {/* Thông số kỹ thuật bên phải */}
        {product.productSpecifications && product.productSpecifications.length > 0 && (
          <aside className="prp-spec" style={{flex: 1, minWidth: 270, maxWidth: 370, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #1976d211', padding: '32px 26px', marginLeft: 0, position: 'sticky', top: 120, border: '1.5px solid #1976d233'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18}}>
              <span style={{fontSize: 22, color: '#1976d2'}}>🔧</span>
              <h4 style={{fontSize: 21, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: 0.2, background: 'linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)', borderRadius: 8, padding: '6px 18px', boxShadow: '0 2px 8px #1976d233'}}>Thông số kỹ thuật</h4>
            </div>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <tbody>
                {product.productSpecifications.map(spec => (
                  <tr key={spec.id} style={{borderBottom: '1px solid #e3eaf1', transition: 'background 0.2s'}}>
                    <td style={{padding: '8px 0', color: '#1976d2', fontWeight: 600, fontSize: 15, width: '48%'}}>{spec.specificationName}</td>
                    <td style={{padding: '8px 0', color: '#333', fontSize: 15}}>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </aside>
        )}
      </div>
    </section>
  );
};

export default ProductRelatedPosts; 