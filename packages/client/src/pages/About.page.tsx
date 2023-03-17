import { Footer } from "../components/Footer";
import LandingNavbar from "../components/LandingNavbar";

const AboutPage = () => {
  return (
    <div>
      <LandingNavbar />
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Welcome to EndoSupply
            </h2>
            <p className="mb-4">
              Your trusted partner in endoscope cleaning and storage. Our
              innovative platform offers a range of solutions including smart
              containers, washing systems, and data management software to
              ensure the highest level of quality and safety in endoscope
              reprocessing.
            </p>
            <p className="mb-4">
              With our state-of-the-art technology and expertise, we help
              healthcare facilities maintain compliance with regulatory
              requirements while also improving efficiency and reducing costs.
              Our smart containers use advanced tracking and monitoring systems
              to ensure that endoscopes are properly stored and maintained,
              while our washing systems provide thorough and reliable cleaning
              for maximum patient safety.
            </p>

            <p className="mb-4">
              At EndoSupply, we understand the importance of accuracy and
              reliability in endoscope reprocessing. That's why our data
              management software is designed to provide real-time tracking,
              monitoring, and reporting to ensure that all processes are
              properly documented and recorded.
            </p>

            <p className="mb-4">
              With our commitment to quality, safety, and innovation, EndoSupply
              is the go-to solution for healthcare facilities looking to ensure
              the highest level of patient care. Join us today and experience
              the future of endoscope reprocessing.
            </p>
          </div>
          <div className=" gap-4 mt-8">
            <img
              className="w-3/4 rounded-lg"
              src="https://images.unsplash.com/photo-1581595220975-119360b1c63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt="office content 1"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default AboutPage;
