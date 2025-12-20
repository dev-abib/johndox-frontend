import Container from "@/Components/Common/Container";
import {
  FbSvg,
  InIconSvg,
  InstaSvg,
  XIconSvg,
} from "@/Components/Svg/SvgContainer2";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white overflow-hidden lg:mt-[150px] mt-15">
      <Container>
        <div>
          {/* Big Background Text */}
          <div className="mt-16">
            <img
              src="https://i.ibb.co.com/TDs1BV9P/Group-1321314777-1.png"
              alt=""
              className="mx-auto xl:mx-0"
            />
          </div>

          {/* Main Content */}
          <div className="xl:px-0 px-5 py-5 xl:py-10 flex flex-col xl:flex-row gap-4 xl:gap-12">
            {/* Left Text */}
            <div className="xl:w-[37%] w-full">
              <p className="footer_text xl:w-[80%] w-full text-center xl:text-left">
                The leading real estate marketplace in Honduras.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row xl:flex-row justify-between items-start flex-1 gap-5 xl:gap-10 xl:w-[63%] w-full">
              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  <li>
                    <a href="#" className="hover:text-white">
                      Browse Properties
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Houses
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Land
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Commercial
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  <li>
                    <a href="#" className="hover:text-white">
                      List Property
                    </a>
                  </li>

                  <li>
                    <a href="/pricing" className="hover:text-white">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full sm:w-auto">
                <ul className="xl:space-y-3 footer_text text-center sm:text-left">
                  <li>
                    <a href="#" className="hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Help Menu Image */}
          <div className="w-full my-5 xl:my-10 px-5 xl:px-0">
            <img
              className="w-full"
              src="https://i.ibb.co.com/Mwgw8jr/HELP-MENU.png"
              alt=""
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative z-10 border-t border-[#454F5B]">
          <div className="px-5 xl:px-0 pt-6 pb-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6">
            <p className="text-sm xl:text-[16px] md:text-[18px] font-normal leading-[28px] text-[#FFF] text-center md:text-left">
              © 2025 Terralink. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <a href="#" className="footer_text hover:text-white">
                <FbSvg />
              </a>
              <a href="#" className="footer_text hover:text-white">
                <InstaSvg />
              </a>
              <a href="#" className="footer_text hover:text-white">
                <InIconSvg />
              </a>
              <a href="#" className="footer_text hover:text-white">
                <XIconSvg />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
