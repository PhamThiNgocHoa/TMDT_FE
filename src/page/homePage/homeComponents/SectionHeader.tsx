import React from 'react';
import '../../../assets/css/homeStyles/sectionHeader.css';

interface SectionHeaderProps {
    label: string;
    title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title }) => {
    return (
        <div className="section-header">
            <div className="section-label">
                <div className="label-indicator"></div>
                <span className="label-text">{label}</span>
            </div>
            <h2 className="section-title">{title}</h2>
        </div>
    );
};

export default SectionHeader;
