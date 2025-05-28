import React, { useState } from 'react';
import styles from './ProductReviewsSection.module.css';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

// Define interfaces for review data (can be expanded later)
interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

// Mock data for product reviews
const mockReviews: Review[] = [
    {
        id: 'rev1',
        user: 'Minh Châu',
        rating: 5,
        comment: 'SẢn phẨm ĐÚng mÔ tẢ',
        date: '2023-10-26',
    },
     {
        id: 'rev2',
        user: 'John Doe',
        rating: 4,
        comment: 'Good product, but shipping was slow.',
        date: '2023-10-25',
    },
     {
        id: 'rev3',
        user: 'Jane Smith',
        rating: 5,
        comment: 'Exactly what I needed!',
        date: '2023-10-24',
    },
    // Add more mock reviews as needed
];

// Mock data for rating breakdown
interface RatingBreakdown {
    [key: number]: number; // Add index signature to allow number indexing
}

const mockRatingBreakdown: RatingBreakdown = {
    5: 2, // 2 five-star reviews
    4: 1,
    3: 0,
    2: 0,
    1: 0,
};

// Calculate overall average rating and total reviews
const calculateOverallRating = (reviews: Review[]) => {
    if (reviews.length === 0) return { average: 0, count: 0 };
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return { average: totalRating / reviews.length, count: reviews.length };
};

const ProductReviewsSection: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [ratingBreakdown, setRatingBreakdown] = useState<RatingBreakdown>(mockRatingBreakdown);
    const overallRating = calculateOverallRating(reviews);

    // State for the new review form
    const [newReviewRating, setNewReviewRating] = useState<number>(0);
    const [newReviewComment, setNewReviewComment] = useState<string>('');
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Function to render stars dynamically
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= rating ? styles.filledStar : styles.emptyStar}
                >
                    ★
                </span>
            );
        }
        return <div className={styles.stars}>{stars}</div>;
    };

    // Function to handle rating selection (e.g., clicking on stars)
    const handleRatingSelect = (rating: number) => {
        setNewReviewRating(rating);
    };

    // Function to handle comment input change
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewReviewComment(event.target.value);
    };

    // Function to handle review submission
    const handleSubmitReview = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation
        if (newReviewRating === 0) {
            setSubmitError('Vui lòng chọn số sao đánh giá.');
            return;
        }
        if (!newReviewComment.trim()) {
             setSubmitError('Vui lòng nhập nội dung bình luận.');
             return;
        }

        setSubmitError(null); // Clear previous errors

        // Create a new review object (using mock user and date for now)
        const newReview: Review = {
            id: uuidv4(), // Generate a unique ID
            user: 'Current User', // Replace with actual user data
            rating: newReviewRating,
            comment: newReviewComment.trim(),
            date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        };

        // Simulate sending the review to a backend (replace with actual API call)
        console.log('Submitting new review:', newReview);

        // Update state with the new review and recalculated ratings
        setReviews(prevReviews => [...prevReviews, newReview]);

        // Update rating breakdown (simple increment for the submitted rating)
        setRatingBreakdown(prevBreakdown => ({
            ...prevBreakdown,
            [newReview.rating]: (prevBreakdown[newReview.rating] || 0) + 1,
        }));

        // Clear the form
        setNewReviewRating(0);
        setNewReviewComment('');

        // In a real app, you would likely refetch reviews or handle the API response
    };

    return (
        <div className={styles.reviewsSection}>
            {/* Section Title */}
            <h3>Đánh giá & Nhận Xét Havic HV G-92 Gamepad {/* Replace with actual product name */}
            </h3>

            <div className={styles.reviewsContent}>
                {/* Overall Rating Summary */}
                <div className={styles.overallRatingSummary}>
                    <div className={styles.averageRating}>{overallRating.average.toFixed(1)}/5</div>
                    {renderStars(overallRating.average)} {/* Render dynamic stars */}
                    <div className={styles.reviewCount}>({overallRating.count}) ĐÁNH GIÁ & NHẬN XÉT</div>
                </div>

                {/* Rating Breakdown */}
                <div className={styles.ratingBreakdown}>
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className={styles.starRatingRow}>
                            <span className={styles.starLabel}>{star}★</span>
                            <div className={styles.progressBarContainer}>
                                {/* Progress bar - calculate width based on count and total reviews */}
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${(ratingBreakdown[star] / overallRating.count) * 100 || 0}%` }}
                                ></div>
                            </div>
                            <span className={styles.ratingCount}>{ratingBreakdown[star]} đánh giá</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review List */}
            <div className={styles.reviewList}>
                <h4>Bình luận ({reviews.length})</h4>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className={styles.reviewItem}>
                            <p><strong>{review.user}</strong> ({review.rating}★): {review.comment}</p>
                            <span className={styles.reviewDate}>{review.date}</span>
                        </div>
                    ))
                ) : (
                    <p>Chưa có bình luận nào.</p>
                )}
            </div>

            {/* Review Submission Area */}
            <div className={styles.submitReviewArea}>
                <h4>Gửi đánh giá của bạn</h4>
                 {submitError && <div className={styles.submitError}>{submitError}</div>}
                <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
                    {/* Rating Input */}
                    <div className={styles.ratingInput}>
                         {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                className={`${styles.starOption} ${star <= newReviewRating ? styles.selectedStar : ''}`}
                                onClick={() => handleRatingSelect(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* Comment Textarea */}
                    <div className={styles.commentInput}>
                        <label htmlFor="reviewComment" className="visually-hidden">Bình luận của bạn:</label>
                        <textarea
                            id="reviewComment"
                            placeholder="Viết bình luận của bạn vào đây..."
                            value={newReviewComment}
                            onChange={handleCommentChange}
                            className={styles.commentTextarea}
                            rows={4}
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={styles.submitReviewButton}>
                        GỬI ĐÁNH GIÁ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductReviewsSection; 