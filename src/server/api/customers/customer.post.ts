import ApiService from "../ApiService";

export const initPasswordReset = async (username: string): Promise<{ code: number, message: string }> => {
    const data = await ApiService.post(`/api/customer/initPasswordReset/${username}`, {}, {}, false);
    return data; // Trả về dữ liệu với kiểu { code, message }
};


export const resetPassword = async (
    username: string,
    resetCode: string,
    newPassword: string
): Promise<{code: number, message: string}> => {
    const params = new URLSearchParams({
        resetCode,
        newPassword
    });

    return ApiService.post(`/api/customer/resetPassword/${username}?${params.toString()}`, {}, {}, false);
};















