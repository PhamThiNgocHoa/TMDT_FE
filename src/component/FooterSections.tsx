"use client";
import * as React from "react";
import "../assets/css/footer.css";
export const FooterLogo = () => (
    <section>
        <div>
            <div className="max-w-full w-[90px]">
                <h2 className="pr-0 w-full text-lg font-bold tracking-wider leading-none whitespace-nowrap text-neutral-50">
                    OrangeTech
                </h2>
                <h3 className="mt-4 text-base font-medium leading-snug text-neutral-50">
                    Theo dõi
                </h3>
            </div>
            <p className="mt-4 text-sm text-neutral-50">
                Giảm 10% cho đơn hàng đầu tiên của bạn
            </p>
        </div>
        <div className="flex gap-4 items-center py-2 pl-3 mt-3 max-w-full text-sm rounded border-solid border-[1px] border-[color:var(--Text,#FAFAFA)] w-[200px] footer-email-input">
      <span className="self-stretch my-auto opacity-40 text-neutral-50">
        Nhập email của bạn
      </span>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d76d6d515e109c404e207e8015e4280d6fda4e6?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                alt="Send email"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
            />
        </div>
    </section>
);

export const FooterSupport = () => (
    <section className="text-neutral-50 w-[150px]">
        <h3 className="text-base font-medium leading-snug text-neutral-50">Hỗ trợ</h3>
        <address className="mt-4 max-w-full text-sm w-[150px] not-italic">
            <p className="leading-5 text-neutral-50">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="mt-3 text-neutral-50">exclusive@gmail.com</p>
            <p className="mt-3 text-neutral-50">+88015-88888-9999</p>
        </address>
    </section>
);

export const FooterAccount = () => (
    <nav className="text-neutral-50">
        <h3 className="text-base font-medium leading-snug text-neutral-50">
            Tài khoản
        </h3>
        <ul className="mt-4 text-sm space-y-6 ">
            <li className="text-neutral-50  ">Tài khoản của tôi</li>
            <li className="text-neutral-50 ">Đăng nhập / Đăng ký</li>
            <li className="text-neutral-50 ">Giỏ hàng</li>
            <li className="text-neutral-50 ">Danh sách yêu thích</li>
            <li className="text-neutral-50 ">Cửa hàng</li>
        </ul>
    </nav>
);

export const FooterQuickLinks = () => (
    <nav className="text-neutral-50">
        <h3 className="text-base font-medium leading-snug text-neutral-50">
            Quick Link
        </h3>
        <ul className="mt-4 text-sm">
            <li className="text-neutral-50">Chính sách quyền riêng tư</li>
            <li className="mt-3 text-neutral-50">Điều khoản sử dụng</li>
            <li className="mt-3 text-neutral-50">Câu hỏi thường gặp</li>
            <li className="mt-3 text-neutral-50">Liên hệ</li>
        </ul>
    </nav>
);

export const FooterDownloadApp = () => (
    <section className="flex flex-col">
        <div>
            <h3 className="text-sm font-medium leading-snug text-neutral-50">
                Tải ứng dụng
            </h3>
            <div className="flex flex-col mt-2">
                <p className="text-xs font-medium opacity-70 text-neutral-50">
                    Giảm 3$ cho người mới trên ứng dụng
                </p>
                <div className="flex items-start gap-1 mt-1">
                    {/* QR Code */}
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7701e8149e935c154e1c85738af10248f63657e9?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                        alt="QR Code"
                        className="w-4 aspect-square object-contain"
                    />

                    <div className="flex flex-col justify-between h-full">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3706bc9b1019136b5de843184cddef93c5a80fac?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            alt="Google Play"
                            className="w-[20px] aspect-[2.75] object-contain"
                        />
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/061b76ebd0d9d13981d067e14c04fa11cc94f911?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                            alt="App Store"
                            className="w-[20px] aspect-[2.75] object-contain mt-1"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9da0afe6582e9dee2a2c88753e3cd07107437a5?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                alt="Facebook"
                className="footer-social-icon w-6 h-6"
            />
            <div className="w-6 h-6" aria-label="Twitter"/>
            <div className="w-6 h-6" aria-label="Instagram"/>
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/675febadc305552cf1a198afac39129e8d916a73?placeholderIfAbsent=true&apiKey=5520a4f102154e9f835ab126f337bb29"
                alt="LinkedIn"
                className="w-6 aspect-square object-contain"
            />
        </div>
    </section>);

export const FooterCopyright = () => (
    <div className="flex flex-col items-center mt-8 w-full max-md:mt-6 max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
            <div className="w-full footer-divider"/>
        </div>
        <div className="flex justify-center items-center mt-3 text-sm text-white w-full">
            <div className="flex gap-1 items-center">
                {/* Icon placeholder */}
                <div className="w-4 h-4"/>
                <p className="text-white opacity-40 text-sm whitespace-nowrap">
                    Copyright Rimel 2025. All rights reserved
                </p>
            </div>
        </div>
    </div>
);

