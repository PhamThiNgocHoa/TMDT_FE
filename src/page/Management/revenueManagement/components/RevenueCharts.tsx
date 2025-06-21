import React, { useState, useEffect } from 'react';
import styles from '../RevenusManagement.module.css';
import { 
    getRevenueByMonth, 
    getRevenueByMonthYear, 
    getRevenueByYear, 
    getRevenueByDate,
    RevenueData 
} from '../services/revenueService';

interface ChartData {
    labels: string[];
    data: number[];
}

const RevenueCharts: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedChart, setSelectedChart] = useState<'month' | 'monthYear' | 'year' | 'date'>('month');
    const [chartData, setChartData] = useState<ChartData>({ labels: [], data: [] });
    const [usingMockData, setUsingMockData] = useState(false);
    
    // State cho filter
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    // Hàm lấy dữ liệu cho biểu đồ theo tháng
    const fetchMonthlyData = async () => {
        try {
            setLoading(true);
            setError(null);
            setUsingMockData(false);
            const response = await getRevenueByMonth();
            
            // Kiểm tra và xử lý dữ liệu trả về
            let data = response;
            if (response && response.data) {
                data = response.data;
            }
            
            // Kiểm tra xem data có phải là array không
            if (!Array.isArray(data)) {
                console.warn('API trả về không phải array:', data);
                setChartData({ labels: [], data: [] });
                setError('Dữ liệu không đúng định dạng');
                return;
            }
            
            const chartData: ChartData = {
                labels: data.map((item: RevenueData) => item.date || ''),
                data: data.map((item: RevenueData) => item.amount || 0)
            };
            setChartData(chartData);
        } catch (err) {
            setError('Không thể tải dữ liệu doanh thu theo tháng');
            console.error('Error fetching monthly data:', err);
            setChartData({ labels: [], data: [] });
            setUsingMockData(true);
        } finally {
            setLoading(false);
        }
    };

    // Hàm lấy dữ liệu cho biểu đồ theo tháng và năm
    const fetchMonthYearData = async () => {
        try {
            setLoading(true);
            setError(null);
            setUsingMockData(false);
            const response = await getRevenueByMonthYear(selectedMonth, selectedYear);
            
            // Kiểm tra và xử lý dữ liệu trả về
            let data = response;
            if (response && response.data) {
                data = response.data;
            }
            
            // Kiểm tra xem data có phải là array không
            if (!Array.isArray(data)) {
                console.warn('API trả về không phải array:', data);
                setChartData({ labels: [], data: [] });
                setError('Dữ liệu không đúng định dạng');
                return;
            }
            
            const chartData: ChartData = {
                labels: data.map((item: RevenueData) => item.date || ''),
                data: data.map((item: RevenueData) => item.amount || 0)
            };
            setChartData(chartData);
        } catch (err) {
            setError('Không thể tải dữ liệu doanh thu theo tháng/năm');
            console.error('Error fetching month/year data:', err);
            setChartData({ labels: [], data: [] });
            setUsingMockData(true);
        } finally {
            setLoading(false);
        }
    };

    // Hàm lấy dữ liệu cho biểu đồ theo năm
    const fetchYearlyData = async () => {
        try {
            setLoading(true);
            setError(null);
            setUsingMockData(false);
            const response = await getRevenueByYear(selectedYear);
            
            // Kiểm tra và xử lý dữ liệu trả về
            let data = response;
            if (response && response.data) {
                data = response.data;
            }
            
            // Kiểm tra xem data có phải là array không
            if (!Array.isArray(data)) {
                console.warn('API trả về không phải array:', data);
                setChartData({ labels: [], data: [] });
                setError('Dữ liệu không đúng định dạng');
                return;
            }
            
            const chartData: ChartData = {
                labels: data.map((item: RevenueData) => item.month?.toString() || ''),
                data: data.map((item: RevenueData) => item.amount || 0)
            };
            setChartData(chartData);
        } catch (err) {
            setError('Không thể tải dữ liệu doanh thu theo năm');
            console.error('Error fetching yearly data:', err);
            setChartData({ labels: [], data: [] });
            setUsingMockData(true);
        } finally {
            setLoading(false);
        }
    };

    // Hàm lấy dữ liệu cho biểu đồ theo ngày
    const fetchDailyData = async () => {
        try {
            setLoading(true);
            setError(null);
            setUsingMockData(false);
            const response = await getRevenueByDate(selectedDate);
            
            // Kiểm tra và xử lý dữ liệu trả về
            let data = response;
            if (response && response.data) {
                data = response.data;
            }
            
            // Xử lý cả trường hợp single object và array
            let amount = 0;
            if (typeof data === 'object' && data !== null) {
                if (Array.isArray(data)) {
                    amount = data[0]?.amount || 0;
                } else {
                    amount = data.amount || 0;
                }
            }
            
            const chartData: ChartData = {
                labels: [selectedDate],
                data: [amount]
            };
            setChartData(chartData);
        } catch (err) {
            setError('Không thể tải dữ liệu doanh thu theo ngày');
            console.error('Error fetching daily data:', err);
            setChartData({ labels: [], data: [] });
            setUsingMockData(true);
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý thay đổi loại biểu đồ
    const handleChartChange = (chartType: 'month' | 'monthYear' | 'year' | 'date') => {
        setSelectedChart(chartType);
        setError(null);
    };

    // Load dữ liệu khi component mount hoặc khi thay đổi chart type
    useEffect(() => {
        switch (selectedChart) {
            case 'month':
                fetchMonthlyData();
                break;
            case 'monthYear':
                fetchMonthYearData();
                break;
            case 'year':
                fetchYearlyData();
                break;
            case 'date':
                fetchDailyData();
                break;
        }
    }, [selectedChart, selectedMonth, selectedYear, selectedDate]);

    // Hàm render biểu đồ đơn giản (placeholder)
    const renderSimpleChart = () => {
        if (chartData.labels.length === 0) {
            return <div className={styles.noData}>Không có dữ liệu</div>;
        }

        const maxValue = Math.max(...chartData.data);
        const minHeight = 20;

        return (
            <div className={styles.simpleChart}>
                {chartData.labels.map((label, index) => {
                    const value = chartData.data[index];
                    const height = maxValue > 0 ? (value / maxValue) * 200 + minHeight : minHeight;
                    
                    return (
                        <div key={index} className={styles.chartBar}>
                            <div 
                                className={styles.bar} 
                                style={{ height: `${height}px` }}
                                title={`${label}: ${value.toLocaleString()} ₫`}
                            />
                            <span className={styles.barLabel}>{label}</span>
                            <span className={styles.barValue}>{value.toLocaleString()} ₫</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles.chartSection}>
            <div className={styles.chartHeader}>
                <h2>Biểu đồ doanh thu</h2>
                <div className={styles.chartControls}>
                    <button 
                        className={`${styles.chartTab} ${selectedChart === 'month' ? styles.active : ''}`}
                        onClick={() => handleChartChange('month')}
                    >
                        Tháng hiện tại
                    </button>
                    <button 
                        className={`${styles.chartTab} ${selectedChart === 'monthYear' ? styles.active : ''}`}
                        onClick={() => handleChartChange('monthYear')}
                    >
                        Theo tháng/năm
                    </button>
                    <button 
                        className={`${styles.chartTab} ${selectedChart === 'year' ? styles.active : ''}`}
                        onClick={() => handleChartChange('year')}
                    >
                        Theo năm
                    </button>
                    <button 
                        className={`${styles.chartTab} ${selectedChart === 'date' ? styles.active : ''}`}
                        onClick={() => handleChartChange('date')}
                    >
                        Theo ngày
                    </button>
                </div>
            </div>

            {/* Filter controls */}
            {selectedChart === 'monthYear' && (
                <div className={styles.chartFilters}>
                    <select 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className={styles.filterSelect}
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>
                                Tháng {month}
                            </option>
                        ))}
                    </select>
                    <select 
                        value={selectedYear} 
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className={styles.filterSelect}
                    >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                            <option key={year} value={year}>
                                Năm {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedChart === 'year' && (
                <div className={styles.chartFilters}>
                    <select 
                        value={selectedYear} 
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className={styles.filterSelect}
                    >
                        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                            <option key={year} value={year}>
                                Năm {year}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedChart === 'date' && (
                <div className={styles.chartFilters}>
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className={styles.filterSelect}
                    />
                </div>
            )}

            {/* Chart content */}
            <div className={styles.chartContent}>
                {loading && <div className={styles.loading}>Đang tải dữ liệu...</div>}
                {error && <div className={styles.error}>{error}</div>}
                {usingMockData && (
                    <div className={styles.mockDataNotice}>
                        <i className="fas fa-info-circle"></i>
                        <span>Đang sử dụng dữ liệu mẫu (API chưa sẵn sàng)</span>
                    </div>
                )}
                {!loading && !error && renderSimpleChart()}
            </div>
        </div>
    );
};

export default RevenueCharts; 