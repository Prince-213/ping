import CardClassicPage from "@/app/(ui)/shared/pagelayouts/CardClassicPage";
import CardPageDefault from "@/app/(ui)/shared/pagelayouts/CardPageDefault";
import { getSmartCard } from "@/lib/actions";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await params;

  const cardDetails = await getSmartCard(data.slug);

  const themes = [
    {
      id: 1,
      background: "#ffffff",
      button: "#008897",
      writing: "#000000",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#B7ECF1FF",
    },

    {
      id: 2,
      background: "#F3ECDC",
      writing: "#000000",
      button: "#EFE4D4",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#5A3A0AFF",
    },

    {
      id: 4,
      background: "#ffffff",
      button: "#000000",
      writing: "#000000",
      primaryText: "#686868",
      secondaryText: "#A7E6EB",
      buttonText: "#ffffff",
    },
  ];

  return (
    <div className=" w-full h-screen">
      {cardDetails?.theme.layout == 1 ? (
        <CardPageDefault cardDetails={cardDetails} themes={themes} />
      ) : (
        <CardClassicPage cardDetails={cardDetails} themes={themes} />
      )}
    </div>
  );
};

export default page;
