export const Footer = () => {
    return (
        <div className="mt-[50px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex flex-col md:flex-row justify-between items-start w-full max-w-7xl">
                {/* Logo and Description */}
                <div className="w-full md:w-[30%] mb-8 md:mb-0">
                    <img className='w-[40%] max-w-[150px]' src="/assets/HomePage/logo-prescripto.png" alt="Prescripto Logo" />
                    <p className="text-gray-600 pt-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                    </p>
                </div>

                {/* Company Links */}
                <div className="w-full md:w-auto mb-8 md:mb-0">
                    <h2 className="text-lg font-semibold">COMPANY</h2>
                    <ul className="text-gray-600 pt-4">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="w-full md:w-auto">
                    <h2 className="text-lg font-semibold">GET IN TOUCH</h2>
                    <p className="text-gray-600 pt-4">+1-212-456-7890</p>
                    <p className="text-gray-600 pt-4">greatstackdev@gmail.com</p>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t-2 border-[#ADADAD] mt-[25px] pt-4">
                <p className="text-gray-600 text-center">@ 2024 Prescripto. All rights reserved.</p>
            </div>
        </div>
    );
};