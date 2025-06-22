
import React, { useState } from 'react';
import styles from './AddPost.module.css';
import { AdminSidebar } from '../AdminSidebar';
import { Header } from './components/Header'; // Import Header

export function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('Draft');
    const [metaDescription, setMetaDescription] = useState('');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [publishDate, setPublishDate] = useState<string>('');
    const [author, setAuthor] = useState('Admin');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    const handleSaveDraft = () => {
        console.log('Saving draft...', { title, content, status, metaDescription, thumbnail, publishDate, author, tags });
        alert('Lưu nháp thành công!');
    };

    const handlePublish = () => {
        if (!title || !content) {
            alert('Tiêu đề và nội dung không được để trống!');
            return;
        }
        console.log('Publishing...', { title, content, status, metaDescription, thumbnail, publishDate, author, tags });
        alert('Đăng bài thành công!');
    };

    const handleCancel = () => {
        console.log('Cancelling...');
        alert('Hủy bỏ!');
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

    return (
        <div className={styles.addPostContainer}>
            <AdminSidebar />
            <div className={styles.body}>
            <Header />
            <div className={styles.addPostHeader}>
                <h2>Thêm Bài Viết Mới</h2>
                <div className={styles.headerActions}>
                    <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy bỏ</button>
                    <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleSaveDraft}>Lưu nháp</button>
                    <button className={`${styles.button} ${styles.primaryButton}`} onClick={handlePublish}>Đăng bài</button>
                </div>
            </div>
            <div className={styles.addPostContent}>
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
                        <textarea
                            id="postContent"
                            className={`${styles.input} ${styles.textarea}`}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Nhập nội dung bài viết..."
                            rows={20}
                        ></textarea>
                    </div>
                </div>
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
                </div>
            </div>
        </div>
        </div>
    );
}
