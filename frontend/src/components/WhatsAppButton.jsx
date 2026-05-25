import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {

  const phone = "917524853717";

  return (

    <a

      href={`https://wa.me/${phone}?text=Hi GreenSolar, I want solar installation details.`}

      target="_blank"

      rel="noopener noreferrer"

      className="fixed bottom-6 right-6 z-50 group"
    >

      <div className="w-[68px] h-[68px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.35)] hover:scale-110 transition duration-300">

        <FaWhatsapp
          size={34}
          color="white"
        />

      </div>

      {/* TOOLTIP */}

      <div className="absolute right-20 bottom-4 bg-black text-white text-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">

        Chat With GreenSolar

      </div>

    </a>
  );
}