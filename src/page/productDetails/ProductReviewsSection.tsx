import React, {useEffect, useState} from 'react';
import styles from './ProductReviewsSection.module.css';
import useRating from '../../hooks/useRating';
import {RatingRequestDTO} from '../../models/request/RatingRequestDTO';

interface Props {
    productId: number;
    customerId: number;
    customerName: string;
}

const ProductReviewsSection: React.FC<Props> = ({productId, customerId, customerName}) => {
    const {
        ratings,
        average,
        loading,
        error,
        fetchRatingsByProduct,
        fetchAverageRating,
        fetchCreateRating,
    } = useRating();

    const [comment, setComment] = useState('');
    const [score, setScore] = useState(0);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        fetchRatingsByProduct(productId);
        fetchAverageRating(productId);
    }, [productId]);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (customerId === 0) {
            setSubmitError('Vui lòng đăng nhập để gửi đánh giá.');
            return;
        }

        if (!score || !comment.trim()) {
            setSubmitError('Vui lòng chọn sao và nhập bình luận.');
            return;
        }

        const dto: RatingRequestDTO = {
            productId,
            customerId,
            comment,
            score,
        };

        try {
            await fetchCreateRating(dto);
            await fetchRatingsByProduct(productId);
            await fetchAverageRating(productId);
            setComment('');
            setScore(0);
            setSubmitError(null);
        } catch {
            setSubmitError('Gửi đánh giá thất bại.');
        }
    };

    const handleRatingSelect = (star: number) => setScore(star);
    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);

    // Tính số lượt đánh giá cho từng sao
    const ratingBreakdown = [1, 2, 3, 4, 5].reduce((acc, star) => {
        acc[star] = ratings.filter((r) => r.score === star).length;
        return acc;
    }, {} as Record<number, number>);

    return (
        <div className={styles.reviewsSection}>
            <h3>Đánh giá & Nhận Xét</h3>

            <div className={styles.reviewsContent}>
                {/* Tổng số sao */}
                <div className={styles.overallRatingSummary}>
                    <div className={styles.averageRating}>
                        {average !== null ? average.toFixed(1) : 'Chưa có đánh giá'}/5
                    </div>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={average != null && star <= Math.round(average) ? styles.selectedStar : ''}
                            >
                              ★
                            </span>
                        ))}
                    </div>

                    <div className={styles.reviewCount}>({ratings.length}) ĐÁNH GIÁ & NHẬN XÉT</div>
                </div>

                {/* Biểu đồ */}
                <div className={styles.ratingBreakdown}>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className={styles.starRatingRow}>
                            <span className={styles.starLabel}>{star}★</span>
                            <div className={styles.progressBarContainer}>
                                <div
                                    className={styles.progressBar}
                                    style={{
                                        width: `${
                                            ratings.length ? (ratingBreakdown[star] / ratings.length) * 100 : 0
                                        }%`,
                                    }}
                                ></div>
                            </div>
                            <span className={styles.ratingCount}>{ratingBreakdown[star] || 0} đánh giá</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Danh sách bình luận */}
            <div className={styles.reviewList}>
                <h4>Bình luận ({ratings.length})</h4>
                {ratings.length > 0 ? (
                    ratings.map((review) => (
                        <div key={review.id} className={styles.reviewItem}>
                            <p>
                                <strong>{review.customerName}</strong> ({review.score}★): {review.comment}
                            </p>
                            <span className={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
                        </div>
                    ))
                ) : (
                    <p>Chưa có bình luận nào.</p>
                )}
            </div>

            {/* Gửi đánh giá */}
            <div className={styles.submitReviewArea}>
                <h4>Gửi đánh giá của bạn</h4>
                {submitError && <div className={styles.submitError}>{submitError}</div>}

                <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
                    <div className={styles.ratingInput}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`${styles.starOption} ${star <= score ? styles.selectedStar : ''}`}
                                onClick={() => handleRatingSelect(star)}
                            >
                ★
              </span>
                        ))}
                    </div>

                    <div className={styles.commentInput}>
            <textarea
                placeholder="Viết bình luận của bạn vào đây..."
                value={comment}
                onChange={handleCommentChange}
                className={styles.commentTextarea}
                rows={4}
            ></textarea>
                    </div>

                    <button type="submit" className={styles.submitReviewButton}>
                        GỬI ĐÁNH GIÁ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductReviewsSection;
