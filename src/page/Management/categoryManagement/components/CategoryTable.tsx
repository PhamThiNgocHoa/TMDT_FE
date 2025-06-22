import React from 'react';
import { CategoryResponseDTO } from '../../../../models/response/CategoryResponseDTO';
import { ProductResponse } from '../../../../models/response/ProductResponse';

interface CategoryTableProps {
    categories: CategoryResponseDTO[];
    products: ProductResponse[];
    onEditCategory: (categoryId: number) => void;
    onDeleteCategory: (categoryId: number) => void;
    isDeleting?: number | null;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    categories,
    products,
    onEditCategory,
    onDeleteCategory,
    isDeleting
}) => {
    const tableStyles = {
        wrapper: {
            width: '100%',
            overflowX: 'auto' as const,
            borderRadius: '6px',
            background: 'white',
            border: '1px solid #ddd'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse' as const,
            fontFamily: 'Inter, sans-serif'
        },
        th: {
            background: '#f8f9fa',
            color: '#333',
            fontWeight: '600',
            fontSize: '14px',
            padding: '12px 16px',
            textAlign: 'left' as const,
            borderBottom: '1px solid #ddd'
        },
        td: {
            padding: '12px 16px',
            fontSize: '14px',
            color: '#333',
            verticalAlign: 'middle' as const,
            borderBottom: '1px solid #eee'
        },
        tr: {
            transition: 'background-color 0.2s ease'
        },
        trHover: {
            background: '#f8f9fa'
        },
        idBadge: {
            background: '#007bff',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'inline-block',
            minWidth: '30px',
            textAlign: 'center' as const
        },
        categoryName: {
            fontWeight: '600',
            color: '#333',
            fontSize: '14px'
        },
        categoryDescription: {
            color: '#666',
            fontSize: '12px',
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' as const
        },
        statusBadge: {
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase' as const
        },
        activeStatus: {
            background: '#d4edda',
            color: '#155724'
        },
        inactiveStatus: {
            background: '#f8d7da',
            color: '#721c24'
        },
        productsCount: {
            background: '#f8f9fa',
            color: '#666',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            display: 'inline-block'
        },
        actionButtons: {
            display: 'flex',
            gap: '8px',
            justifyContent: 'center'
        },
        actionButton: {
            width: '32px',
            height: '32px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
        },
        editButton: {
            background: '#28a745',
            color: 'white'
        },
        deleteButton: {
            background: '#dc3545',
            color: 'white'
        },
        disabledButton: {
            opacity: '0.6',
            cursor: 'not-allowed'
        },
        spinner: {
            width: '16px',
            height: '16px',
            border: '2px solid transparent',
            borderTop: '2px solid currentColor',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        emptyContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            textAlign: 'center' as const
        },
        emptyIcon: {
            fontSize: '64px',
            marginBottom: '16px',
            opacity: '0.5'
        },
        emptyTitle: {
            color: '#333',
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 8px 0'
        },
        emptyText: {
            color: '#666',
            fontSize: '14px',
            margin: '0'
        }
    };

    if (categories.length === 0) {
        return (
            <div style={tableStyles.emptyContainer}>
                <div style={tableStyles.emptyIcon}>📂</div>
                <h3 style={tableStyles.emptyTitle}>Không tìm thấy danh mục nào</h3>
                <p style={tableStyles.emptyText}>Thử thay đổi từ khóa tìm kiếm hoặc thêm danh mục mới</p>
            </div>
        );
    }

    return (
        <div style={tableStyles.wrapper}>
            <table style={tableStyles.table}>
                <thead>
                    <tr>
                        <th style={{...tableStyles.th, width: '80px'}}>ID</th>
                        <th style={{...tableStyles.th, minWidth: '200px'}}>Tên danh mục</th>
                        {/*<th style={{...tableStyles.th, width: '120px'}}>Trạng thái</th>*/}
                        <th style={{...tableStyles.th, width: '120px'}}>Số sản phẩm</th>
                        <th style={{...tableStyles.th, width: '120px', textAlign: 'center'}}>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id} style={tableStyles.tr}>
                            <td style={{...tableStyles.td, textAlign: 'center'}}>
                                <span style={tableStyles.idBadge}>#{category.id}</span>
                            </td>
                            <td style={tableStyles.td}>
                                <div>
                                    <div style={tableStyles.categoryName}>{category.name}</div>
                                    {category.description && (
                                        <div style={tableStyles.categoryDescription}>
                                            {category.description}
                                        </div>
                                    )}
                                </div>
                            </td>
                            {/*<td style={{...tableStyles.td, textAlign: 'center'}}>*/}
                            {/*    <span style={{*/}
                            {/*        ...tableStyles.statusBadge,*/}
                            {/*        ...(category.active ? tableStyles.activeStatus : tableStyles.inactiveStatus)*/}
                            {/*    }}>*/}
                            {/*        {category.active ? 'Kích hoạt' : 'Không kích hoạt'}*/}
                            {/*    </span>*/}
                            {/*</td>*/}
                            <td style={{...tableStyles.td, textAlign: 'center'}}>
                                <span style={tableStyles.productsCount}>
                                    {products.filter(p => p.categoryId === category.id).length} sản phẩm
                                </span>
                            </td>
                            <td style={{...tableStyles.td, textAlign: 'center'}}>
                                <div style={tableStyles.actionButtons}>
                                    <button 
                                        style={{
                                            ...tableStyles.actionButton,
                                            ...tableStyles.editButton,
                                            ...(isDeleting === category.id ? tableStyles.disabledButton : {})
                                        }}
                                        onClick={() => onEditCategory(category.id)}
                                        title="Sửa danh mục"
                                        disabled={isDeleting === category.id}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                    <button 
                                        style={{
                                            ...tableStyles.actionButton,
                                            ...tableStyles.deleteButton,
                                            ...(isDeleting === category.id ? tableStyles.disabledButton : {})
                                        }}
                                        onClick={() => onDeleteCategory(category.id)}
                                        title="Xóa danh mục"
                                        disabled={isDeleting === category.id}
                                    >
                                        {isDeleting === category.id ? (
                                            <div style={tableStyles.spinner}></div>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3,6 5,6 21,6"/>
                                                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                                                <line x1="10" y1="11" x2="10" y2="17"/>
                                                <line x1="14" y1="11" x2="14" y2="17"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    tr:hover {
                        background-color: #f8f9fa !important;
                    }
                `}
            </style>
        </div>
    );
};

export default CategoryTable; 