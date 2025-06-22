import React, { useState } from 'react';
import styles from './styles.module.css';
import {AddressRequest} from "../../../../models/request/AddressRequest";

interface CustomerFormProps {
  customerInfo: AddressRequest;
  onCustomerInfoChange: (info: AddressRequest) => void;
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
            name="receiver"
            value={customerInfo.receiver}
            onChange={handleInputChange}
            className={styles.formInput}
            required
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
          <label className={styles.formLabel}>
            <span>Số điện thoại</span>
            <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            name="numberPhone"
            value={customerInfo.numberPhone}
            onChange={handleInputChange}
            className={styles.formInput}
            required
          />
        </div>
      </form>
    </section>
  );
};

export default CustomerForm;
