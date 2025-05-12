import React, { useState } from 'react';
import { CustomerInfo } from '../../types';
import styles from './styles.module.css';

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  onCustomerInfoChange: (info: CustomerInfo) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customerInfo, onCustomerInfoChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    onCustomerInfoChange({
      ...customerInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <section className={styles.customerFormSection}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Chi tiết thanh toán</h2>
      </header>
      
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <span>Họ & Tên</span>
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={customerInfo.fullName}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tên công ty</label>
          <input
            type="text"
            name="companyName"
            value={customerInfo.companyName}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <span>Địa chỉ</span>
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Căn hộ, tầng, v.v. (tùy chọn)</label>
          <input
            type="text"
            name="apartment"
            value={customerInfo.apartment}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <span>Tỉnh/Thành Phố</span>
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={customerInfo.city}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <span>Số điện thoại</span>
            <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <span>Email</span>
            <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
        </div>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="saveInfo"
            name="saveInfo"
            checked={customerInfo.saveInfo}
            onChange={handleInputChange}
            className={styles.checkbox}
          />
          <label htmlFor="saveInfo" className={styles.checkboxLabel}>
            Lưu thông tin này để thanh toán nhanh hơn vào lần sau
          </label>
        </div>
      </form>
    </section>
  );
};

export default CustomerForm;
