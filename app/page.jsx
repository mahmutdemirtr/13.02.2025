// import Banner from "@/components/sections/Banner";
import Banner from "@/components/sections/Banner";
import Copyright from "@/components/sections/Copyright";
import InnerCircles from "@/components/sections/InnerCircles";
import Setup from "@/components/sections/Setup";
import Stories from "@/components/sections/Stories";
import Testimonial from "@/components/sections/Testimonial";
import WhyUs from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#FFE6E6] to-[#E1AFD1]">
      <Banner />
      <InnerCircles />
      <Stories />
      <Testimonial />
      <Setup />
      <WhyUs />
      <Copyright />
    </div>
  );
}
