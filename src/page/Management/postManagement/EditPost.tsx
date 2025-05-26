import React, { useState, useEffect } from 'react';
import styles from './EditPost.module.css'; // Use EditPost styles
import { useParams, useNavigate } from 'react-router-dom';
import {AdminSidebar} from "./AdminSidebar";
import {Header} from "./components/Header"; // Import hooks for routing

// Assuming a function to fetch fake post data by ID
// In a real app, this would be an API call
const fetchFakePostById = (id: number) => {
    console.log(`Fetching fake post with ID: ${id}`);
     // This is placeholder fake data. Replace with actual data fetching.
    // Simulate finding/not finding a post
    if (id && id !== null) { // Simple check for fake data
        return {
            id: id,
            title: `Tiêu đề bài viết Fake ${id}`,
            content: `Nội dung fake cho bài viết ID ${id}. Đây là nơi bạn sẽ chỉnh sửa.`,
            status: 'Published', // Example status
            metaDescription: `Mô tả meta fake cho bài viết ${id}.`,
            thumbnail: null, // Placeholder for thumbnail
            publishDate: '2023-10-27', // Example date
            author: 'Tác giả Fake',
            tags: ['fake-tag-1', 'fake-tag-2', `id-${id}`],
            createdAt: new Date().toISOString(), // Added createdAt for consistency
        };
    } else {
        return null; // Simulate post not found
    }
};

export function EditPost() {
    const { postId } = useParams<{ postId: string }>(); // Get post ID from URL params    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('Draft');
    const [metaDescription, setMetaDescription] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [publishDate, setPublishDate] = useState<string>('');
    const [author, setAuthor] = useState('Admin');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('Current postId in useEffect:', postId); // Added log
        if (postId) {
            setLoading(true);
            setError(null); // Clear previous errors
            // Simulate fetching data
            const postData = fetchFakePostById(Number(postId));
            if (postData) {
                setTitle(postData.title);
                setContent(postData.content);
                setStatus(postData.status);
                setMetaDescription(postData.metaDescription);
                // setThumbnail(postData.thumbnail); // Handle thumbnail loading if needed
                setPublishDate(postData.publishDate);
                setAuthor(postData.author);
                setTags(postData.tags);
             } else {
                setError('Không tìm thấy bài viết với ID này.'); // More specific error
             }
             setLoading(false);
        } else {
             // Handle case where postId is not provided in URL
             console.log('postId is missing in URL.'); // Added log
             setError('Không có ID bài viết được cung cấp trong đường dẫn.'); // Error for missing ID
             setLoading(false); // Ensure loading is false
        }
    }, [postId]); // Dependency array includes postId

    const handleSaveChanges = () => {
        console.log('Saving changes...', { postId, title, content, status, metaDescription, thumbnail, publishDate, author, tags });
        // Add save changes logic here (e.g., API call PUT/PATCH)
        if (!title || !content) {
            alert('Tiêu đề và nội dung không được để trống!');
            return;
        }
        alert('Cập nhật bài viết thành công!');
        // In a real app, you might navigate back to the list after a successful save:
        // navigate('/postManagement');
    };
    const navigate = useNavigate(); // Define navigate at the top level

    const handleCancel = () => {
        console.log('Cancelling...');
        navigate('/postManagement'); // Navigate back to list
    };

     const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnail(event.target.files[0]);
            alert(`Đã chọn file: ${event.target.files[0].name}`);
        }
    };

    const handleTagInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
            event.preventDefault();
        }
    };

     const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    if (loading) {
        return (
             <div className={styles.loading}>
                 <div className={styles.loadingSpinner}></div> {/* Assuming you have a loading spinner style in CSS */}
                 Đang tải dữ liệu...
             </div>
        );
    }

    if (error) {
        return <div className={styles.error}>{error}</div>; // Basic error state
    }

    return (
        <div className={styles.editPostContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
            <div className={styles.editPostHeader}>
                <h2>Chỉnh sửa bài viết</h2> {/* Changed title */}
                <div className={styles.headerActions}>
                    <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy bỏ</button>
                    <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleSaveChanges}>Cập nhật</button> {/* Changed button text */}
                </div>
            </div>
            <div className={styles.editPostContent}>
                {/* Left Column */}
                <AdminSidebar />

                <div className={styles.mainContent}>
                    <div className={styles.formGroup}>
                        <label htmlFor="postTitle" className={styles.label}>Tiêu đề bài viết</label>
                        <input
                            type="text"
                            id="postTitle"
                            className={styles.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Nhập tiêu đề bài viết..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="postContent" className={styles.label}>Nội dung</label>
                         {/* Placeholder for Rich Text Editor */}
                        <textarea
                            id="postContent"
                            className={`${styles.input} ${styles.textarea}`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Nhập nội dung bài viết..."
                            rows={20}
                        ></textarea>
                         {/* Note: Replace with a rich text editor library later */}
                    </div>

                </div>

                {/* Right Column (Sidebar) */}
                <div className={styles.sidebar}>
                    <div className={styles.sidebarSection}>
                         <label className={styles.label}>Trạng thái</label>
                        <select
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Draft">Nháp</option>
                            <option value="Pending">Đang chờ duyệt</option>
                            <option value="Published">Đã đăng</option>
                            <option value="Edited">Hiệu chỉnh</option>
                        </select>
                    </div>

                    <div className={styles.sidebarSection}>
                         <label htmlFor="metaDescription" className={styles.label}>Mô tả Meta</label>
                        <textarea
                            id="metaDescription"
                            className={`${styles.input} ${styles.textarea}`}
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            placeholder="Nhập mô tả ngắn cho bài viết..."
                            rows={3}
                        ></textarea>
                    </div>

                    <div className={styles.sidebarSection}>
                        <label className={styles.label}>Tải lên hình ảnh</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                             className={styles.fileInput}
                        />
                         {thumbnail && <p className={styles.fileName}>{thumbnail.name}</p>}
                    </div>

                    <div className={styles.sidebarSection}>
                         <label htmlFor="publishDate" className={styles.label}>Ngày đăng</label>
                        <input
                            type="date"
                            id="publishDate"
                            className={styles.input}
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                        />
                    </div>

                     <div className={styles.sidebarSection}>
                         <label htmlFor="author" className={styles.label}>Tác giả</label>
                        <input
                            type="text"
                            id="author"
                            className={styles.input}
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Nhập tên tác giả..."
                        />
                    </div>

                    <div className={styles.sidebarSection}>
                        <label htmlFor="tags" className={styles.label}>Tags</label>
                        <div className={styles.tagsInputContainer}>
                             <input
                                type="text"
                                id="tags"
                                className={styles.input}
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyPress={handleTagInputKeyPress}
                                placeholder="Nhập tags và nhấn Enter..."
                            />
                             <div className={styles.tagsList}>
                                {tags.map((tag, index) => (
                                    <span key={index} className={styles.tagItem}>
                                        {tag}
                                         <button type="button" className={styles.removeTagButton} onClick={() => handleRemoveTag(index)}>
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                     {/* Add more advanced options sections here if needed */}
                </div>
            </div>
        </div>
            </div>
    );
} 