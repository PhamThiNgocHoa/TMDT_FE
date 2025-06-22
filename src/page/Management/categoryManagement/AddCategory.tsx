import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "./context/CategoryContext";
import styles from "./AddCategory.module.css";

// === CONFIG Cloudinary ===
const CLOUD_NAME = "dz5ab5wqy";
const UPLOAD_PRESET = "unsigned_preset";

const AddCategory: React.FC = () => {
    const navigate = useNavigate();
    const { addCategory, loading, error } = useContext(CategoryContext)!;

    // === State danh mục ===
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        active: true,
    });

    // === State file hình ===
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!formData.name.trim()) errors.name = "Tên danh mục không được để trống";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        if (validationErrors[name]) setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const uploadFileToCloudinary = async (file: File): Promise<string> => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);  // preset unsigned
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: data,
        });
        const json = await res.json();
        return json.secure_url as string;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await uploadFileToCloudinary(imageFile);  // Upload trước lấy link
        }

        const categoryPayload = {
            name: formData.name,
            img: imageUrl, // link hình
            active: formData.active,
            description: formData.description,
        };
        try {
            await addCategory(categoryPayload); // Gửi lên API của bạn
            navigate("/management/category");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.addCategoryContainer}>
            <h1>Thêm danh mục</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Tên danh mục */}
                <div className={styles.formGroup}>
                    <label>Tên danh mục <span>*</span></label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={validationErrors.name ? styles.inputError : ""}
                    />
                    {validationErrors.name && <span className={styles.errorText}>{validationErrors.name}</span>}
                </div>

                {/* Mô tả */}
                <div className={styles.formGroup}>
                    <label>Mô tả</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* Ảnh danh mục */}
                <div className={styles.formGroup}>
                    <label>Hình ảnh</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ width: 120, height: "auto" }} />}
                </div>

                {/* Active */}
                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="active"
                            checked={formData.active}
                            onChange={handleInputChange}
                        /> Kích hoạt danh mục
                    </label>
                </div>

                {/* Buttons */}
                <div className={styles.formActions}>
                    <button type="button" onClick={() => navigate("/management/category")} disabled={loading}>Hủy</button>
                    <button type="submit" disabled={loading}>{loading ? "Đang thêm..." : "Thêm danh mục"}</button>
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}
            </form>
        </div>
    );
};

export default AddCategory;
