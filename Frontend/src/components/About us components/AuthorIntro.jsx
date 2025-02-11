import React from "react";

const AuthorIntro = () => {
  return (
    <section className="container mx-auto mb-10 ">
      <div
        data-aos="fade-up"
        className="mx-4  flex flex-col gap-[40px] border border-dark border-opacity-20 rounded-[24px] py-4 px-4  md:gap-[64px] md:rounded-[32px]"
      >
        <div className="flex flex-col gap-[40px] md:flex-row md:items-center md:justify-center">
          <div className="flex flex-col gap-4">
            <div className=" md:w-[600px]  md:h-[480px]">
              <img
                src="images/author.jpg"
                className="rounded-[24px] md:h-full  md:w-full md:object-cover"
                alt=""
              />
            </div>
            <div className="flex justify-between p-4 border-2 border-dark  rounded-[24px] w-full">
              <span className="uppercase font-[500] text-[12px]">
                follow me
              </span>
              <div className="flex gap-4">
                <i className="fa-brands fa-facebook  text-[18px]"></i>
                <i className="fa-brands fa-instagram  text-[18px]"></i>
                <i className="fa-brands fa-youtube  text-[18px]"></i>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            <h3 className="font-[700] text-[26px] uppercase md:text-[40px]">
              From Italian Roots to Global Palates
            </h3>
            <p className="font-[300] text-dark text-opacity-80 font-roboto">
              Born and raised in the vibrant culinary landscape of Italy, my
              journey with food began in the heart of my family's kitchen.
              Surrounded by the aroma of fresh herbs, the sizzle of pans, and
              the laughter of loved ones, I developed a deep appreciation for
              the art of cooking. My culinary education took me from the
              historic streets of Rome to the bustling markets of Florence,
              where I honed my skills and cultivated a love for the simplicity
              and authenticity of Italian cuisine.
            </p>
            <p className="font-[300] text-dark text-opacity-80 font-roboto">
              Driven by a relentless curiosity, I embarked on a global culinary
              exploration, seeking inspiration from the rich tapestry of flavors
              found in kitchens around the world. From the spicy markets of
              Marrakech to the sushi stalls of Tokyo, each experience added a
              unique brushstroke to my culinary canvas.
            </p>
            <p className="font-[300] text-dark text-opacity-80 font-roboto">
              Whether you're a seasoned home cook or just starting your culinary
              adventure, I'm delighted to have you here. Let's stir, simmer, and
              savor the beauty of creating something wonderful together.
            </p>

            <div className="flex flex-col gap-[16px] leading-[25px]">
              <span className="font-[300] text-dark text-opacity-80 font-roboto">
                Warmest regards,
              </span>
              <span className="font-author text-[21px]">Isabella Russo</span>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-4 gap-[14px]"
        >
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/1.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/2.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/3.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/4.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/5.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/6.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/7.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
          <div className="overflow-hidden rounded-[24px] h-80 md:h-60 w-full  ">
            <img
              src="images/aboutus/8.jpg"
              className="rounded-[24px] h-80 md:h-60 w-full object-cover hover:scale-125 transition-all ease-in-out duration-300"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorIntro;
