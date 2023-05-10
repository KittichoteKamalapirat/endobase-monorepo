import React from "react";
import LinkButton from "../components/Buttons/LinkButton";
import { Footer } from "../components/Footer";
import LandingNavbar from "../components/LandingNavbar";
import { urlResolver } from "../lib/UrlResolver";

const LandingPage = () => {
  return (
    <div>
      <LandingNavbar />
      <section className="bg-white dark:bg-gray-900 h-[80vh] flex items-center justify-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              IoT software for storing endoscope data in hospitals
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Endo Supply offers a platform that cleans and stores endoscopes,
              including smart containers, washing systems, and data management
              software..
            </p>
            <LinkButton label="Log in" href={urlResolver.login()} />
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default LandingPage;
