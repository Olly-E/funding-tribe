import { email, phone } from "@/app/utils/utils";

const ContactUsPage = () => {


  return (
    <div>
      <section className="flex flex-col w-full md:flex-row px-6 sm:px-[50px] ">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="py-20 md:py-[149px] pr-6 sm:pr-[50px]">
            <h1 className="mt-10">LET&apos;S TALK</h1>
            <p className=" lg:text-[24px] max-w-[504px] mt-10 leading-[124%]">
              Got a project, an idea, or just curious about how we work? Let’s
              sit down and talk it through. <br />
              <br /> At Funding Tribe, we don’t believe in endless forms or
              faceless emails. We still believe in the human touch — and real
              conversations that build real partnerships. <br />
              <br /> Coffee’s on us. ■
            </p>
          </div>
          <div className="border-t w-[calc(100vw-10px)] -translate-x-6 sm:translate-x-[-50px] md:translate-x-0 md:w-auto border-t-black md:border-l md:border-l-black md:h-full" />
        </div>
        <div className="py-20 sm:py-[136px] md:pl-[50px] lg:pl-[135px]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="size-[15px] min-w-[15px] bg-black" />
              <p className="text-left w-full whitespace-nowrap">ADDRESS</p>
            </div>
            <p className="uppercase font-bold text-[20px] sm:text-[24px] mt-10">
              Level 33, 25 Canada Square, Canary Wharf, London, E14 5L
            </p>
            <div className="border-t border-t-black w-full mt-[50px]" />
          </div>
          <a target="_blank" href={`tel:${phone}`} className="block" aria-label="Phone number">
            <div className="flex items-center gap-2.5 mt-[50px]">
              <div className="size-[15px] min-w-[15px] bg-black" />
              <p className="text-left w-full whitespace-nowrap">PHONE</p>
            </div>

            <p className="uppercase font-bold text-[20px] sm:text-[24px] mt-10">
              {phone}
            </p>

            <div className="border-t border-t-black w-full mt-[50px]" />
          </a>
          <a
            href={`mailto:${email}`}
            target="_blank"
            className="block"
            aria-label="Email address"
          >
            <div className="flex items-center gap-2.5 mt-[50px]">
              <div className="size-[15px] min-w-[15px] bg-black" />
              <p className="text-left w-full whitespace-nowrap">EMAIL</p>
            </div>

            <p className="uppercase font-bold truncate text-[20px] sm:text-[24px] mt-10">
              {email}
            </p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
