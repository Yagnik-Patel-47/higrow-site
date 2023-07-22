import { getParticipants, getWorkshop } from "@/app/_actions/workshop"
import Navbar from "@/components/navbar/navbar"
import PaymentButton from "@/components/workshop/payment-button"
import ReverseTimer from "@/components/reverse-timer"
import { Button } from "@/components/ui/button"
import { PublicWorkshopData } from "@/lib/types"
import { formatDateInDDMMYYYY } from "@/lib/utils/format-date"
import { Facebook, Instagram, Mail, Youtube } from "lucide-react"
import { Metadata } from "next"
import { BiInfoCircle } from "react-icons/bi"
import { RiDiscordLine, RiWhatsappLine } from "react-icons/ri"
import RequestButton from "@/components/workshop/request-button"

export const metadata: Metadata = {
  title: "Workshop Details",
}

async function WorkshopPage({ params }: { params: { id: string } }) {
  const data: PublicWorkshopData = await getWorkshop(params.id)
  const { participants, requested_participants } = await getParticipants(
    params.id
  )

  return (
    <>
      <Navbar />
      <section className="py-20 px-36 w-full ">
        <div className="bg-background border border-secondary">
          <header className="w-full space-y-1 py-8 px-12 border-b border-secondary">
            <h1 className="text-3xl font-bold font-archivo mb-1 text-[#333]">
              {data.name}
            </h1>
            <span className="text-secondary text-sm font-medium inline-block">
              By {data.instructor_name}
            </span>
          </header>
          <div className="flex">
            <main className="basis-[75%] border-r border-secondary space-y-16 py-12 px-12">
              <div className="space-y-5">
                <h2 className="text-3xl text-secondary font-medium">
                  About Instructor :-
                </h2>
                <p className="text-[#333] tracking-wide leading-7 ">
                  {data.instructor_info}
                </p>
              </div>
              <div className="space-y-5">
                <h2 className="text-3xl text-secondary font-medium">
                  About Workshop :-
                </h2>
                <p className="text-[#333] tracking-wide leading-7">
                  {data.workshop_info}
                </p>
              </div>
              <div className="space-y-5">
                <h2 className="text-3xl text-secondary font-medium">
                  About Instructor :-
                </h2>
                <p className="text-[#333] tracking-wide leading-7">
                  {data.describe_each_day}
                </p>
              </div>
              <div
                className={`py-6 px-8 flex items-center space-x-6 text-secondary border border-black rounded-md bg-white`}
              >
                <BiInfoCircle className="text-6xl" />
                <p className="text-sm text-[#333] tracking-wide leading-6">
                  This opportunity has been listed by {data.instructor_name}.
                  Higrow is not responsible for any content mentioned in this
                  opportunity or the process followed by the organizers for this
                  opportunity. However, please contact us if you want to report
                  this opportunity
                </p>
              </div>
            </main>
            <aside className="basis-[35%] h-full py-12 px-8 space-y-12">
              <div className="space-y-6">
                <span className="flex space-x-2 items-center">
                  <span className="font-semibold"> ⏱️ Starts from -</span>
                  <span>
                    {formatDateInDDMMYYYY(data.workshop_starting_date)}
                  </span>
                </span>
                <span className="flex space-x-2 items-center">
                  <span className="font-semibold"> ⏱️ Duration -</span>
                  <span>
                    {data.time_format === "hours"
                      ? `${data.time_per_day} hours X ${data.working_days} Days`
                      : `${data.time_per_day} mins X ${data.working_days} Days`}
                  </span>
                </span>
                <span className="flex space-x-2 items-center">
                  <span className="font-semibold">📍 Happening -</span>
                  <span>{data.mode}</span>
                </span>
              </div>
              <ReverseTimer firebaseDate={data.application_closing_date} />
              <div className="space-y-4">
                {data.is_paid ? (
                  <PaymentButton
                    amount={Number(data.workshop_amount)}
                    workshopName={data.name}
                    workshopId={params.id}
                    organizerEmail={data.contact_email}
                    applicationDate={data.application_closing_date}
                    participants={participants}
                  >
                    Join Rs.{data.workshop_amount}
                  </PaymentButton>
                ) : (
                  <RequestButton
                    id={params.id}
                    requests={requested_participants}
                    participants={participants}
                    applicationDate={data.application_closing_date}
                  />
                )}
                <Button className="w-full" size={"xl"} variant={"outline"}>
                  Add to wishlist
                </Button>
              </div>
              <div className="py-5 px-5 flex items-center text-secondary border border-black rounded-md bg-white">
                <span className="text-sm text-[#333]"> ⭐ {data.tagline} </span>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-xl">Contact organizer :-</h3>
                <div className="flex flex-wrap justify-center gap-y-5">
                  {data.social_links.map(
                    (link) =>
                      link.length > 0 && (
                        <a
                          key={link}
                          className="p-4  w-full border border-secondary rounded-md color-[#fff]"
                          href={link}
                          target="_blank"
                        >
                          {(() => {
                            if (
                              link.includes("youtube.com") ||
                              link.includes("youtu.be")
                            )
                              return (
                                <div className="w-full p-[5px] pt-2 pb-2 flex">
                                  {" "}
                                  <div className="m-[0px] p-[19px] pt-[20px] pb-[20x] rounded-md bg-[#333]   text-[#fff]">
                                    <Youtube />
                                  </div>
                                  <div className="w-[75%] flex flex-col ml-4 justify-center gap-y-1">
                                    {" "}
                                    <div className="font-archivo font-medium tracking-wide">
                                      Puneet's Instagram
                                    </div>
                                    <div className="p-[5px] pt-[8px] pb-[8px] font-archivo font-bold text-[#0D46D5] border border-black rounded-md text-[9px] text-center">
                                    https://instagram.com/puneet.25_
                                    </div>{" "}
                                  </div>
                                </div>
                              )
                            if (link.includes("instagram.com"))
                              return (
                                <div className="w-full p-[5px] pt-2 pb-2 flex">
                                  {" "}
                                  <div className="m-[0px] p-[19px] pt-[20px] pb-[20x] rounded-md bg-[#333]   text-[#fff]">
                                    <Instagram />
                                  </div>
                                  <div className="w-[75%] flex flex-col ml-4 justify-center gap-y-1">
                                    {" "}
                                    <div className="font-archivo font-medium tracking-wide">
                                      Puneet's Instagram
                                    </div>
                                    <div className="p-[5px] pt-[8px] pb-[8px] font-archivo font-bold text-[#0D46D5] border border-black rounded-md text-[9px] text-center">
                                    https://instagram.com/puneet.25_
                                    </div>{" "}
                                  </div>
                                </div>
                              )
                            if (link.includes("facebook.com"))
                              return (
                                <div className="w-full p-[5px] pt-2 pb-2 flex">
                                  {" "}
                                  <div className="m-[0px] p-[19px] pt-[20px] pb-[20x] rounded-md bg-[#333]   text-[#fff]">
                                    <Facebook/>
                                  </div>
                                  <div className="w-[75%] flex flex-col ml-4 justify-center gap-y-1">
                                    {" "}
                                    <div className="font-archivo font-medium tracking-wide">
                                      Puneet's Instagram
                                    </div>
                                    <div className="p-[5px] pt-[8px] pb-[8px] font-archivo font-bold text-[#0D46D5] border border-black rounded-md text-[9px] text-center">
                                    https://instagram.com/puneet.25_
                                    </div>{" "}
                                  </div>
                                </div>
                              )
                            if (link.includes("discord.gg"))
                              return (
                                <div className="w-full p-[5px] pt-2 pb-2 flex">
                                  {" "}
                                  <div className="m-[0px] p-[19px] pt-[20px] pb-[20x] rounded-md bg-[#333]   text-[#fff]">
                                  <RiDiscordLine className="text-2xl" />
                                  </div>
                                  <div className="w-[75%] flex flex-col ml-4 justify-center gap-y-1">
                                    {" "}
                                    <div className="font-archivo font-medium tracking-wide">
                                      Puneet's Instagram
                                    </div>
                                    <div className="p-[5px] pt-[8px] pb-[8px] font-archivo font-bold text-[#0D46D5] border border-black rounded-md text-[9px] text-center">
                                    https://instagram.com/puneet.25_
                                    </div>{" "}
                                  </div>
                                </div>
                              )
                            if (link.includes("whatsapp.com"))
                              return (
                                <div className="w-full p-[5px] pt-2 pb-2 flex">
                                  {" "}
                                  <div className="m-[0px] p-[19px] pt-[20px] pb-[20x] rounded-md bg-[#333]   text-[#fff]">
                                  <RiWhatsappLine className="text-2xl" />
                                  </div>
                                  <div className="w-[75%] flex flex-col ml-4 justify-center gap-y-1">
                                    {" "}
                                    <div className="font-archivo font-medium tracking-wide">
                                      Puneet's Instagram
                                    </div>
                                    <div className="p-[5px] pt-[8px] pb-[8px] font-archivo font-bold text-[#0D46D5] border border-black rounded-md text-[9px] text-center">
                                    https://instagram.com/puneet.25_
                                    </div>{" "}
                                  </div>
                                </div>
                              )
                            return (
                              <div className="w-full p-[5px] pt-2 pb-2 flex">
                                {" "}
                                <div className="m-[0px] p-[19px] pt-[20px] pb-[20x] rounded-md bg-[#333]   text-[#fff]">
                                <Mail />
                                </div>
                                <div className="w-[75%] flex flex-col ml-4 justify-center gap-y-1">
                                  {" "}
                                  <div className="font-archivo font-medium tracking-wide">
                                    Puneet's Instagram
                                  </div>
                                  <div className="p-[5px] pt-[8px] pb-[8px] font-archivo font-bold text-[#0D46D5] border border-black rounded-md text-[9px] text-center">
                                  https://instagram.com/puneet.25_
                                  </div>{" "}
                                </div>
                              </div>
                            )
                            
                          })()}
                        </a>
                      )
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default WorkshopPage
